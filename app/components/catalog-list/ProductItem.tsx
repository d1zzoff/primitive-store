"use client";

import Button from "@/app/components/ui/Button";
import BuyIcon from "@/public/icons/buy.svg";
import usePurchaseModal from "@/app/lib/hooks/usePurchaseModal";
import { IProduct } from "@/app/lib/actions/goods";
import { formatNumber } from "@/app/utils/numbers";

const ProductItem = ({ product }: { product: IProduct }) => {
  const { openPurchaseModal } = usePurchaseModal();

  return (
    <div className="p-5 rounded-2xl bg-grey flex flex-col gap-7 w-80">
      <div className="flex items-start gap-3">
        <div className="rounded-full w-20 h-20 bg-black flex-shrink-0 relative">
          <img
            src={product.image}
            alt="Image"
            className="w-full h-full rounded-full absolute z-2"
          />
        </div>
        <div className="flex flex-col gap-[5px] items-start w-full">
          <h5>{product.name}</h5>
          <p className="text-light_grey">{product.category}</p>
          <p className="text-light_grey">ID товара: {product.good_id}</p>
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
