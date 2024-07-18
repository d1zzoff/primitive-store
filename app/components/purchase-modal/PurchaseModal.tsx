"use client";

import usePurchaseModal from "@/app/lib/hooks/usePurchaseModal";
import ModalLayout from "../modal-layout/ModalLayout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Dropdown, { OptionType } from "../ui/Dropdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductInfo } from "@/app/lib/actions/goods";
import useNewError from "@/app/lib/hooks/useNewError";
import { INewOrder, newOrder } from "@/app/lib/actions/orders";

const PurchaseModal = () => {
  const { productId } = usePurchaseModal();
  const { newError } = useNewError();

  const { isOpen, closePurchaseModal } = usePurchaseModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<INewOrder>();

  useEffect(() => {
    reset();
  }, [isOpen]);

  const paymentMethods: OptionType[] = [
    { label: "USDT BEP-20", value: "bep-20" },
    { label: "USDT TRC-20", value: "trc-20" },
  ];

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-info", productId],
    queryFn: () => getProductInfo(productId || -1),
    enabled: !!productId,
  });

  const { mutate } = useMutation({
    mutationFn: newOrder,
    onSuccess: () => {
      closePurchaseModal();
    },
    onError: (err) => {
      newError(err.message);
    },
  });

  useEffect(() => {
    if (isError) {
      closePurchaseModal();

      newError("Не удалось получить данные о товаре. Возможно он недоступен.");
    }
  }, [isError]);

  const onSubmit = (data: INewOrder) => {
    const orderData: INewOrder = {
      good_id: Number(productId),
      telegram: data.telegram,
      promocode: data.promocode,
      count: Number(data.count),
      payment_method: paymentMethod.value,
    };

    console.log(orderData);

    mutate(orderData);
  };

  const count = watch("count");

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closePurchaseModal}
      buttons={[
        { text: "Закрыть", click: closePurchaseModal },
        { text: "Подтвердить", click: handleSubmit(onSubmit) },
      ]}
    >
      <div className="flex flex-col gap-[10px] items-start w-full">
        {isLoading ? (
          <>
            <div className="w-full h-[28px] rounded-full bg-dark-grey animate-pulse"></div>
            <div className="w-full h-[20px] rounded-full bg-dark-grey animate-pulse"></div>
          </>
        ) : (
          <>
            <h2>{data?.data.name}</h2>
            <p>{data?.data.description}</p>
          </>
        )}
      </div>
      <form className="flex flex-col gap-5 items-start">
        <div className="flex gap-[10px] items-center">
          <Input
            label="Ваш Telegram"
            {...register("telegram")}
            error={errors.telegram?.message}
          />
          <Input
            type="number"
            label="Количество"
            {...register("count")}
            error={errors.count?.message}
          />
        </div>
        <Dropdown
          label="Платежный метод"
          currentValue={paymentMethod}
          setCurrentValue={setPaymentMethod}
          options={paymentMethods}
        />
        <Input
          label="Промокод (если есть)"
          {...register("promocode")}
          error={errors.promocode?.message}
        />
      </form>
      <div className="flex justify-between items-center w-full mb-[-20px]">
        <p>Итого к оплате...</p>
        <h4>
          {((data?.data.price && data.data.price * Number(count)) || 0).toFixed(
            2
          )}{" "}
          ₴
        </h4>
      </div>
    </ModalLayout>
  );
};

export default PurchaseModal;
