"use client";

import { checkAdminAccess } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      try {
        await checkAdminAccess();
      } catch {
        return router.push("/");
      }
    }

    fetch();
  }, []);

  return <>{children}</>;
};

export default AdminLayout;
