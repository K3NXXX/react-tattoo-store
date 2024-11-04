import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./Favorites.module.scss";
import { IUser } from "../../types/auth.type";
import FavoriteItems from "./FavoriteItems/FavoriteItems";

const Favorites: React.FC = () => {
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.wrapper}>
      <div className={style.path}>
        <Link to="/react-tattoo-store">Головна</Link> /
        <Link to={`/react-tattoo-store/cart`}> Улюблені</Link>
      </div>
      `<h5 className={style.title}>Улюблені</h5>
      <div className={style.content}>
        <FavoriteItems />
      </div>
      {!userData?.favorites && (
        <div className={style.popup_bg}>
          <div ref={popupRef} className={style.popup}>
            <p className={style.thanks}>Дякуємо за замовлення!</p>
            <p className={style.number}>
              Номер вашого замовлення:{" "}
              <span>{Math.floor(Math.random() * (50000 - 1 + 1)) + 1}</span>
            </p>
            <p className={style.info}>
              Найближчим часом з вами зв'яжеться наш менеджер для уточнення
              деталей замовлення
            </p>
            <div className={style.popup__buttons}>
              <Link to="/react-tattoo-store">Вернутися на головну</Link>
              <Link to="/react-tattoo-store/catalog/2">
                Вернутися в каталог
              </Link>
            </div>
            <svg
              className={style.close}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="40"
              viewBox="0 0 15 40"
              fill="none"
            >
              <g clipPath="url(#clip0_537_10715)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 19.7929L11.0355 16.2573L11.7426 16.9644L8.20711 20.5L11.7426 24.0355L11.0355 24.7426L7.5 21.2071L3.96447 24.7426L3.25736 24.0355L6.79289 20.5L3.25736 16.9644L3.96447 16.2573L7.5 19.7929Z"
                  fill="#636B78"
                />
              </g>
              <defs>
                <clipPath id="clip0_537_10715">
                  <rect width="15" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;
