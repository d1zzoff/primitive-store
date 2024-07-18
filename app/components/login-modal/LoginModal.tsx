"use client";

import useLoginModal from "@/app/lib/hooks/useLoginModal";
import ModalLayout from "@/app/components/modal-layout/ModalLayout";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useRegisterModal from "@/app/lib/hooks/useRegisterModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNewError from "@/app/lib/hooks/useNewError";
import { ILoginUser, loginUser } from "@/app/lib/actions/user";

const LoginModal = () => {
  const { isOpen, closeLoginModal } = useLoginModal();
  const { openRegisterModal } = useRegisterModal();
  const { newError } = useNewError();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginUser>();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset();
  }, [isOpen]);

  const handleOpenRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      closeLoginModal();
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (err) => {
      newError(err.message);
    },
  });

  const onSubmit = (data: ILoginUser) => {
    mutate(data);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeLoginModal}
      buttons={[
        { text: "Закрыть", click: closeLoginModal },
        { text: "Войти", click: handleSubmit(onSubmit) },
      ]}
    >
      <div className="text-center flex flex-col gap-[5px] items-center w-full">
        <h2>Авторизация</h2>
        <p>
          У вас нет аккаунта?{" "}
          <span
            className="text-accent font-medium cursor-pointer hover:underline"
            onClick={handleOpenRegister}
          >
            Создать новый.
          </span>
        </p>
      </div>
      <form className="flex flex-col items-start gap-5 w-full">
        <Input
          label="Имя пользователя"
          error={errors.username?.message}
          {...register("username")}
        />
        <Input
          label="Введите пароль"
          error={errors.password?.message}
          {...register("password")}
        />
      </form>
    </ModalLayout>
  );
};

export default LoginModal;
