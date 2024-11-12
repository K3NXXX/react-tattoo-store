import FavoriteItem, { FavoriteItemProps } from "../FavoriteItem/FavoriteItem";
import style from "./FavoriteItems.module.scss";
import { productsService } from "../../../services/products.service";
import { useState, useEffect } from "react";
import { IUser } from "../../../types/auth.type";

export interface FavoriteItemComponentProps {
  item: FavoriteItemProps;
}

const FavoriteItems: React.FC = () => {
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const [localFavorites, setLocalFavorites] = useState<string[]>(
    userData?.favorites || [],
  );
  const [favorites, setFavorites] = useState<FavoriteItemProps[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await productsService.getFavorites();
        setFavorites(data);
        setLocalFavorites(data.map((item: any) => item._id));
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading)
    return (
      <div className={style.loading}>
        <div className={style.spinnerWrapper}>
          <div className={style.spinner}></div>
        </div>
        <p>Завантаження улюблених товарів...</p>
      </div>
    );
  if (isError)
    return <div className={style.empty}>У вас ще немає улюблених товарів.</div>;

  return (
    <div className={style.all}>
      <div className={style.line}></div>

      <div className={style.favorites}>
        {localFavorites?.length > 0 && favorites ? (
          favorites?.map((item: FavoriteItemProps) => (
            <FavoriteItem key={item._id} item={item} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default FavoriteItems;
