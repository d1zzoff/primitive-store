"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { getUserInfo, quitAccount } from "@/lib/actions/user";
import ProfileInfoSkelton from "./ProfileInfoSkeleton";
import { useRouter } from "next/navigation";
import { registerActionHandler } from "@/utils/actionHandlers";
import useWarningModal from "@/lib/hooks/useWarningModal";
import { useEffect } from "react";
import clsx from "clsx";

const ProfileInfo = () => {
  const { closeWarningModal, openWarningModal } = useWarningModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 5,
  });

  const handleQuitAccount = () => {
    openWarningModal(
      "Вы уверены что хотите выйти с аккаунта?",
      quitAccountAction
    );
  };

  const quitAccountAction = async () => {
    closeWarningModal();

    await quitAccount();

    queryClient.invalidateQueries({ queryKey: ["user-info"] });

    router.push("/");
  };

  useEffect(() => {
    if ((!isLoading && !userInfo?.data) || isError) {
      router.push("/");
    }
  }, [isLoading, userInfo, isError]);

  if (!userInfo?.data) return <ProfileInfoSkelton />;

  return (
    <section
      className={clsx(
        "relative flex flex-col items-center w-full sm:max-w-[300px] md:min-w-[300px] flex-shrink-0",
        {
          "h-[350px]": userInfo?.data.role === "admin",
          "h-[305px]": userInfo?.data.role === "user",
        }
      )}
    >
      <div className="absolute rounded-full w-[120px] h-[120px] bg-black top-0 z-20 border border-grey border-[4px]"></div>
      <div className="absolute w-full rounded-2xl bg-grey px-5 flex flex-col gap-[30px] justify-end top-[60px] pb-5 pt-[80px]">
        <div className="flex gap-[30px]">
          <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
            <p className="text-light-grey">E-mail</p>
            <p className="text-light-grey">Ваше ID</p>
            <p className="text-light-grey">Статус</p>
          </div>
          <div className="flex flex-col items-start gap-[10px] w-full">
            <p>{userInfo?.data.email}</p>
            <p>{userInfo?.data.user_id}</p>
            <p>
              {userInfo?.data.role === "admin" ? "Модератор" : "Пользователь"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] items-start w-full">
          {userInfo?.data.role === "admin" && (
            <Button
              click={() => router.push("/admin/requests")}
              variant={"borderAccent"}
              size={"full"}
            >
              Админ панель
            </Button>
          )}
          <Button click={handleQuitAccount} variant={"borderRed"} size={"full"}>
            Выйти
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
