import { Rating } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItemType, addItems } from '../../redux/slices/cartSlice'
import {
	CategoryItem,
	setBinCount,
	setModal,
} from '../../redux/slices/categorySlice'
import { RootState } from '../../redux/store'
import style from './CategoryCard.module.scss'

type CategoryCardProps = {
	good: CategoryItem
}

const CategoryCard: React.FC<CategoryCardProps> = ({ good }) => {
	const [selectCard, setSelectCard] = useState<boolean>(false)
	const newGood = useSelector((state: RootState) => state.categorySlice.newGood)
	const binCount = useSelector(
		(state: RootState) => state.categorySlice.binCount
	)
	const dispatch = useDispatch()

	const handleAddToCart = (event:React.MouseEvent<HTMLSpanElement>): void => {
		const item: CartItemType = {
			id: good._id,
			image: good.image,
			name: good.name,
			count: 1,
			price: parseFloat(good.price),
		}
		event.preventDefault()
			//@ts-ignore
		dispatch(addItems(item))
		dispatch(setBinCount(binCount + 1))
		dispatch(setModal(true))
	}

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
						className={style.bg}
						style={{ backgroundImage: `url(${good.image})` }}
					></div>
					<div className={style.card__info}>
						<p className={style.info__name}>{good.name}</p>
						<Rating name='read-only' value={good.rating} readOnly />
						<p className={style.info__price}>{good.price} ₴</p>
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
						className={style.bg}
						style={{ backgroundImage: `url(${good.image})` }}
					></div>
					<div className={style.card__info}>
						<p className={style.info__name}>{good.name}</p>
						<Rating name='read-only' value={good.rating} readOnly />
						<p className={style.info__price}>{good.price} ₴</p>
						<span onClick={handleAddToCart} className={style.span__add}>
							Додати в корзину
						</span>
					</div>
				</Link>
			</div>
		</>
	)
}

export default CategoryCard
