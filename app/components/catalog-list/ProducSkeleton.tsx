"use client";

import Button from "@/app/components/ui/Button";
import BuyIcon from "@/public/icons/buy.svg";

const ProductSkeleton = () => {
  return (
    <div className="p-5 rounded-2xl bg-grey flex flex-col gap-7 w-80">
      <div className="flex items-start gap-3">
        <div className="rounded-full w-20 h-20 bg-black flex-shrink-0 relative animate-pulse"></div>
        <div className="flex flex-col gap-[5px] items-start w-full">
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
          <div className="h-5 w-full rounded-full bg-dark-grey animate-pulse"></div>
        </div>
      </div>
      <Button click={() => {}} size={"full"}>
        <BuyIcon />
        Купить | 0 ₴
      </Button>
    </div>
  );
};

export default ProductSkeleton;
