import AdminLayout from "@/components/AdminLayout";
import AdminPageNav from "@/components/AdminPageNav";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Админ панель",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AdminLayout>
      <section className="flex flex-col items-start gap-[30px] w-full flex-grow">
        <AdminPageNav />
        {children}
      </section>
    </AdminLayout>
  );
}
