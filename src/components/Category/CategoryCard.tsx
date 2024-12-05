import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemType, addItems } from "../../redux/slices/cartSlice";
import {
  CategoryItem,
  setBinCount,
  setModal,
} from "../../redux/slices/categorySlice";
import { RootState } from "../../redux/store";
import style from "./CategoryCard.module.scss";
import { productsService } from "../../services/products.service";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "../../types/auth.type";
import { toast } from "react-toastify";
import { setFavorites } from "../../redux/slices/favoriteSlice";

type CategoryCardProps = {
  good: CategoryItem;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ good }) => {
  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");

  const item: CartItemType = {
    //@ts-ignore
    id: good._id,
    image: good.image,
    name: good.name,
    count: 1,
    price: parseFloat(good.price),
  };

  const [isFavorite, setIsFavorite] = useState<boolean>(
    userData?.favorites?.includes(good._id),
  );
  const [selectCard, setSelectCard] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState<number>(good.rating);

  const newGood = useSelector(
    (state: RootState) => state.categorySlice.newGood,
  );
  const binCount = useSelector(
    (state: RootState) => state.categorySlice.binCount,
  );
  const dispatch = useDispatch();

  dispatch(setFavorites(userData?.favorites));

  const mutation = useMutation<IUser, unknown, string>({
    mutationFn: async (_id: string) => {
      return await (userData.favorites?.includes(_id)
        ? productsService.removeFromFavorite(_id)
        : productsService.addToFavorite(_id));
    },
    onSuccess: (data, id) => {
      console.log("Successfully updated favorites:", data);

      let updatedFavorites = [...userData.favorites];

      if (updatedFavorites?.includes(id))
        updatedFavorites = updatedFavorites?.filter((favId) => favId !== id);
      else updatedFavorites.push(id);

      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, favorites: updatedFavorites }),
      );
      setIsFavorite(updatedFavorites?.includes(id));
      dispatch(setFavorites(updatedFavorites));
    },
    onError: () => {
      if (userData) {
        toast.error("Увійдіть, щоб додати товар в улюблене.");
      } 
    },
  });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await productsService.getRating(good._id);
        setAverageRating(data.globalRating);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [good._id]);

  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }): Promise<void> => {
      await productsService.addToCart(productId, quantity);
      // @ts-ignore
      userData?.cart?.push({ product: productId, quantity });
    },
    onSuccess: () => {
      console.log("Товар доданий в корзину");


      dispatch(setModal(true));
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
      toast.error("Сталася помилка при додаванні товара в корзину.");
    },
  });

  const handleAddToCart = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();

    addToCartMutation.mutate({
      productId: good._id,
      quantity: item.count,
    });

    userData?.cart?.push();

    //@ts-ignore
    dispatch(addItems(item));
    // dispatch(setBinCount(binCount + 1));
    // dispatch(setModal(true));
  };

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (good._id) {
      mutation.mutate(good._id);
    } else {
      alert("Invalid product ID");
    }
  };

  return (
    <>
      <Link to={`/react-tattoo-store/product/${good._id}`}>
        <div
          onMouseEnter={() => setSelectCard(true)}
          onMouseLeave={() => setSelectCard(false)}
          className={style.categoryCard}
        >
          {newGood && <span className={style.new}>Новинка</span>}

          <div
            onClick={(e) => toggleFavorite(e)}
            className={style.favoriteIcon}
          >
            {userData.favorites?.includes(good._id) ? (
              <svg
                className={style.favoriteFilled}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#bb8c5f"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className={style.favoriteOutline}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bb8c5f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </div>

          <div
            className={style.bg}
            style={{ backgroundImage: `url(${good.image})` }}
          />
          <div className={style.card__info}>
            <p className={style.info__name}>{good.name}</p>
            {isLoading ? (
              <p>Loading rating...</p>
            ) : isError ? (
              <p>Error loading rating</p>
            ) : (
              <Rating name="read-only" value={averageRating} readOnly />
            )}
            <p className={style.info__price}>{good.price} ₴</p>
            {selectCard && (
              <span onClick={handleAddToCart} className={style.span__add}>
                Додати в корзину
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className={style.categoryCard__phone}>
        <Link to={`/react-tattoo-store/product/${good._id}`}>
          {newGood && <span className={style.new}>Новинка</span>}

          <div
            onClick={(e) => toggleFavorite(e)}
            className={style.favoriteIcon}
          >
            {userData.favorites?.includes(good._id) ? (
              <svg
                className={style.favoriteFilled}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#bb8c5f"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className={style.favoriteOutline}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bb8c5f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24px"
                height="24px"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </div>

          <div
            className={style.bg}
            style={{ backgroundImage: `url(${good.image})` }}
          ></div>
          <div className={style.card__info}>
            <p className={style.info__name}>{good.name}</p>
            <Rating name="read-only" value={good.rating} readOnly />
            <p className={style.info__price}>{good.price} ₴</p>
            <span onClick={handleAddToCart} className={style.span__add}>
              Додати в корзину
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CategoryCard;
