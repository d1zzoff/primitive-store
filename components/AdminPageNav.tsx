"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminPageNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-[10px] justify-center w-full sm:justify-start">
      <Link
        href={"/admin/requests"}
        className={clsx("text-xl font-semibold", {
          "text-accent": pathname === "/admin/requests",
          "text-light": pathname !== "/admin/requests",
        })}
      >
        Запросы
      </Link>
      <h2>/</h2>
      <Link
        href={"/admin/goods"}
        className={clsx("text-xl font-semibold", {
          "text-accent": pathname === "/admin/goods",
          "text-light": pathname !== "/admin/goods",
        })}
      >
        Товары
      </Link>
    </div>
  );
};

export default AdminPageNav;
