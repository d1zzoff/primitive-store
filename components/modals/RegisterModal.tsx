"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLoginModal from "@/lib/hooks/useLoginModal";
import useRegisterModal from "@/lib/hooks/useRegisterModal";
import ModalLayout from "@/components/modals/ModalLayout";
import Input from "@/components/ui/Input";
import { IRegisterUser, registerUser } from "@/lib/actions/user";

const RegisterModal = () => {
  const queryClient = useQueryClient();
  const { openLoginModal } = useLoginModal();
  const { isOpen, closeRegisterModal } = useRegisterModal();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IRegisterUser>();

  useEffect(() => {
    reset();
  }, [isOpen]);

  const handleOpenRegister = () => {
    closeRegisterModal();
    openLoginModal();
  };

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      closeRegisterModal();

      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const onSubmit = async (data: IRegisterUser) => {
    mutate(data);
  };

  const password = watch("password", "");

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeRegisterModal}
      buttons={[
        { text: "Закрыть", click: closeRegisterModal },
        { text: "Создать", click: handleSubmit(onSubmit) },
      ]}
      error={error}
    >
      <div className="text-center flex flex-col gap-[5px] items-center w-full">
        <h2>Регистрация</h2>
        <p>
          У вас уже есть аккаунт?{" "}
          <span
            className="text-accent font-medium cursor-pointer hover:underline"
            onClick={handleOpenRegister}
          >
            Войти.
          </span>
        </p>
      </div>
      <form className="flex flex-col items-start gap-5 w-full">
        <Input
          label="Имя пользователя"
          error={errors.username?.message}
          {...register("username", {
            required: "Имя пользователя обязательно",
            minLength: {
              value: 4,
              message: "Мин. длинна имени - 4 символа",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Имя пользователя может содержать только латинские буквы, цифры и (_)",
            },
          })}
        />
        <Input
          label="Введите пароль"
          error={errors.password?.message}
          type="password"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Мин. длинна пароля - 6 символов",
            },
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*]+$/,
              message:
                "Пароль может содержать только латинские буквы и символы (!@#$%^&*)",
            },
          })}
        />
        <Input
          label="Повтор пароля"
          error={errors.repeatedPassword?.message}
          type="password"
          {...register("repeatedPassword", {
            required: "Повтор пароля обязателен",
            validate: (value) =>
              value === password || "Пароли должны совпадать",
          })}
        />
      </form>
    </ModalLayout>
  );
};

export default RegisterModal;
