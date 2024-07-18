"use server";

import { cookies } from "next/headers";

interface IGetOrders {
  ok: boolean;
  data: IOrder[];
  totalPages: number;
}

export interface IOrder {
  telegram?: string;
  order_id: number;
  created_at: string;
  price: number;
  name: string;
  status: string;
}

interface IGetUserOrdersFilters {
  limit: number;
  page: number;
}

export interface INewOrder {
  good_id: number;
  telegram: string;
  count: number;
  promocode?: string;
  payment_method: string;
}

export async function getUserOrders(
  filters: IGetUserOrdersFilters
): Promise<IGetOrders> {
  const token = cookies().get("_token")?.value;

  const params = new URLSearchParams();

  if (filters.page)
    params.append("offset", ((filters.page - 1) * filters.limit).toString());

  if (filters.limit) params.append("limit", filters.limit.toString());

  return fetch(`http://localhost:8080/order/userall?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function getOrders(
  filters: IGetUserOrdersFilters
): Promise<IGetOrders> {
  const token = cookies().get("_token")?.value;

  const params = new URLSearchParams();

  if (filters.page)
    params.append("offset", ((filters.page - 1) * filters.limit).toString());

  if (filters.limit) params.append("limit", filters.limit.toString());

  return fetch(`http://localhost:8080/order/all?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function newOrder(data: INewOrder) {
  const token = cookies().get("_token")?.value;

  const response = await fetch("http://localhost:8080/order/new", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Не удалось создать заказ. Попробуйте позже.");
  }

  const resData = await response.json();

  return resData;
}
