"use client";

import Button from "@/app/components/ui/Button";
import BuyIcon from "@/public/icons/buy.svg";
import usePurchaseModal from "@/store/purchaseModal";

const GoodsItem = () => {
  return (
    <div className="p-5 rounded-2xl bg-grey flex flex-col gap-7 w-80">
      <div className="flex items-start gap-3">
        <div className="rounded-full w-20 h-20 bg-black"></div>
        <div className="flex flex-col gap-1 items-start">
          <h5>Название товара</h5>
          <p className="text-light_grey">Категория</p>
          <p className="text-light_grey">ID товара: 1</p>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <Button click={() => {}} size={"full"} variant={"borderAccent"}>
          Изменить
        </Button>
        <Button click={() => {}} size={"full"} variant={"borderRed"}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default GoodsItem;
