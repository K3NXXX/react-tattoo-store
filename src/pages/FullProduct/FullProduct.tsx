import { CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { addItems, CartItemType } from '../../redux/slices/cartSlice'
import { setBinCount, setModal } from '../../redux/slices/categorySlice'
import { RootState } from '../../redux/store'
import { productsService } from '../../services/products.service'
import YouAlsoCanLike from '../../components/YouAlsoCanLike/YouAlsoCanLike'
import style from './FullProduct.module.scss'

const FullProduct: React.FC = () => {
	const { id } = useParams()
	const location = useLocation()
	const dispatch = useDispatch()
	const [quantity, setQuantity] = useState(1)
	const binCount = useSelector(
		(state: RootState) => state.categorySlice.binCount
	)

	const {
		data: good,
		isLoading: goodLoading,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ['getProduct'],
		queryFn: () => productsService.getOne(id as string),
		enabled: false,
	})

	const handleAddToCart = (): void => {
		if (good) {
			const item: CartItemType = {
				//@ts-ignore
				id: good._id,
				image: good.image,
				name: good.name,
				count: quantity,
				price: parseFloat(good.price),
			}
			//@ts-ignore
			dispatch(addItems(item))
			dispatch(setBinCount(binCount + quantity))
			dispatch(setModal(true))
		}
	}

	const onClickPlusItem = (): void => {
		setQuantity(prev => prev + 1)
	}
	const onClickMinusItem = (): void => {
		if (quantity > 1) setQuantity(prev => prev - 1)
	}

	useEffect(() => {
		refetch()
	}, [location])

	if (goodLoading || isFetching) {
		return (
			<div className={style.loading}>
				<CircularProgress className={style.loading__icon} />
			</div>
		)
	}

	return (
		<div className={style.wrapper}>
			<div className={style.wrapper__content}>
				<div className={style.content}>
					<div className={style.left}>
						<div className={style.img__wrapper}>
							<img src={good?.image} alt='product' />
						</div>
						<div className={style.description}>
							<p className={style.description__title}>Опис</p>
							<p className={style.description__text}>{good?.description}</p>
						</div>
					</div>
					<div className={style.right}>
						<p className={style.product__title}>{good?.name}</p>
						<div className={style.addToCart}>
							<div className={style.addToCart__left}>
								<div className={style.price__wrapper}>
									<div className={style.quantity}>
										<svg
											onClick={onClickMinusItem}
											xmlns='http://www.w3.org/2000/svg'
											width='15'
											height='40'
											viewBox='0 0 15 40'
											fill='none'
										>
											<path d='M2 21H13V20H2V21Z' fill='#3E424B' />
										</svg>
										<span className={style.count__number}>{quantity}</span>
										<svg
											onClick={onClickPlusItem}
											xmlns='http://www.w3.org/2000/svg'
											width='15'
											height='40'
											viewBox='0 0 15 40'
											fill='none'
										>
											<path
												fillRule='evenodd'
												clipRule='evenodd'
												d='M7 20V15H8V20H13V21H8V26H7V21H2V20H7Z'
												fill='#3E424B'
											/>
										</svg>
									</div>
									<p className={style.product__price}>
										Ціна: <span>{good?.price} ₴</span>
									</p>
								</div>
								<p className={style.product__price}>
									Загальна ціна: <span>{Number(good?.price) * quantity} ₴</span>
								</p>
								<div className={style.addToCart__right}>
									<button
										onClick={handleAddToCart}
										className={style.addToCart__button}
									>
										Додати в корзину
									</button>
								</div>
							</div>
						</div>
						<div className={style.delivery}>
							<p className={style.delivery__title}>Доставка і оплата</p>
							<p className={style.delivery__text}>
								Ми пропонуємо зручні та надійні варіанти доставки для кожного
								клієнта. Ви можете обрати кур'єрську доставку по місту, що
								забезпечує отримання замовлення протягом 1-3 робочих днів, або
								доставку через провідні поштові служби, такі як Нова Пошта чи
								Укрпошта, з можливістю отримання у відділенні або за адресою.
								Оплату замовлень можна здійснити кількома способами: онлайн
								через банківську картку, за допомогою сервісів Apple Pay та
								Google Pay, або готівкою при отриманні товару. Ми дбаємо про
								вашу зручність на кожному етапі покупки.
							</p>
						</div>
					</div>
				</div>
				<YouAlsoCanLike />
			</div>
		</div>
	)
}

export default FullProduct
