"use server";

import ProductItem from "./ProductItem";
import { getProducts, IGetProductsFilters } from "@/lib/actions/goods";
import ProductSkeleton from "./ProducSkeleton";
import { Suspense } from "react";

const CatalogList = async ({
  searchParams,
}: {
  searchParams: IGetProductsFilters;
}) => {
  const data = await getProducts(searchParams);

  return (
    <section className="flex flex-col gap-8 items-start flex-grow-1 w-full">
      <h2>
        Всего найдено товаров:{" "}
        {(data?.ok && data.data && data?.data.length) || 0}
      </h2>
      <div className="flex gap-5 flex-wrap w-full">
        <Suspense
          fallback={[...Array(10)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        >
          {data?.ok &&
            data.data &&
            data.data.map((el, i) => <ProductItem key={i} product={el} />)}
        </Suspense>
      </div>
    </section>
  );
};

export default CatalogList;
