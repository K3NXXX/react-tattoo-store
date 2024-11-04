import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessData } from "../../../redux/slices/cartSlice";
import { RootState } from "../../../redux/store";
import { IUser } from "../../../types/auth.type";
import style from "./ReceiverData.module.scss";

interface ReceiverDataProps {
  isAccount: boolean;
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ isAccount }) => {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const { items } = useSelector((state: RootState) => state.cartSlice);

  const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}");
  const addressData = JSON.parse(localStorage.getItem("addressData") ?? "{}");

  const [name, setName] = useState(
    userData.surname + " " + userData.name || "",
  );
  const [phone, setPhone] = useState(userData.phone_number || "");
  const [email, setEmail] = useState(userData.email || "");

  const [city, setCity] = useState(addressData.city || "");
  const [street, setStreet] = useState(addressData.street || "");
  const [flat, setFlat] = useState(addressData.flat || "");
  const [entrance, setEntrance] = useState(addressData.entrance || "");
  const [floor, setFloor] = useState(addressData.floor || "");
  const [intercom, setIntercom] = useState(addressData.intercom || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any): void => {
    dispatch(setSuccessData(true));
    reset();
    console.log("data", data);
  };

  useEffect(() => {
    setIsEmpty(items.length < 1);
  }, [items]);

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        surname: name.split(" ")[0],
        name: name.split(" ")[1] || "",
        _id: userData?._id || "",
        phone_number: phone,
        favorites: userData?.favorites || [],
        email,
      }),
    );
  }, [name, phone, email, userData?.favorites, userData?._id]);

  useEffect(() => {
    localStorage.setItem(
      "addressData",
      JSON.stringify({ city, street, flat, entrance, floor, intercom }),
    );
  }, [city, street, flat, entrance, floor, intercom]);

  return (
    <div className={style.usersData__form}>
      <div className={style.form__top}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.receiver__info}
        >
          <p>01. Інформація про отримувача</p>
        </form>
        <div className={style.top__row}>
          <div className={style.column}>
            <label>Прізвище та ім'я</label>
            <input
              {...register("name", {
                required: `Ім'я та прізвище вказано неправильно`,
              })}
              type="text"
              placeholder="Іванов Іван"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={style.column}>
            <label>Телефон</label>
            <input
              {...register("phone", {
                required: `Номер телефону вказаний неправильно`,
                pattern: {
                  value:
                    /\(?(\s*[0-9]{3}\s*)\)?([ .-]?)(\s*[0-9]{3}\s*)\2(\s*[0-9]{4}\s*)/,
                  message: "Номер телефону вказаний неправильно",
                },
              })}
              type="text"
              placeholder="+380555353535"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={style.column}>
            <label>Ел. пошта</label>
            <input
              {...register("email", {
                required: `Ел. пошта вказана неправильно`,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/,
                  message: "Введіть правильний email",
                },
              })}
              type="text"
              placeholder="Ivanov2021@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={style.form__bottom}>
        <div className={style.receiver__info}>
          <p>02. Адреса доставки</p>
        </div>
        <div className={style.bottom__row}>
          <div className={style.home}>
            <div className={style.column}>
              <label>Місто</label>
              <input
                type="text"
                placeholder="Львів"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={style.column}>
              <label>Вулиця, дім</label>
              <input
                type="text"
                placeholder="вул. Львівська, 13"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
          <div className={style.flat}>
            <div className={style.column}>
              <label>Квартира / офіс</label>
              <input
                type="text"
                placeholder="324"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
              />
            </div>
            <div className={style.column}>
              <label>Під'їзд</label>
              <input
                type="text"
                placeholder="5"
                value={entrance}
                onChange={(e) => setEntrance(e.target.value)}
              />
            </div>
            <div className={style.column}>
              <label>Поверх</label>
              <input
                type="text"
                placeholder="7"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>
            <div className={style.column}>
              <label>Домофон</label>
              <input
                type="text"
                placeholder="6470"
                value={intercom}
                onChange={(e) => setIntercom(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {(errors.name ||
        errors.phone ||
        errors.email ||
        errors.city ||
        errors.street) && <div>Дані вказано не всі або некоректно</div>}
      <div className={style.empty__error}>
        {isEmpty ? "Додайте товар, щоб оформити замовлення" : ""}
      </div>
      {isAccount ? "" : <button disabled={isEmpty}>Оформити замовлення</button>}
    </div>
  );
};

export default ReceiverData;
