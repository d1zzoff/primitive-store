"use client";

import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Dropdown, { OptionType } from "./ui/Dropdown";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@/public/icons/search.svg";
import Range from "./ui/Range";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/actions/goods";
import { useRouter, useSearchParams } from "next/navigation";

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
    watch,
  } = useForm<CatalogFilters>();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000,
  });

  const categories: OptionType[] = categoriesData?.data
    ? [{ label: "Все категории", value: null }, ...categoriesData.data]
    : [];

  const [category, setCategory] = useState<OptionType | null>(null);
  const [priceRange, setPriceRange] = useState({
    min_price: "",
    max_price: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const search = watch("search");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (category?.value) {
        params.set("category", category.value);
      } else {
        params.delete("category");
      }

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (priceRange.min_price) {
        params.set("min_price", priceRange.min_price);
      } else {
        params.delete("min_price");
      }

      if (priceRange.max_price) {
        params.set("max_price", priceRange.max_price);
      } else {
        params.delete("max_price");
      }

      router.push(`?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [category, search, priceRange, router, searchParams]);

  const handlePriceChange = (minPrice: string, maxPrice: string) => {
    setPriceRange({
      min_price: minPrice,
      max_price: maxPrice,
    });
  };

  const container = useRef<HTMLDivElement | null>(null);

  return (
    <section className="h-[334px] sm:h-full" ref={container}>
      <div className="flex flex-col gap-[30px] items-start transition-transform duration-300">
        <h2>Фильтр</h2>
        <div className="top-0 w-full rounded-2xl bg-grey p-5 flex flex-col gap-5 sm:max-w-[300px] md:min-w-[300px]">
          <Input
            label="Поиск"
            error={errors.search?.message}
            Icon={<SearchIcon />}
            {...register("search")}
          />
          <Dropdown
            label="Категория"
            options={categories}
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
      </div>
    </section>
  );
};

export default CatalogFilters;
