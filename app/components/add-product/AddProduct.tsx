"use client";

import useAddProduct from "@/app/lib/hooks/useAddProduct";
import ModalLayout from "../modal-layout/ModalLayout";
import Input from "@/app/components/ui/Input";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import Dropdown, { OptionType } from "../ui/Dropdown";
import UploadIcon from "@/public/icons/upload.svg";
import Image from "next/image";

const AddProduct = () => {
  const { isOpen, closeAddProduct } = useAddProduct();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<OptionType | null>(null);

  const categories: OptionType[] = [
    { label: "Тестовая 1", value: "test1" },
    { label: "Тестовая 2", value: "test2" },
  ];

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeAddProduct}
      buttons={[
        { text: "Закрыть", click: closeAddProduct },
        { text: "Добавить", click: () => {} },
      ]}
    >
      <h2>Добавить товар</h2>
      <form className="flex flex-col gap-5 items-start w-full">
        <div className="flex gap-[10px] items-end w-full">
          <button className="relative w-[100px] h-[100px] rounded-full bg-black flex items-center justify-center">
            <UploadIcon />
          </button>
          <button className="w-[80px] h-[80px] rounded-full bg-black flex items-center justify-center">
            <UploadIcon />
          </button>
          <button className="w-[60px] h-[60px] rounded-full bg-black flex items-center justify-center">
            <UploadIcon />
          </button>
        </div>
        <Input
          label="Название товара"
          {...register("name")}
          error={errors.name?.message}
        />
        <label className="flex flex-col items-start gap-[10px] w-full">
          <h5>Описание товара</h5>
          <textarea
            placeholder="Ваше описание..."
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-xl bg-black h-[130px] px-5 py-[10px] focus:outline-none resize-none text-sm text-light font-normal placeholder-light_grey"
          />
        </label>
        <Dropdown
          label="Категория товара"
          currentValue={category}
          setCurrentValue={setCategory}
          options={categories}
        />
        <Input
          label="Цена товара, ₴"
          error={errors.price?.message}
          {...register("price")}
        />
      </form>
    </ModalLayout>
  );
};

export default AddProduct;
