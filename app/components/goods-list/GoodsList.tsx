"use client";

import { useState } from "react";
import PageSwitcher from "../page-switcher/PageSwitcher";
import GoodsItem from "./GoodsItem";
import Link from "next/link";
import Button from "../ui/Button";
import useAddProduct from "@/app/lib/hooks/useAddProduct";

const GoodsList = () => {
  const [page, setPage] = useState(1);
  const { openAddProduct } = useAddProduct();

  return (
    <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
      <div className="flex items-center gap-[10px]">
        <Link
          href={"/admin/requests"}
          className="text-xl font-semibold text-light"
        >
          Запросы
        </Link>
        <h2>/</h2>
        <Link
          href={"/admin/goods"}
          className="text-xl font-semibold text-accent"
        >
          Товары
        </Link>
      </div>
      <div className="flex gap-5 flex-wrap">
        <GoodsItem />
      </div>
      <Button click={openAddProduct} size={"lg"} variant={"borderAccent"}>
        Добавить товар
      </Button>
      <PageSwitcher
        setCurrentPage={setPage}
        currentPage={page}
        totalPages={3}
      />
    </section>
  );
};

export default GoodsList;
