"use client";

import { useState, useEffect } from "react";
import Button from "@/app/components/ui/Button";
import { getUserInfo } from "@/app/lib/actions/user";
import ProfileIcon from "@/public/icons/profile.svg";
import Logo from "@/public/temniy.svg";
import useLoginModal from "@/app/lib/hooks/useLoginModal";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { openLoginModal } = useLoginModal();
  const router = useRouter();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <header
      className={`bg-grey w-full h-[65px] fixed top-0 z-[70] shadow-sm transition-transform duration-300 ${
        visible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between mx-auto items-center max-w-[1120px] h-full">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-2.5 items-center">
          <Button
            click={() => {}}
            variant={"borderAccent"}
            size={"sm"}
            onClick={
              isLoading
                ? () => {}
                : userInfo?.data
                ? () => router.push("/profile")
                : openLoginModal
            }
          >
            <ProfileIcon />
            {isLoading ? "Загрузка" : userInfo?.data?.username || "Войти"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
