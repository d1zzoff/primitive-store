"use server";

import { cookies } from "next/headers";

export interface IGetOrders {
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

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Добавляем 2 секунды задержки для наглядности

  return fetch(`${process.env.API_URL}/order/userall?${params}`, {
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

  return fetch(`${process.env.API_URL}/order/all?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function newOrder(data: INewOrder) {
  const token = cookies().get("_token")?.value;

  const response = await fetch(`${process.env.API_URL}/order/new`, {
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

export async function acceptOrder(id: number) {
  const token = cookies().get("_token")?.value;

  const response = await fetch(`${process.env.API_URL}/order/accept/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось принять заказ.");
  }

  const resData = await response.json();

  return resData;
}
