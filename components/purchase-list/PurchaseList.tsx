"use client";

import { Suspense, useEffect, useState } from "react";
import PurchaseItem from "./PurchaseItem";
import { getUserOrders, IGetOrders } from "@/lib/actions/orders";
import PageSwitcher from "../PageSwitcher";
import { useQuery } from "@tanstack/react-query";
import PurchaseSkeleton from "./PurchaseSkeleton";

const PurchaseList = () => {
  const [page, setPage] = useState(1);

  const {
    data: purchasesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => getUserOrders({ page, limit: 10 }),
    staleTime: 60 * 1000 * 5,
  });
  return (
    <>
      <div className="flex flex-col gap-5 items-start w-full">
        {isLoading
          ? [...Array(10)].map((_, i) => <PurchaseSkeleton key={i} />)
          : purchasesData?.data &&
            purchasesData.data.map((el, i) => (
              <PurchaseItem key={i} item={el} />
            ))}
      </div>
      <PageSwitcher
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={purchasesData?.totalPages || 0}
      />
    </>
  );
};

export default PurchaseList;
