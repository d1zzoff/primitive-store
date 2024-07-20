"use server";

import { OptionType } from "@/components/ui/Dropdown";
import { cookies } from "next/headers";

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

interface IGetEditProductInfo {
  ok: boolean;
  data: IEditProductInfo;
}

export interface IEditProductInfo {
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface IEditProduct {
  good_id: number;
  name: string | null | undefined;
  description: string | null | undefined;
  image: string | null | undefined;
  category: string | null | undefined;
  price: number | null | undefined;
}

export interface IAddProduct {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export async function getProducts(
  filters?: IGetProductsFilters
): Promise<IGetProducts> {
  const params = new URLSearchParams();

  if (filters?.category) params.append("category", filters.category);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.min_price)
    params.append("min_price", filters.min_price.toString());
  if (filters?.max_price)
    params.append("max_price", filters.max_price.toString());

  const response = await fetch(`http://localhost:8080/goods/all?${params}`, {
    cache: "force-cache",
    next: { revalidate: 300 },
  });

  return response.json();
}

export async function getCategories(): Promise<IGetCategories> {
  return await fetch("http://localhost:8080/goods/categories").then((res) =>
    res.json()
  );
}

export async function getProductInfo(id: number): Promise<IGetProductInfo> {
  return await fetch(`http://localhost:8080/goods/info/${id}`).then((res) =>
    res.json()
  );
}

export async function getEditProductInfo(
  id: number
): Promise<IGetEditProductInfo> {
  const token = cookies().get("_token")?.value;

  return await fetch(`http://localhost:8080/goods/edit_info/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function editProduct(data: IEditProduct) {
  const token = cookies().get("_token")?.value;

  return await fetch(`http://localhost:8080/goods/edit`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function deleteProduct(id: number) {
  const token = cookies().get("_token")?.value;

  return await fetch(`http://localhost:8080/goods/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function addProduct(data: IAddProduct) {
  const token = cookies().get("_token")?.value;

  const response = await fetch(`http://localhost:8080/goods/new`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось создать");
  }

  const resData = await response.json();

  return resData;
}
