import CatalogFilters from "@/app/components/catalog-filters/CatalogFilters";
import CatalogList from "@/app/components/catalog-list/CatalogList";

const Home = () => {
  return (
    <article className="flex gap-[35px] w-full">
      <CatalogFilters />
      <CatalogList />
    </article>
  );
};

export default Home;
