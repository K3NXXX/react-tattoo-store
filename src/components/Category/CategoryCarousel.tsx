import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CategoryItem } from "../../redux/slices/categorySlice";
import Skeleton from "../Skeleton/Skeleton";
import style from "./Category.module.scss";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CategoryCarousel: React.FC = () => {
  const { goods, isLoading } = useSelector(
    (state: RootState) => state.categorySlice,
  );

  const skeleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

  useEffect(() => {
    const resizeWindow = (): void => {
      if (window.innerWidth <= 636) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 984) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return (
    <div className={style.category__swiper}>
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
      >
        {isLoading ? (
          skeleton
        ) : goods && goods.length ? (
          goods.map((good: CategoryItem) => (
            <SwiperSlide key={good._id}>
              <CategoryCard good={good} />
            </SwiperSlide>
          ))
        ) : (
          <p className={style.noGoods}>Товари відсутні</p>
        )}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;
