"use client";

import React from "react";
import Button from "../ui/Button";

const ProfileInfoSkeleton = () => {
  return (
    <section className="relative flex flex-col items-center h-[305px] w-[300px] flex-shrink-0">
      <div className="rounded-full w-[120px] h-[120px] bg-black absolute top-0 z-20 border border-grey border-[4px]"></div>
      <div className="w-full h-[245px] rounded-2xl bg-grey p-5 flex flex-col gap-[30px] justify-end absolute bottom-0">
        <div className="flex gap-[30px]">
          <div className="flex flex-col items-start gap-[10px] flex-shrink-0">
            <p className="text-light-grey">Имя</p>
            <p className="text-light-grey">Ваше ID</p>
            <p className="text-light-grey">Статус</p>
          </div>
          <div className="flex flex-col items-start gap-[10px] w-full">
            <div className="h-[20px] w-full rounded-full bg-dark-grey animate-pulse" />
            <div className="h-[20px] w-full rounded-full bg-dark-grey animate-pulse" />
            <div className="h-[20px] w-full rounded-full bg-dark-grey animate-pulse" />
          </div>
        </div>
        <Button click={() => {}} variant={"borderRed"}>
          Выйти
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfoSkeleton;
