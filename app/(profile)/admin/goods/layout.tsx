"use client";

import Button from "@/components/ui/Button";
import useAddProduct from "@/lib/hooks/useAddProduct";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { openAddProduct } = useAddProduct();

  return (
    <>
      {children}
      <Button click={openAddProduct}>Добавить товар</Button>
    </>
  );
}
