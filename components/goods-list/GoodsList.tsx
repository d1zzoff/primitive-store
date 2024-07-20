"use client";

import GoodsItem from "./GoodsItem";
import Button from "../ui/Button";
import useAddProduct from "@/lib/hooks/useAddProduct";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/actions/goods";
import GoodsSkeleton from "./GoodsSkeleton";

const GoodsList = () => {
  const { openAddProduct } = useAddProduct();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      <div className="flex gap-5 flex-wrap w-full">
        {isLoading
          ? [...Array(8)].map((_, i) => <GoodsSkeleton />)
          : data?.data &&
            data.data.map((el, i) => <GoodsItem product={el} key={i} />)}
      </div>
      <Button click={openAddProduct}>Добавить товар</Button>
    </>
  );
};

export default GoodsList;
