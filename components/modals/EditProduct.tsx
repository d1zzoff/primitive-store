"use client";

import ModalLayout from "./ModalLayout";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Dropdown, { OptionType } from "@/components/ui/Dropdown";
import useEditProductModal from "@/lib/hooks/useEditProductModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editProduct,
  getCategories,
  getEditProductInfo,
  IEditProduct,
} from "@/lib/actions/goods";
import { uploadImage } from "@/lib/actions/upload";

const EditProduct = () => {
  const { isOpen, closeEditProductModal, productId } = useEditProductModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditProduct>();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<OptionType | null>(null);
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000,
    enabled: !!productId,
  });

  const { data: product } = useQuery({
    queryKey: ["edit-product-info", productId],
    queryFn: () => getEditProductInfo(productId || 0),
    enabled: !!productId,
  });

  const { mutate } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      closeEditProductModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const onSubmit = async (data: IEditProduct) => {
    if (!productId) return;

    try {
      let imageUrl;

      if (uploadImageInput.current?.files) {
        const formData = new FormData();
        formData.append("image", uploadImageInput.current?.files?.[0]);

        const response = await fetch("http://localhost:8080/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json());

        imageUrl = `http://localhost:8080/uploads/${response.filename}`;
      }

      const reqData: IEditProduct = {
        good_id: productId || 0,
        name: data.name || product?.data.name,
        description: description || product?.data.description,
        category: category?.value || product?.data.category,
        price: Number(data.price) || product?.data.price,
        image: imageUrl || product?.data.image,
      };

      mutate(reqData);
    } catch (error) {
      console.error(error);

      setError("Не удалось загрузить изображение.");
    }
  };

  useEffect(() => {
    if (
      isOpen &&
      categories?.ok &&
      categories?.data &&
      product?.ok &&
      product?.data
    ) {
      reset({
        name: product?.data.name,
        price: product?.data.price,
      });

      setDescription(product?.data.description);

      const foundCategory =
        categories.data.find((el) => el.label === product?.data.category) ||
        null;
      setCategory(foundCategory);
    }
  }, [categories, product, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      reset();

      setImagePreview(null);
      setDescription("");
      setCategory(null);
    }
  }, [isOpen]);

  const uploadImageInput = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={closeEditProductModal}
      buttons={[
        { text: "Закрыть", click: closeEditProductModal },
        { text: "Изменить", click: handleSubmit(onSubmit) },
      ]}
      error={error}
    >
      <h2>Изменить товар</h2>
      <form className="flex flex-col gap-5 items-start w-full">
        <div className="flex gap-[15px] items-end w-full">
          <button
            className="w-[100px] h-[100px] bg-black upload-image"
            type="button"
            onClick={() =>
              uploadImageInput.current && uploadImageInput.current.click()
            }
          >
            {(imagePreview || product?.data.image) && (
              <img
                src={imagePreview || product?.data.image}
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
            {(imagePreview || product?.data.image) && (
              <img
                src={imagePreview || product?.data.image}
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
            {(imagePreview || product?.data.image) && (
              <img
                src={imagePreview || product?.data.image}
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

export default EditProduct;
