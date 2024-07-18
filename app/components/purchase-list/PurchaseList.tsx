"use client";

import { useState } from "react";
import PageSwitcher from "@/app/components/page-switcher/PageSwitcher";
import PurchaseItem from "./PurchaseItem";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/app/lib/actions/orders";
import PurchaseSkeleton from "./PurchaseSkeleton";

const PurchaseList = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["user-orders", page],
    queryFn: () => getUserOrders({ page, limit: 10 }),
  });

  return (
    <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
      <h2>Мои покупки</h2>
      <div className="flex flex-col gap-5 items-start w-full">
        {isLoading
          ? [...Array(10)].map((_, i) => <PurchaseSkeleton key={i} />)
          : data?.ok &&
            data?.data &&
            data.data.map((el, i) => <PurchaseItem key={i} item={el} />)}
      </div>
      <PageSwitcher
        setCurrentPage={setPage}
        currentPage={page}
        totalPages={data?.totalPages || 1}
      />
    </section>
  );
};

export default PurchaseList;
