"use server";

import CatalogFilters from "@/components/CatalogFilters";
import CatalogList from "@/components/catalog-list/CatalogList";
import { IGetProductsFilters } from "@/lib/actions/goods";

const Page = async ({
  searchParams,
}: {
  searchParams: IGetProductsFilters;
}) => {
  return (
    <article className="flex gap-[35px] w-full flex-col items-start md:flex-row">
      <CatalogFilters />
      <CatalogList searchParams={searchParams} />
    </article>
  );
};

export default Page;
