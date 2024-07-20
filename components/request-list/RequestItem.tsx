"use client";

import ClockIcon from "@/public/icons/clock.svg";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatNumber } from "@/utils/numbers";
import { formatDate, formatTime } from "@/utils/date";
import { acceptOrder, IOrder } from "@/lib/actions/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWarningModal from "@/lib/hooks/useWarningModal";
import { registerActionHandler } from "@/utils/actionHandlers";

const RequestItem = ({ item }: { item: IOrder }) => {
  const queryClient = useQueryClient();
  const { openWarningModal, closeWarningModal } = useWarningModal();

  const { mutate } = useMutation({
    mutationFn: acceptOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });

      closeWarningModal();
    },
    onError: () => {
      closeWarningModal();
    },
  });

  const handleAcceptOrder = () => {
    const actionId = "accept-order";
    registerActionHandler(actionId, () => mutate(item.order_id));
    openWarningModal(actionId || "", "Вы уверены, что хотите принять заказ?");
  };

  return (
    <div className="w-full p-5 min-h-[105px] items-center bg-grey rounded-2xl flex flex-wrap gap-10 border-2 border-grey hover:border-light-grey transition-all duration-300">
      <div className="flex gap-[15px] items-center">
        <ClockIcon className="w-[25px] h-[25px] fill-light-grey" />
        <li className="flex flex-col gap-1">
          <h5 className="text-light-grey">{formatDate(item.created_at)}</h5>
          <h5 className="text-light-grey">{formatTime(item.created_at)}</h5>
        </li>
      </div>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Сумма</p>
        <h5>{formatNumber(item.price)} ₴</h5>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Telegram</p>
        <Link
          href={"https://t.me/d1zztg"}
          target="_blank"
          className="text-accent cursor-pointer font-medium text-sm hover:underline"
        >
          @{item.telegram}
        </Link>
      </li>
      <li className="flex flex-col gap-1">
        <p className="text-light-grey">Название товара</p>
        <h5>{item.name}</h5>
      </li>
      <Button className="ml-auto" click={handleAcceptOrder}>
        Принять
      </Button>
    </div>
  );
};

export default RequestItem;
