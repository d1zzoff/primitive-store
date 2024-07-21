"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { getUserInfo } from "@/lib/actions/user";
import ProfileIcon from "@/public/icons/profile.svg";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

const Header = () => {
  const { openLoginModal } = useLoginModal();
  const router = useRouter();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <header className="bg-grey w-full h-[65px] fixed top-0 z-[70] shadow-md transition-transform duration-300">
      <div className="flex justify-between mx-auto items-center w-[calc(100%-40px)] max-w-[1160px] h-full">
        <Logo />
        <div className="flex items-center gap-[10px]">
          <Button
            variant="borderAccent"
            click={
              isLoading
                ? () => {}
                : userInfo?.data
                ? () => router.push("/profile")
                : openLoginModal
            }
          >
            <ProfileIcon />
            {isLoading ? "Загрузка" : userInfo?.data?.email || "Войти"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
