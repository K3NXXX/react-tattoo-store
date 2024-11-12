import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartItemType } from '../../redux/slices/cartSlice';
import { setIsAuthFormOpened } from '../../redux/slices/globalSlice';
import { RootState } from '../../redux/store';
import { IUser } from '../../types/auth.type';

import account from '../../assets/img/account-icon.svg';
import email from '../../assets/img/email-icon.svg';
import favourite from '../../assets/img/favourite-icon.svg';
import phone from '../../assets/img/phone-icon.svg';
import shop_bin from '../../assets/img/shop-bin-icon.svg';

import style from './Header.module.scss';

const HeaderTop: React.FC = () => {
  let [openMenu, setOpenMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const jwtToken = localStorage.getItem('jwt');
  const userData: IUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const favoritesCount = useSelector((state: RootState) => state.favorites?.favorites?.length);

  const { items, totalPrice } = useSelector((state: RootState) => state.cartSlice);
  const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);
  const toggleMenu = (): void => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (isMounted) {
      const cartItems = JSON.stringify(items);
      const cartTotalPrice = JSON.stringify(totalPrice);
      localStorage.setItem('cartItems', cartItems);
      localStorage.setItem('cartTotalPrice', cartTotalPrice);
    }
    isMounted.current = true;
  }, [items, totalPrice]);

  return (
    <>
      <div className={style.top}>
        <div className={style.left}>
          <div className={style.menu}>
            <p>Меню</p>
            {openMenu ? (
              <svg className={style.menu__cross} onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="21.9706" width="24" height="2" transform="rotate(-45 5 21.9706)" fill="#BB8C5F" />
                <rect x="6.22168" y="4.80761" width="24" height="2" transform="rotate(45 6.22168 4.80761)" fill="#BB8C5F" />
              </svg>
            ) : (
              <svg className={style.menu__svg} onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M2 13H26V15H2V13Z" fill="#BB8C5F" />
                <path d="M2 7H26V9H2V7Z" fill="#BB8C5F" />
                <path d="M2 19H26V21H2V19Z" fill="#BB8C5F" />
              </svg>
            )}
          </div>

          <div className={style.contacts}>
            <div className={style.contacts__phone}>
              <img src={phone} alt="phone-icon" />
              <a href="tel:+380975525252">
                <span className={style.phone__number}>+380 97 552-52-52</span>
              </a>
            </div>
            <div className={style.contacts__social}>
              <span>
                <a href="tel:+380975525252">Viber</a>
              </span>
              <span>
                <a href="tel:+380975525252">Whats app</a>
              </span>
              <span>
                <a href="tel:+380975525252">Telegram</a>
              </span>
            </div>
          </div>
          <div className={style.email}>
            <img src={email} alt="email-icon" />
            <a href="mailto:Mr.Driskell@gmail.com">Mr.Driskell@gmail.com</a>
          </div>
          <Link to="/react-tattoo-store" className={style.logo}>
            <span className={style.logo__name}>mr. driskell</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="6" viewBox="0 0 192 6" fill="none">
              <path
                d="M0.113249 3.00002L3 5.88677L5.88675 3.00002L3 0.113264L0.113249 3.00002ZM191.887 3L189 0.113248L186.113 3L189 5.88675L191.887 3ZM3 3.50002L189 3.5L189 2.5L3 2.50002L3 3.50002Z"
                fill="#BB8C5F"
              />
            </svg>
            <span>Tattoo shop</span>
          </Link>
        </div>
        <div className={style.right}>
          <Link to="/react-tattoo-store/cart" className={style.shop__bin}>
            <img src={shop_bin} alt="shop bin" />

            {totalCount > 0 ? <span className={style.count}>{totalCount}</span> : ''}
          </Link>
          <Link to="/react-tattoo-store/favorites" className={style.header__favLink}>
            <img src={favourite} alt="favourite" />

            {userData?.favorites?.length > 0 ? <span className={style.count}>{userData?.favorites?.length}</span> : ''}
          </Link>
          {jwtToken ? (
            <Link to={`/react-tattoo-store/${userData.role === 'admin' ? 'admin-dashboard' : 'account'}`}>
              <img className={style.accountImg} src={account} alt="account" />
            </Link>
          ) : (
            <img onClick={() => dispatch(setIsAuthFormOpened(true))} className={style.accountImg} src={account} alt="account" />
          )}
        </div>
      </div>
      <svg className={style.svg__line} xmlns="http://www.w3.org/2000/svg" width="1216" height="6" viewBox="0 0 1216 6" fill="none">
        <path d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1211 3.5L1216 5.88675V0.113249L1211 2.5V3.5ZM4.5 3.5H1211.5V2.5H4.5V3.5Z" fill="#524336" />
      </svg>
    </>
  );
};

export default HeaderTop;
