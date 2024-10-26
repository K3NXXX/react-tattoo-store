import { CircularProgress, Rating } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productImage from '../../assets/img/2.png'
import { productsService } from '../../services/products.service'
import style from './FullProduct.module.scss'
import { useEffect } from 'react'

const FullProduct: React.FC = () => {
	const { id } = useParams()

	const { data: good, isLoading } = useQuery({
		queryKey: ['getProduct'],
		queryFn: () => productsService.getOne(id as string),
	})
	if (isLoading) {
		<CircularProgress />
	}

	useEffect(() => {
		window.scrollTo(0, 0)

	}, [])
	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<div className={style.left}>
					<div className={style.img__wrapper}>
						<img src={good?.image} alt='product' />
					</div>
					<div className={style.description}>
						<p className={style.description__title}>Опис</p>
						<p className={style.description__text}>
							{good?.description}
						</p>
					</div>
				</div>
				<div className={style.right}>
					<p className={style.product__title}>
						{good?.name}
					</p>
					<Rating className={style.product_rating} value={good?.rating} />
					<p className={style.product__price}>{good?.price} ₴</p>
					<div className={style.addToCart}>
						<div className={style.addToCart__left}>
							<div className={style.quantity}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='15'
									height='40'
									viewBox='0 0 15 40'
									fill='none'
								>
									<path d='M2 21H13V20H2V21Z' fill='#3E424B' />
								</svg>
								<span className={style.count__number}>{1}</span>
								<svg
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
						</div>
						<div className={style.addToCart__right}>
							<button className={style.addToCart__button}>
								Додати в корзину
							</button>
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
							Оплату замовлень можна здійснити кількома способами: онлайн через
							банківську картку, за допомогою сервісів Apple Pay та Google Pay,
							або готівкою при отриманні товару. Ми дбаємо про вашу зручність на
							кожному етапі покупки.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FullProduct