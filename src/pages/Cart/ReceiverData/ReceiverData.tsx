import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	setRemoveCartData,
	setSuccessData,
} from '../../../redux/slices/cartSlice'
import { RootState } from '../../../redux/store'
import { productsService } from '../../../services/products.service'
import { IUser } from '../../../types/auth.type'
import { IOrderData } from '../../../types/order.type'
import { IProduct } from '../../../types/product.type'
import style from './ReceiverData.module.scss'

interface ReceiverDataProps {
	isAccount: boolean
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ isAccount }) => {
	const dispatch = useDispatch()
	const [isEmpty, setIsEmpty] = useState<boolean>(true)
	const { items } = useSelector((state: RootState) => state.cartSlice)
	const cartItems = JSON.parse(localStorage.getItem('cartItems') ?? '{}')

	const userData: IUser = JSON.parse(localStorage.getItem('userData') ?? '{}')
	const addressData = JSON.parse(localStorage.getItem('addressData') ?? '{}')

	const [name, setName] = useState(userData.surname + ' ' + userData.name || '')
	const [phone, setPhone] = useState(userData.phone_number || '')
	const [email, setEmail] = useState(userData.email || '')

	const [city, setCity] = useState(addressData.city || '')
	const [street, setStreet] = useState(addressData.street || '')
	const [flat, setFlat] = useState(addressData.flat || '')
	const [entrance, setEntrance] = useState(addressData.entrance || '')
	const [floor, setFloor] = useState(addressData.floor || '')
	const [house, setHouse] = useState(addressData.house || '')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<IOrderData>({ mode: 'onChange' })

	const flatWatched = watch('flat', flat)
	const houseWatched = watch('house', house)

	const onSubmit = (): void => {
		dispatch(setSuccessData(true))
		mutate(cartItems)
		reset()
	}

	const { mutate } = useMutation({
		mutationKey: ['purchasing'],
		mutationFn: (data: IProduct[]) => productsService.makePurchasing(data),
		onSuccess: () => {
			toast.success('Замовлення успішно оформлене')
			dispatch(setRemoveCartData())
		},
		onError: () => {
			toast.error('Сталася помилка при оформленні замовленні. Спробуйте знову')
		},
	})

	useEffect(() => {
		setIsEmpty(items.length < 1)
	}, [items])

	useEffect(() => {
		localStorage.setItem(
			'userData',
			JSON.stringify({
				surname: name.split(' ')[0],
				name: name.split(' ')[1] || '',
				_id: userData?._id || '',
				phone_number: phone,
				favorites: userData?.favorites || [],
				email,
			})
		)
	}, [name, phone, email, userData?.favorites, userData?._id])

	useEffect(() => {
		localStorage.setItem(
			'addressData',
			JSON.stringify({ city, street, flat, entrance, floor, house })
		)
	}, [city, street, flat, entrance, floor, house])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.usersData__form}>
			<div className={style.form__top}>
				<p>01. Інформація про отримувача</p>
				<div className={style.top__row}>
					<div className={style.column}>
						<label>Прізвище та ім'я</label>
						<input
							{...register('name', {
								required: "Будь ласка, введіть ім'я та прізвище",
								pattern: {
									value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s-]+$/,
									message: "Введіть правильне ім'я та прізвище",
								},
							})}
							type='text'
							placeholder='Іванов Іван'
							defaultValue={name}
							onChange={e => setName(e.target.value)}
						/>
						{errors.name && (
							<span className={style.error}>{errors.name.message}</span>
						)}
					</div>
					<div className={style.column}>
						<label>Телефон</label>
						<input
							{...register('phone', {
								required: 'Введіть номер телефону',
								pattern: {
									value: /^\+380\d{9}$/,
									message: 'Введіть коректн. номер',
								},
							})}
							type='text'
							placeholder='+380555353535'
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
						{errors.phone && (
							<span className={style.error}>{errors.phone.message}</span>
						)}
					</div>
					<div className={style.column}>
						<label>Ел. пошта</label>
						<input
							{...register('email', {
								required: 'Введіть email',
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
									message: 'Введіть коректний email',
								},
							})}
							type='text'
							placeholder='Ivanov2021@gmail.com'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						{errors.email && (
							<span className={style.error}>{errors.email.message}</span>
						)}
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
								{...register('city', {
									required: 'Введіть місто',
									minLength: {
										value: 2,
										message: 'Місто повинно містити щонайменше 2 символи',
									},
								})}
								type='text'
								placeholder='Львів'
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
							{errors.city && (
								<span className={style.error}>{errors.city.message}</span>
							)}
						</div>
						<div className={style.column}>
							<label>Вулиця</label>
							<input
								{...register('street', {
									required: 'Введіть вулицю',
									minLength: {
										value: 2,
										message: 'Вулиця повинна містити щонайменше 2 символи',
									},
								})}
								type='text'
								placeholder='Львівська'
								value={street}
								onChange={e => setStreet(e.target.value)}
							/>
							{errors.street && (
								<span className={style.error}>{errors.street.message}</span>
							)}
						</div>
					</div>
					<div className={style.flat}>
						<div className={style.column}>
							<label>Квартира / офіс</label>
							<input
								{...register('flat', {
									required: !houseWatched
										? 'Введіть квартиру або будинок'
										: undefined,
								})}
								type='text'
								placeholder='324'
								value={flat}
								onChange={e => setFlat(e.target.value)}
							/>
							{errors.flat && (
								<span className={style.error}>{errors.flat.message}</span>
							)}
						</div>
						<div className={style.column}>
							<label>Під'їзд</label>
							<input
								type='text'
								placeholder='5'
								value={entrance}
								onChange={e => setEntrance(e.target.value)}
							/>
						</div>
						<div className={style.column}>
							<label>Поверх</label>
							<input
								type='text'
								placeholder='7'
								value={floor}
								onChange={e => setFloor(e.target.value)}
							/>
						</div>
						<div className={style.column}>
							<label>Дім</label>
							<input
								{...register('house', {
									required: !flatWatched
										? 'Введіть квартиру або будинок'
										: undefined,
								})}
								type='text'
								placeholder='324'
								value={house}
								onChange={e => setHouse(e.target.value)}
							/>
							{errors.flat && (
								<span className={style.error}>{errors.flat.message}</span>
							)}
						</div>
					</div>
				</div>
			</div>
			{(errors.name ||
				errors.phone ||
				errors.email ||
				errors.city ||
				errors.street) && <div>Дані вказано не всі або некоректно</div>}
			{isAccount ? (
				''
			) : (
				<div className={style.empty__error}>
					{isEmpty ? 'Додайте товар, щоб оформити замовлення' : ''}
				</div>
			)}

			{isAccount ? '' : <button disabled={isEmpty}>Оформити замовлення</button>}
		</form>
	)
}

export default ReceiverData
