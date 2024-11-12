import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Favorites.module.scss";
import FavoriteItems from "./FavoriteItems/FavoriteItems";
import { IUser } from "../../types/auth.type";

const Favorites: React.FC = () => {
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={style.wrapper}>
      <div className={style.path}>
        <Link to="/react-tattoo-store">Головна</Link> /
        <Link to={`/react-tattoo-store/favorites`}> Улюблені</Link>
      </div>
      `<h5 className={style.title}>Улюблені</h5>
      <div className={style.content}>
        {userData?._id?.length <= 0 ? (
          <h3>Увійдіть, щоб переглянути улюблені.</h3>
        ) : (
          <FavoriteItems />
        )}
      </div>
    </section>
  );
};

export default Favorites;
