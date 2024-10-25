import style from "./Admin.module.scss";
import React from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../../types/product.type";
import { useMutation } from "@tanstack/react-query";
import { productsService } from "../../services/products.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm: React.FC = () => {
  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProductForm,
    formState: { errors },
  } = useForm<IProduct>({ mode: "onChange" }); // Валідація при зміні

  const { mutate: createProduct } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (data: IProduct) => productsService.create(data),
    onSuccess: () => {
      toast.success("Товар додано успішно");
      resetProductForm();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Помилка при додаванні товару";
      toast.error(errorMessage);
    },
  });

  const onSubmitCreateProduct = (productData: IProduct) => {
    console.log({ ...productData, rating: 0 });
    createProduct({ ...productData, rating: 0 });
  };

  return (
    <>
      <form
        key="productForm"
        onSubmit={handleProductSubmit(onSubmitCreateProduct)}
        className={style.form}
      >
        <div className={style.formItem}>
          {errors.name && (
            <span className={style.errorMessage}>{errors.name.message}</span>
          )}
          <input
            className={errors.name ? style.errorInput : ""}
            {...registerProduct("name", {
              required: "Назва є обов'язковою",
              minLength: {
                value: 3,
                message: "Назва повинна містити мінімум 3 символи",
              },
              maxLength: {
                value: 50,
                message: "Назва повинна містити не більше 50 символів",
              },
              pattern: {
                value: /(?=.*[a-zA-Zа-яА-ЯіІїЇєЄёЁґҐ])/,
                message: "Назва повинна містити хоча б одну літеру",
              },
            })}
            placeholder="Назва"
            type="text"
          />
        </div>
        <div className={style.formItem}>
          {errors.description && (
            <span className={style.errorMessage}>
              {errors.description.message}
            </span>
          )}
          <input
            className={errors.description ? style.errorInput : ""}
            {...registerProduct("description", {
              required: "Опис є обов'язковим",
              minLength: {
                value: 3,
                message: "Опис повинен містити мінімум 3 символи",
              },
              maxLength: {
                value: 250,
                message: "Опис повинен містити не більше 250 символів",
              },
              pattern: {
                value: /(?=.*[a-zA-Zа-яА-ЯіІїЇєЄёЁґҐ])/,
                message: "Опис повинен містити хоча б одну літеру",
              },
            })}
            placeholder="Опис"
            type="text"
          />
        </div>
        <div className={style.formItem}>
          {errors.price && (
            <span className={style.errorMessage}>{errors.price.message}</span>
          )}
          <input
            className={errors.price ? style.errorInput : ""}
            {...registerProduct("price", {
              required: "Ціна є обов'язковою",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Ціна повинна бути більшою",
              },
            })}
            placeholder="Ціна"
            type="number"
          />
        </div>
        <div className={style.formItem}>
          {errors.category && (
            <span className={style.errorMessage}>
              {errors.category.message}
            </span>
          )}
          <input
            className={errors.category ? style.errorInput : ""}
            {...registerProduct("category", {
              required: "Категорія є обов'язковою",
              minLength: {
                value: 3,
                message: "Категорія повинна містити мінімум 3 символи",
              },
              maxLength: {
                value: 50,
                message: "Категорія повинна містити не більше 50 символів",
              },
              pattern: {
                value: /(?=.*[a-zA-Zа-яА-ЯіІїЇєЄёЁґҐ])/,
                message: "Категорія повинна містити хоча б одну літеру",
              },
            })}
            placeholder="Категорія"
            type="text"
          />
        </div>
        <div className={style.formItem}>
          {errors.forWho && (
            <span className={style.errorMessage}>{errors.forWho.message}</span>
          )}
          <input
            className={errors.forWho ? style.errorInput : ""}
            {...registerProduct("forWho", {
              required: "Цільова група є обов'язковою",
              minLength: {
                value: 3,
                message: "Цільова група повинна містити мінімум 3 символи",
              },
              maxLength: {
                value: 50,
                message: "Цільова група повинна містити не більше 50 символів",
              },
              validate: {
                isValidCategory: (value) =>
                  ["profi", "builders", "noobs"].includes(value) ||
                  "Оберіть правильний варіант: profi, builders або noobs.",
              },
            })}
            placeholder="Для кого"
            type="text"
          />
        </div>
        <div className={style.formItem}>
          {errors.image && (
            <span className={style.errorMessage}>{errors.image.message}</span>
          )}
          <input
            className={errors.image ? style.errorInput : ""}
            {...registerProduct("image", {
              required: "Зображення є обов'язковим",
            })}
            placeholder="Зображення"
            type="text"
          />
        </div>
        <button type="submit">Додати</button>
      </form>
    </>
  );
};

export default ProductForm;
