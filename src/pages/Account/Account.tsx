import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import noAvatar from "../../assets/img/Account/noAvatar.webp";
import { authService } from "../../services/auth.service";
import { IUser } from "../../types/auth.type";
import CartGoods from "../Cart/CartGoods/CartGoods";
import ReceiverData from "../Cart/ReceiverData/ReceiverData";
import style from "./Account.module.scss";

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>(noAvatar);
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const handleAvatarUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/react-tattoo-store");
    window.location.reload();
    authService.logout();
  };

  return (
    <section className={style.wrapper}>
      <div className={style.left}>
        <div className={style.path}>
          <Link to="/react-tattoo-store">Головна</Link> /
          <Link to="/react-tattoo-shop/account"> Особистий кабінет</Link>
        </div>
        <h2 className={style.title}>Особистий кабінет</h2>
        <div className={style.content}>
              <div className={style.userInfo}>
          <div className={style.column}>
            <input
              type="file"
              accept="image/*"
              id="avatar-input"
              style={{ display: "none" }}
              onChange={handleAvatarUpload}
            />
            <label htmlFor="avatar-input">
              <img className={style.avatar} src={avatar} alt="avatar" />
            </label>
            <div className={style.online}>
              <div>
                <p className={style.name}>{userData?.name}</p>
              </div>
              <button onClick={() => handleLogout()} className={style.exit}>
                Вийти
              </button>
            </div>
          </div>
          <div className={style.column}>
            <div className={style.online}>
              <div className={style.contacts}>
                <div>
                  <p className={style.contactsData}>Ел. пошта:</p>
                  <p>{userData.email}</p>
                </div>
                <div>
                  <p className={style.contactsData}>Номер тел.:</p>
                  <p>{userData.phone_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <ReceiverData isAccount={true} />
        <p className={style.cart}>Товари в корзині</p>
        <CartGoods />
      </div>
    </section>
  );
};

export default Account;
