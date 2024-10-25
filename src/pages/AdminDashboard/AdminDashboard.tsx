import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Admin.module.scss";
import { IUser } from "../../types/auth.type";
import AdminForm from "./RegisterAdmin";
import ProductForm from "./ProductForm";
import InfoPanel from "./InfoPanel";
import AdminList from "./GetAdmins";

const AdminDashboard: React.FC = () => {
  const [panelId, setPanelId] = useState(0);

  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const handleSetPanelId = (id: number) => {
    setPanelId(id);
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
              className={panelId === 1 ? style.activeButton : ""}
            >
              Додати новий товар
            </button>
            <button
              onClick={() => handleSetPanelId(2)}
              className={panelId === 2 ? style.activeButton : ""}
            >
              Зареєструвати адміна
            </button>
            <button
              onClick={() => handleSetPanelId(3)}
              className={panelId === 3 ? style.activeButton : ""}
            >
              Адміни
            </button>
            <button
              onClick={() => handleSetPanelId(4)}
              className={panelId === 4 ? style.activeButton : ""}
            >
              Статистика
            </button>
          </div>
          {panelId === 1 ? (
            <ProductForm />
          ) : panelId === 2 ? (
            <AdminForm />
          ) : panelId === 3 ? (
            <div key="admins">
              <AdminList userData={userData} />
            </div>
          ) : panelId === 4 ? (
            <div key="stats">Статистика</div>
          ) : (
            <p>Вітаю, {userData.email}</p>
          )}
          <InfoPanel userData={userData} />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
