"use server";

import CatalogFilters from "@/components/CatalogFilters";
import CatalogList from "@/components/catalog-list/CatalogList";
import ProductSkeleton from "@/components/catalog-list/ProducSkeleton";
import { IGetProductsFilters } from "@/lib/actions/goods";
import { Suspense } from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: IGetProductsFilters;
}) => {
  return (
    <article className="flex gap-[35px] w-full flex-col items-start md:flex-row">
      <CatalogFilters />
      <Suspense fallback={<ProductSkeleton />}>
        <CatalogList searchParams={searchParams} />
      </Suspense>
    </article>
  );
};

export default Page;
