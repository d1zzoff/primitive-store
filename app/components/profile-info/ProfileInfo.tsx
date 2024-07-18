"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { getUserInfo, quitAccount } from "@/app/lib/actions/user";
import ProfileInfoSkelton from "./ProfileInfoSkeleton";
import { useRouter } from "next/navigation";

const ProfileInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  const handleQuitAccount = async () => {
    await quitAccount();

    queryClient.invalidateQueries({ queryKey: ["user-info"] });

    router.push("/");
  };

  if (isLoading || !userInfo) return <ProfileInfoSkelton />;

  if (isError) return router.push("/");

  return (
    <section className="relative flex flex-col items-center h-[305px] w-[300px] flex-shrink-0">
      <div className="rounded-full w-[120px] h-[120px] bg-black absolute top-0 z-20 border border-grey border-[4px]"></div>
      <div className="w-full h-[245px] rounded-2xl bg-grey p-5 flex flex-col gap-[30px] justify-end absolute bottom-0">
        <div className="flex gap-[30px]">
          <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
            <p className="text-light_grey">Имя</p>
            <p className="text-light_grey">Ваше ID</p>
            <p className="text-light_grey">Статус</p>
          </div>
          <div className="flex flex-col items-start gap-[10px] w-full">
            <>
              <p>{userInfo?.data.username}</p>
              <p>{userInfo?.data.user_id}</p>
              <p>
                {userInfo?.data.role === "admin" ? "Модератор" : "Пользователь"}
              </p>
            </>
          </div>
        </div>
        <Button click={handleQuitAccount} variant={"borderRed"}>
          Выйти
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfo;
