"use client";

import { useState } from "react";
import PageSwitcher from "../PageSwitcher";
import RequestItem from "./RequestItem";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/actions/orders";
import RequestSkeleton from "./RequestSkeleton";

const RequestList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["requests", page],
    queryFn: () => getOrders({ page, limit: 10 }),
  });

  return (
    <>
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
    </>
  );
};

export default RequestList;
