"use client";

import useAddProduct from "@/lib/hooks/useAddProduct";
import ModalLayout from "./ModalLayout";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { ChangeEvent, useRef, useState } from "react";
import Dropdown, { OptionType } from "@/components/ui/Dropdown";
import { addProduct, getCategories, IAddProduct } from "@/lib/actions/goods";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/lib/actions/upload";

const AddProduct = () => {
  const { isOpen, closeAddProduct } = useAddProduct();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddProduct>();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<OptionType | null>(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const uploadImageInput = useRef<HTMLInputElement>(null);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000,
  });

  const { mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeAddProduct();
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: IAddProduct) => {
    if (!uploadImageInput.current?.files?.[0]) {
      setError("Пожалуйста, загрузите изображение.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", uploadImageInput.current?.files?.[0]);

      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      const imageUrl = `http://localhost:8080/uploads/${response.filename}`;

      const reqData: IAddProduct = {
        name: data.name,
        description,
        category: category?.value || "",
        price: Number(data.price),
        image: imageUrl,
      };

      mutate(reqData);
    } catch (error) {
      console.error(error);

      setError("Не удалось загрузить изображение.");
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeAddProduct}
      buttons={[
        { text: "Закрыть", click: closeAddProduct },
        { text: "Добавить", click: handleSubmit(onSubmit) },
      ]}
      error={error}
    >
      <h2>Добавить товар</h2>
      <form className="flex flex-col gap-5 items-start w-full">
        <div className="flex gap-[15px] items-end w-full">
          <button
            className="w-[100px] h-[100px] bg-black upload-image"
            type="button"
            onClick={() =>
              uploadImageInput.current && uploadImageInput.current.click()
            }
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-full rounded-full object-cover absolute z-8"
              />
            )}
          </button>
          <button
            className="w-[80px] h-[80px] bg-black upload-image"
            type="button"
            onClick={() =>
              uploadImageInput.current && uploadImageInput.current.click()
            }
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-full rounded-full object-cover absolute z-8"
              />
            )}
          </button>
          <button
            className="w-[60px] h-[60px] bg-black upload-image"
            type="button"
            onClick={() =>
              uploadImageInput.current && uploadImageInput.current.click()
            }
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-full rounded-full object-cover absolute z-8"
              />
            )}
          </button>
          <input
            type="file"
            hidden
            ref={uploadImageInput}
            onChange={(e) => onImageChange(e)}
          />
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
          options={categories?.data}
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