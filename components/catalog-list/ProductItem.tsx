"use client";

import Button from "@/components/ui/Button";
import BuyIcon from "@/public/icons/buy.svg";
import usePurchaseModal from "@/lib/hooks/usePurchaseModal";
import { IProduct } from "@/lib/actions/goods";
import { formatNumber } from "@/utils/numbers";

const ProductItem = ({ product }: { product: IProduct }) => {
  const { openPurchaseModal } = usePurchaseModal();

  return (
    <div className="p-5 h-[190px] rounded-2xl bg-grey flex flex-col gap-[30px] w-full sm:max-w-[315px] border-2 border-grey hover:border-light-grey transition-all duration-300 hover:-translate-y-1">
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => openPurchaseModal(product.good_id)}
      >
        <div className="rounded-full w-20 h-20 bg-black flex-shrink-0 relative">
          <img
            src={product.image}
            alt="Image"
            className="w-full h-full rounded-full absolute z-2"
          />
        </div>
        <div className="flex flex-col gap-[5px] items-start w-full">
          <h5>{product.name}</h5>
          <p className="text-light-grey">{product.category}</p>
          <p className="text-light-grey">ID товара: {product.good_id}</p>
        </div>
      </div>
      <Button click={() => openPurchaseModal(product.good_id)} size={"full"}>
        <BuyIcon />
        Купить | {formatNumber(product.price)} ₴
      </Button>
    </div>
  );
};

export default ProductItem;
