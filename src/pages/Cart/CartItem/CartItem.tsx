import { useDispatch } from "react-redux";

import style from "./CartItem.module.scss";
import deleteGood from "../../../assets/img/Cart/cross.svg";
import { CartItemType } from "../CartGoods/CartGoods";
import { productsService } from "../../../services/products.service";
import { useState } from "react";

type CartItemProps = {
  item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const onClickPlusItem = async () => {
    setQuantity(quantity + 1);
  };

  const onClickMinusItem = (): void => {
    setQuantity(quantity - 1);
  };
  const onClickRemoveItem = async () => {
    try {
      await productsService.removeFromCart(item.id);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <>
      <div className={style.good}>
        <div>
          <img className={style.goodImg} src={item.product.image} alt="good" />
        </div>
        <p className={style.name}>{item.product.name}</p>
        <p className={style.price}>{item.product.price}₴</p>
        <div className={style.quantity}>
          <svg
            onClick={onClickMinusItem}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="40"
            viewBox="0 0 15 40"
            fill="none"
          >
            <path d="M2 21H13V20H2V21Z" fill="#3E424B" />
          </svg>
          <span className={style.count__number}>{quantity}</span>
          <svg
            onClick={onClickPlusItem}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="40"
            viewBox="0 0 15 40"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 20V15H8V20H13V21H8V26H7V21H2V20H7Z"
              fill="#3E424B"
            />
          </svg>
        </div>
        <span className={style.goodTotalPrice}>
          {item.product.price * quantity}₴
        </span>
        <div>
          <img
            onClick={onClickRemoveItem}
            className={style.deleteGood}
            src={deleteGood}
            alt="deleteGood"
          />
        </div>
      </div>
      <div className={style.good__phone}>
        <div className={style.good__phone_top}>
          <div>
            <img
              className={style.goodImg}
              src={item.product.image}
              alt="good"
            />
          </div>
          <div className={style.nameAndPrice}>
            <p className={style.name}>{item.product.name}</p>
            <p className={style.price}>{item.product.price}₴</p>
          </div>
          <div>
            <img
              onClick={onClickRemoveItem}
              className={style.deleteGood}
              src={deleteGood}
              alt="deleteGood"
            />
          </div>
        </div>
        <div className={style.good__phone_bottom}>
          <div className={style.quantity}>
            <svg
              onClick={onClickMinusItem}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="40"
              viewBox="0 0 15 40"
              fill="none"
            >
              <path d="M2 21H13V20H2V21Z" fill="#3E424B" />
            </svg>
            <span className={style.count__number}>{quantity}</span>
            <svg
              onClick={onClickPlusItem}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="40"
              viewBox="0 0 15 40"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 20V15H8V20H13V21H8V26H7V21H2V20H7Z"
                fill="#3E424B"
              />
            </svg>
          </div>
          <span className={style.goodTotalPrice}>
            {item.product.price * item.quantity}₴
          </span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
