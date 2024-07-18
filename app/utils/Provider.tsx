"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import BaseLayout from "@/app/components/base-layout/BaseLayout";
import ErrorMessage from "@/app/components/error-message/ErrorMessageList";
import AddProduct from "@/app/components/add-product/AddProduct";
import PurchaseModal from "@/app/components/purchase-modal/PurchaseModal";
import LoginModal from "@/app/components/login-modal/LoginModal";
import RegisterModal from "@/app/components/register-modal/RegisterModal";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorMessage />
      <AddProduct />
      <PurchaseModal />
      <LoginModal />
      <RegisterModal />
      <BaseLayout>{children}</BaseLayout>
    </QueryClientProvider>
  );
};

export default Provider;
