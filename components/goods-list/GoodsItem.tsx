"use client";

import Button from "@/components/ui/Button";
import { deleteProduct, IProduct } from "@/lib/actions/goods";
import useEditProductModal from "@/lib/hooks/useEditProductModal";
import useWarningModal from "@/lib/hooks/useWarningModal";
import { registerActionHandler } from "@/utils/actionHandlers";
import { useMutation } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { MouseEvent } from "react";

const GoodsItem = ({ product }: { product: IProduct }) => {
  const { openEditProductModal } = useEditProductModal();
  const { openWarningModal, closeWarningModal } = useWarningModal();

  const handleDeleteProduct = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const actionId = "delete-product";
    registerActionHandler(actionId, () => mutate(product.good_id));
    openWarningModal(actionId, "Вы уверены, что хотите удалить товар?");
  };

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      revalidatePath("http://localhost:8080/goods/all");

      closeWarningModal();
    },
    onError: () => {
      closeWarningModal();
    },
  });

  return (
    <div
      className="p-5 rounded-2xl bg-grey flex flex-col gap-[30px] w-full sm:max-w-[315px] border-2 border-grey hover:border-light-grey transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => openEditProductModal(product.good_id)}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-full w-20 h-20 bg-black flex-shrink-0 relative">
          <img
            src={product.image}
            alt="Image"
            className="w-full h-full rounded-full absolute z-2"
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <h5>{product.name}</h5>
          <p className="text-light-grey">{product.category}</p>
          <p className="text-light-grey">ID товара: {product.good_id}</p>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <Button
          click={() => openEditProductModal(product.good_id)}
          size={"full"}
          variant={"borderAccent"}
        >
          Изменить
        </Button>
        <Button click={handleDeleteProduct} size={"full"} variant={"borderRed"}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default GoodsItem;
