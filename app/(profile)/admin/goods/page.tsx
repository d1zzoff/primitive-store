"use server";

import GoodsList from "@/components/goods-list/GoodsList";
import GoodsSkeleton from "@/components/goods-list/GoodsSkeleton";
import { Suspense } from "react";

async function Page() {
  return (
    <Suspense fallback={<GoodsSkeleton />}>
      <GoodsList />
    </Suspense>
  );
}

export default Page;
