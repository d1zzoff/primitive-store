"use client";

import Button from "@/components/ui/Button";
import BuyIcon from "@/public/icons/buy.svg";

const ProductSkeleton = () => {
  return (
    <section className="flex flex-col gap-8 items-start flex-grow-1 w-full">
      <h2>Всего найдено товаров: 0</h2>
      <div className="flex gap-5 flex-wrap w-full">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="p-5 h-[190px] rounded-2xl bg-grey flex flex-col gap-[30px] w-full sm:max-w-[315px] border-2 border-grey hover:border-light-grey transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => {}}
            >
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
        ))}
      </div>
    </section>
  );
};

export default ProductSkeleton;
