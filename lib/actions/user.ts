"use server";

import { cookies } from "next/headers";

export interface IGetUser {
  ok: boolean;
  data: {
    email: string;
    user_id: number;
    role: string;
  };
}

export interface IRegisterUser {
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
  remember_me: boolean;
}

export async function getUserInfo(): Promise<IGetUser> {
  const token = cookies().get("_token")?.value;

  const response = await fetch(`${process.env.API_URL}/user/info`, {
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
    switch (response.status) {
      case 409:
        throw new Error("Это имя пользователя уже занято.");
      default:
        throw new Error(
          "Не удалось создать аккаунт. Пожалуйста, попробуйте позже."
        );
    }
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
    throw new Error("Неверный логин или пароль.");
  }

  const resData = await response.json();

  if (resData.ok && resData.jwt) {
    if (data.remember_me) {
      const time = 3 * 24 * 60 * 60 * 1000;

      cookies().set("_token", resData.jwt, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + time),
      });
    } else {
      cookies().set("_token", resData.jwt, {
        httpOnly: true,
        secure: true,
      });
    }
  }

  return resData;
}

export async function checkAdminAccess() {
  const token = cookies().get("_token")?.value;

  const response = await fetch(`${process.env.API_URL}/user/access`, {
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
