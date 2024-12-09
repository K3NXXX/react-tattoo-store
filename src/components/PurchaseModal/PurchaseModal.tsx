import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import modalImage from '../../assets/img/Catalog/modal-image.jpg'
import { setModal } from '../../redux/slices/categorySlice'
import style from './PurchaseModal.module.scss'

const PurchaseModal: React.FC = () => {
	const dispatch = useDispatch()

	return (
		<div className={style.popup_bg}>
			<div className={style.popup}>
				<p className={style.added}>Товар додано в корзину</p>
				<img
					className={style.popup__image}
					src={modalImage}
					alt='tattoo machine'
				/>

				<div className={style.popup__buttons}>
					<Link
						onClick={() => dispatch(setModal(false))}
						to='/react-tattoo-store/cart'
					>
						Оформити замовлення
					</Link>
					<button onClick={() => dispatch(setModal(false))}>
						Продовжити покупки
					</button>
				</div>
				<svg
					onClick={() => dispatch(setModal(false))}
					className={style.close}
					xmlns='http://www.w3.org/2000/svg'
					width='15'
					height='40'
					viewBox='0 0 15 40'
					fill='none'
				>
					<g clipPath='url(#clip0_537_10715)'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M7.5 19.7929L11.0355 16.2573L11.7426 16.9644L8.20711 20.5L11.7426 24.0355L11.0355 24.7426L7.5 21.2071L3.96447 24.7426L3.25736 24.0355L6.79289 20.5L3.25736 16.9644L3.96447 16.2573L7.5 19.7929Z'
							fill='#636B78'
						/>
					</g>
					<defs>
						<clipPath id='clip0_537_10715'>
							<rect width='15' height='40' fill='white' />
						</clipPath>
					</defs>
				</svg>
			</div>
		</div>
	)
}

export default PurchaseModal
