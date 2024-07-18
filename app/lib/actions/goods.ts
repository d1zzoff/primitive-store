"use server";

import { OptionType } from "@/app/components/ui/Dropdown";

export interface IGetProductsFilters {
  category: string | null;
  search: string | null;
  min_price: number | null;
  max_price: number | null;
}

interface IGetProducts {
  ok: boolean;
  data: IProduct[];
}

export interface IProduct {
  good_id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface IGetCategories {
  ok: boolean;
  data: OptionType[];
}

interface IGetProductInfo {
  ok: boolean;
  data: IProductInfo;
}

export interface IProductInfo {
  good_id: number;
  name: string;
  description: string;
  price: number;
}

export async function getProducts(
  filters: IGetProductsFilters
): Promise<IGetProducts> {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  if (filters.min_price)
    params.append("min_price", filters.min_price.toString());
  if (filters.max_price)
    params.append("max_price", filters.max_price.toString());

  const response = await fetch(`http://localhost:8080/goods/all?${params}`);

  return response.json();
}

export async function getCategories(): Promise<IGetCategories> {
  return fetch("http://localhost:8080/goods/categories").then((res) =>
    res.json()
  );
}

export async function getProductInfo(id: number): Promise<IGetProductInfo> {
  return fetch(`http://localhost:8080/goods/info/${id}`).then((res) =>
    res.json()
  );
}
