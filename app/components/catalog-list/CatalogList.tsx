"use client";

import { useEffect, useState } from "react";
import PageSwitcher from "../page-switcher/PageSwitcher";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/lib/actions/goods";
import useFilters from "@/app/lib/hooks/useFilters";
import ProductSkeleton from "./ProducSkeleton";
import useNewError from "@/app/lib/hooks/useNewError";

const CatalogList = () => {
  const { filters } = useFilters();
  const { newError } = useNewError();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  useEffect(() => {
    if (isError) {
      newError("Не удалось получить список товаров. Попробуйте позже.");
    }
  }, [isError]);

  return (
    <section className="flex flex-col gap-8 items-start flex-grow-1">
      <h2>
        Всего найдено товаров:{" "}
        {(data?.ok && data.data && data?.data.length) || 0}
      </h2>
      <div className="flex gap-5 flex-wrap">
        {isLoading
          ? [...Array(10)].map((_, i) => <ProductSkeleton key={i} />)
          : data?.ok &&
            data.data &&
            data.data.map((el, i) => <ProductItem key={i} product={el} />)}
      </div>
    </section>
  );
};

export default CatalogList;
