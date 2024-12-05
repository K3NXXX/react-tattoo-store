import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import deleteGood from '../../../assets/img/Cart/cross.svg'
import { setBinCount } from '../../../redux/slices/categorySlice'
import { productsService } from '../../../services/products.service'
import { CartItemType } from '../CartGoods/CartGoods'
import style from './CartItem.module.scss'
import { RootState } from '../../../redux/store'
import { addItems, minusItems, removeItems } from '../../../redux/slices/cartSlice'

type CartItemProps = {
	item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()
	const [quantity, setQuantity] = useState(item.quantity)

	const binCount = useSelector(
		(state: RootState) => state.categorySlice.binCount,
	  );

	const { mutate: removeItem } = useMutation({
		mutationFn: (itemId: string) => productsService.removeFromCart(itemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cartGoods'] })
			
		},
		onError: error => {
			console.error('Failed to remove item from cart:', error)
		},
	})

	const onClickPlusItem = async () => {
		setQuantity(quantity + 1)
		dispatch(setBinCount(binCount + 1));
		dispatch(addItems({ id: String(item.id), count: 1 }));
	}

	const onClickMinusItem = (): void => {
		setQuantity(quantity - 1)
		dispatch(minusItems(item.product._id))
	  }

	const onClickRemoveItem = async (itemId: string) => {
		removeItem(itemId)
		removeItems(item.product._id)
		
	}

	return (
		<>
			<div className={style.good}>
				<div>
					<img className={style.goodImg} src={item.product.image} alt='good' />
				</div>
				<p className={style.name}>{item.product.name}</p>
				<p className={style.price}>{item.product.price}₴</p>
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
				<span className={style.goodTotalPrice}>
					{item.product.price * quantity}₴
				</span>
				<div>
					<img
						onClick={() => onClickRemoveItem(item.product._id)}
						className={style.deleteGood}
						src={deleteGood}
						alt='deleteGood'
					/>
				</div>
			</div>
			<div className={style.good__phone}>
				<div className={style.good__phone_top}>
					<div>
						<img
							className={style.goodImg}
							src={item.product.image}
							alt='good'
						/>
					</div>
					<div className={style.nameAndPrice}>
						<p className={style.name}>{item.product.name}</p>
						<p className={style.price}>{item.product.price}₴</p>
					</div>
					<div>
						<img
							onClick={() => onClickRemoveItem(item.product._id)}
							className={style.deleteGood}
							src={deleteGood}
							alt='deleteGood'
						/>
					</div>
				</div>
				<div className={style.good__phone_bottom}>
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
					<span className={style.goodTotalPrice}>
						{item.product.price * item.quantity}₴
					</span>
				</div>
			</div>
		</>
	)
}

export default CartItem
