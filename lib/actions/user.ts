"use server";

import { cookies } from "next/headers";

export interface IGetUser {
  ok: boolean;
  data: {
    username: string;
    user_id: number;
    role: string;
  };
}

export interface IRegisterUser {
  username: string;
  password: string;
  repeatedPassword: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export async function getUserInfo(): Promise<IGetUser> {
  const token = cookies().get("_token")?.value;

  const response = await fetch("http://localhost:8080/user/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function registerUser(data: IRegisterUser) {
  const response = await fetch("http://localhost:8080/user/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const resData = await response.json();

  if (resData.ok && resData.jwt) {
    const time = 3 * 24 * 60 * 60 * 1000;

    cookies().set("_token", resData.jwt, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + time),
    });
  }

  return resData;
}

export async function loginUser(data: ILoginUser) {
  const response = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }

  const resData = await response.json();

  if (resData.ok && resData.jwt) {
    const time = 3 * 24 * 60 * 60 * 1000;

    cookies().set("_token", resData.jwt, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + time),
    });
  }

  return resData;
}

export async function checkAdminAccess() {
  const token = cookies().get("_token")?.value;

  const response = await fetch("http://localhost:8080/user/access", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Нет доступа к этой странице!");
  }

  return response.json();
}

export async function quitAccount() {
  cookies().delete("_token");
}
