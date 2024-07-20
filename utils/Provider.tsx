"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import BaseLayout from "@/components/BaseLayout";
import AddProduct from "@/components/modals/AddProduct";
import PurchaseModal from "@/components/modals/PurchaseModal";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditProduct from "@/components/modals/EditProduct";
import WarningModal from "@/components/modals/WarningModal";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WarningModal />
      <EditProduct />
      <AddProduct />
      <PurchaseModal />
      <LoginModal />
      <RegisterModal />
      <BaseLayout>{children}</BaseLayout>
    </QueryClientProvider>
  );
};

export default Provider;
