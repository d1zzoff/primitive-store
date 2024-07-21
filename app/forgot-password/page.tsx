"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="mx-auto bg-grey rounded-2xl p-[30px] flex flex-col gap-[30px] items-center w-[calc(100%-40px)] max-w-[500px] max-h-[450px]">
      <h2 className="text-center">Забыли пароль?</h2>
      <div className="flex flex-col gap-5 items-start w-full">
        <Input label="Введите E-mail" {...register("email")} />
      </div>
      <Button click={() => {}} variant={"inactive"} size={"full"}>
        Отправить код
      </Button>
    </div>
  );
};

export default Page;
