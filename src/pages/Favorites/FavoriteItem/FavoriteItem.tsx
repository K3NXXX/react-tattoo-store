import style from "./FavoriteItem.module.scss";
import { FavoriteItemComponentProps } from "../FavoriteItems/FavoriteItems";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { IUser } from "../../../types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { productsService } from "../../../services/products.service";
import { setFavorites } from "../../../redux/slices/favoriteSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type FavoriteItemProps = {
  _id: string;
  image: string;
  name: string;
  price: number;
  count: number;
  rating: number;
  description: string;
};
const FavoriteItem: React.FC<FavoriteItemComponentProps> = ({ item }) => {
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState<boolean>(
    userData.favorites?.includes(item._id),
  );
  const [isRemoved, setIsRemoved] = useState(false);

  const mutation = useMutation<IUser, unknown, string>({
    mutationFn: async (_id: string) => productsService.removeFromFavorite(_id),
    onSuccess: (data, id) => {
      let updatedFavorites = [...userData.favorites];

      if (updatedFavorites?.includes(id))
        updatedFavorites = updatedFavorites?.filter((favId) => favId !== id);

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, favorites: updatedFavorites }),
      );
      setIsFavorite(updatedFavorites?.includes(id));
      setIsRemoved(true);
      dispatch(setFavorites(updatedFavorites));
    },
    onError: (error) => {
      console.error("Error updating favorites:", error);
      toast.error(`Error updating favorite status: ${error}`);
    },
  });

  const onClickRemoveItem = (e: any): void => {
    e.preventDefault();
    mutation.mutate(item._id);
  };

  if (isRemoved) return null;

  return (
    <>
      <Link to={`/react-tattoo-store/product/${item._id}`}>
        <div className={style.favoriteCard}>
          <div
            className={style.bg}
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className={style.card__info}>
            <p className={style.info__name}>{item.name}</p>
            <Rating name="read-only" value={item.rating} readOnly />
            <p className={style.info__price}>{item.price} ₴</p>
            <button onClick={onClickRemoveItem} className={style.span__add}>
              Видалити
            </button>
          </div>
        </div>
      </Link>

      {/*<div className={style.favoriteCard__phone}>*/}
      {/*  <Link to={`/react-tattoo-store/product/${item._id}`}>*/}
      {/*    <div*/}
      {/*      className={style.bg}*/}
      {/*      style={{ backgroundImage: `url(${item.image})` }}*/}
      {/*    ></div>*/}
      {/*    <div className={style.card__info}>*/}
      {/*      <p className={style.info__name}>{item.name}</p>*/}
      {/*      <Rating name="read-only" value={item.rating} readOnly />*/}
      {/*      <p className={style.info__price}>{item.price} ₴</p>*/}
      {/*    </div>*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </>
  );
};

export default FavoriteItem;
