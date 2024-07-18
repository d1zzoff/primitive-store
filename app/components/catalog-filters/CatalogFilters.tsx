"use client";

import Input from "@/app/components/ui/Input";
import { useForm } from "react-hook-form";
import Dropdown, { OptionType } from "../ui/Dropdown";
import { useEffect, useState } from "react";
import SearchIcon from "@/public/icons/search.svg";
import Range from "../ui/Range";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/lib/actions/goods";
import useFilters from "@/app/lib/hooks/useFilters";

interface CatalogFilters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

const CatalogFilters = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<CatalogFilters>();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const [category, setCategory] = useState<OptionType | null>(null);
  const [searchState, setSearchState] = useState("");
  const [priceRange, setPriceRange] = useState({
    min_price: "",
    max_price: "",
  });

  const { filters, setFilters } = useFilters();

  const search = watch("search");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchState) {
        setSearchState(search);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        category: category?.value || null,
        search: searchState || null,
        min_price: priceRange.min_price
          ? parseFloat(priceRange.min_price)
          : null,
        max_price: priceRange.max_price
          ? parseFloat(priceRange.max_price)
          : null,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [category, searchState, priceRange, setFilters]);

  const handlePriceChange = (minPrice: string, maxPrice: string) => {
    setPriceRange({
      min_price: minPrice,
      max_price: maxPrice,
    });
  };

  return (
    <section className="flex flex-col gap-8 items-start">
      <h2>Фильтр</h2>
      <div className="w-[300px] rounded-2xl bg-grey p-5 flex flex-col gap-5">
        <Input
          label="Поиск"
          error={errors.search?.message}
          Icon={<SearchIcon />}
          {...register("search")}
        />
        <Dropdown
          label="Категория"
          options={categories?.data}
          currentValue={category}
          setCurrentValue={setCategory}
        />
        <Range
          label="Цена, ₴"
          firstValue={priceRange.min_price}
          setFirstValue={(value) =>
            handlePriceChange(value, priceRange.max_price)
          }
          secondValue={priceRange.max_price}
          setSecondValue={(value) =>
            handlePriceChange(priceRange.min_price, value)
          }
        />
      </div>
    </section>
  );
};

export default CatalogFilters;
