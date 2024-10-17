import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./AdminDashboard.module.scss";
import { IUser } from "../../types/auth.type";
import { useForm } from "react-hook-form";
import { IProduct } from "../../types/product.type";
import { useMutation } from "@tanstack/react-query";
import { productsService } from "../../services/products.service";
import { toast } from "react-toastify";
import { IAdmin } from "../../types/admin.type";
import { adminService } from "../../services/admin.service";

const AdminDashboard: React.FC = () => {
  const [panelId, setPanelId] = useState(0);
  const navigate = useNavigate();
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    reset: resetProductForm,
  } = useForm<IProduct>({ mode: "onChange" });

  const {
    register: registerAdminForm,
    handleSubmit: handleAdminSubmit,
    reset: resetAdminForm,
  } = useForm<IAdmin>({ mode: "onChange" });

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

  const { mutate: registerAdmin } = useMutation({
    mutationKey: ["registerAdmin"],
    mutationFn: (data: IAdmin) => adminService.create(data),
    onSuccess: () => {
      toast.success("Адміністратора зареєстровано успішно");
      resetAdminForm();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Помилка при реєстрації адміністратора";
      toast.error(errorMessage);
    },
  });

  const onSubmitCreateProduct = (productData: IProduct) => {
    createProduct(productData);
  };

  const onSubmitRegisterAdmin = (adminData: IAdmin) => {
    registerAdmin(adminData);
  };

  const handleSetPanelId = (id: number) => {
    setPanelId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    navigate("/react-tattoo-store");
    window.location.reload();
  };

  return (
    <section className={style.wrapper}>
      <div className={style.left}>
        <div className={style.path}>
          <Link to="/react-tattoo-store">Головна</Link> /
          <Link to="/react-tattoo-shop/account"> Адмін панель</Link>
        </div>
        <h2 className={style.title}>Адмін панель</h2>
        <div className={style.container}>
          <div className={style.buttons}>
            <button
              onClick={() => handleSetPanelId(1)}
              className={panelId === 1 && style.activeButton}
            >
              Додати новий товар
            </button>
            <button
              onClick={() => handleSetPanelId(2)}
              className={panelId === 2 && style.activeButton}
            >
              Зареєструвати адміна
            </button>
            <button
              onClick={() => handleSetPanelId(3)}
              className={panelId === 3 && style.activeButton}
            >
              Статистика
            </button>
          </div>
          {panelId === 1 ? (
            <form
              key="productForm"
              onSubmit={handleProductSubmit(onSubmitCreateProduct)}
              className={style.form}
            >
              {/*<h3>Додати новий товар</h3>*/}
              <div className={style.formItem}>
                <input
                  {...registerProduct("name", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Назва повинна містити мінімум 3 символи",
                    },
                    maxLength: {
                      value: 50,
                      message: "Назва повинна містити не більше 50 символів",
                    },
                  })}
                  placeholder="Назва"
                  type="text"
                />
              </div>
              <div className={style.formItem}>
                <input
                  {...registerProduct("description", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Опис повиннен містити мінімум 3 символи",
                    },
                    maxLength: {
                      value: 150,
                      message: "Опис повинен містити не більше 150 символів",
                    },
                  })}
                  placeholder="Опис"
                  type="text"
                />
              </div>
              <div className={style.formItem}>
                <input
                  {...registerProduct("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Ціна"
                  type="number"
                />
              </div>
              <div className={style.formItem}>
                <input
                  {...registerProduct("category", {
                    required: true,
                    minLength: {
                      value: 3,
                      message: "Категорія повинна містити мінімум 3 символи",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Категорія повинна містити не більше 50 символів",
                    },
                  })}
                  placeholder="Категорія"
                  type="text"
                />
              </div>
              <div className={style.formItem}>
                <input
                  {...registerProduct("image")}
                  placeholder="Зображення"
                  type="text"
                />
              </div>
              <button>Додати</button>
            </form>
          ) : panelId === 2 ? (
            <form
              key="adminForm"
              onSubmit={handleAdminSubmit(onSubmitRegisterAdmin)}
              className={style.form}
            >
              <div className={style.formItem}>
                <input
                  {...registerAdminForm("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Невірна пошта",
                    },
                    maxLength: {
                      value: 100,
                      message: "Пошта повинна містити максимум 100 символів",
                    },
                  })}
                  placeholder="Ел. пошта"
                  type="text"
                />
              </div>
              <div className={style.formItem}>
                <input
                  {...registerAdminForm("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Пароль повинен містити мінімум 8 символів",
                    },
                    pattern: {
                      value: /\d/,
                      message: "Пароль повинен містити мінімум 1 цифру",
                    },
                  })}
                  placeholder="Пароль"
                  type="password"
                />
              </div>

              <button>Додати</button>
            </form>
          ) : (
            <div key="stats">Stats</div>
          )}
          <div className={style.userInfo}>
            <div className={style.column}>
              <div className={style.online}>
                <div className={style.contacts}>
                  <div className={style.contactsData}>
                    Ел. пошта: <p>{userData.email}</p>
                  </div>
                </div>
                <button onClick={() => handleLogout()} className={style.exit}>
                  Вийти
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
