"use client";

import { useState } from "react";
import PageSwitcher from "../page-switcher/PageSwitcher";
import RequestItem from "./RequestItem";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/app/lib/actions/orders";
import RequestSkeleton from "./RequestSkeleton";

const RequestList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests", page],
    queryFn: () => getOrders({ page, limit: 10 }),
  });

  return (
    <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
      <div className="flex items-center gap-[10px]">
        <Link
          href={"/admin/requests"}
          className="text-xl font-semibold text-accent"
        >
          Запросы
        </Link>
        <h2>/</h2>
        <Link
          href={"/admin/goods"}
          className="text-xl font-semibold text-light"
        >
          Товары
        </Link>
      </div>
      <div className="flex flex-col gap-[20px] items-start w-full">
        {isLoading
          ? [...Array(10)].map((_, i) => <RequestSkeleton key={i} />)
          : data?.ok &&
            data.data &&
            data.data.map((el, i) => <RequestItem item={el} key={i} />)}
      </div>
      <PageSwitcher
        setCurrentPage={setPage}
        currentPage={page}
        totalPages={(data?.data && data.totalPages) || 0}
      />
    </section>
  );
};

export default RequestList;
