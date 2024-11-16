import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import style from "./Orders.module.scss";

const Orders: React.FC = () => {
  const { items } = useSelector((state: RootState) => state.cartSlice);

  return (
    <div className={style.left}>
      <div className={style.allCart}>
        <div className={style.goods}>
          {/*{userData.cart.length > 0 ? (*/}
          {/*  userData.cart.map((item: CartItem) => {*/}
          {/*    return <Order key={item.product._id} item={item} />;*/}
          {/*  })*/}
          {/*) : (*/}
          {/*  <div className={style.empty}>У вас ще немає замовлень</div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default Orders;
