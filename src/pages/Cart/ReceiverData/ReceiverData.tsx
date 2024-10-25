import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccessData } from '../../../redux/slices/cartSlice'
import { RootState } from '../../../redux/store'
import { IUser } from '../../../types/auth.type'
import style from './ReceiverData.module.scss'

interface ReceiverDataProps {
	isAccount: boolean
}

const ReceiverData: React.FC<ReceiverDataProps> = ({ isAccount }) => {
	const dispatch = useDispatch()
	const [isEmpty, setIsEmpty] = useState<boolean>(true)
	const { items } = useSelector((state: RootState) => state.cartSlice)
	const userData: IUser = JSON.parse(localStorage.getItem('userData') ?? '{}')
	const [isEditUserData, setIsEditUserData] = useState(true)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: 'onChange' })

	const onSubmit = (data: any): void => {
		dispatch(setSuccessData(true))
		reset()
		console.log("dataaa", data)
	}

	useEffect(() => {
		if (items.length < 1) {
			setIsEmpty(true)
		} else {
			setIsEmpty(false)
		}
	}, [items])

	return (
		<div className={style.usersData__form}>
			<div className={style.form__top}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={style.receiver__info}
				>
					<p>01. Інформація про отримувача</p>
					{isAccount ? (
						<div className={style.editButtons__wrapper}>
							{isEditUserData === false && (
								<button
									onClick={() => setIsEditUserData(true)}
									className={style.receiver__info_btn}
								>
									Відмінити
								</button>
							)}
							<button
								onClick={() => setIsEditUserData(false)}
								className={style.receiver__info_btn}
							>
								{isEditUserData ? 'Редагувати' : 'Оновити дані'}
							</button>
						</div>
					) : (
						''
					)}
				</form>
				<div className={style.top__row}>
					<div className={style.column}>
						<label>Прізвище та ім'я</label>
						<input
							{...register('name', {
								required: `Ім'я та прізвище вказано неправильно`,
							})}
							type='text'
							placeholder='Іванов Іван'
							defaultValue={userData.surname + ' ' + userData.name}
							disabled={isEditUserData}
						/>
					</div>
					<div className={style.column}>
						<label>Телефон</label>
						<input
							{...register('phone', {
								required: `Номер телефону вказаний неправильно`,
								pattern: {
									value:
										/\(?(\s*[0-9]{3}\s*)\)?([ .-]?)(\s*[0-9]{3}\s*)\2(\s*[0-9]{4}\s*)/,
									message: 'Номер телефону вказаний неправильно',
								},
							})}
							type='text'
							placeholder='+380555353535'
							defaultValue={userData.phone_number}
							disabled={isEditUserData}
						/>
					</div>
					<div className={style.column}>
						<label>Ел. пошта</label>
						<input
							{...register('email', {
								required: `Ел. пошта вказана неправильно`,
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\s*$/,
									message: 'Введіть правильний email',
								},
							})}
							type='text'
							placeholder='Ivanov2021@gmail.com'
							defaultValue={userData.email}
							disabled={isEditUserData}
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
								type='text'
								placeholder='Львів'
								disabled={isEditUserData}
							/>
						</div>
						<div className={style.column}>
							<label>Вулиця, дім</label>
							<input
								type='text'
								placeholder='вул. Львівська, 13'
								disabled={isEditUserData}
							/>
						</div>
					</div>
					<div className={style.flat}>
						<div className={style.column}>
							<label>Квартира / офіс</label>
							<input type='text' placeholder='324' disabled={isEditUserData} />
						</div>
						<div className={style.column}>
							<label>Під'їзд</label>
							<input type='text' placeholder='5' disabled={isEditUserData} />
						</div>
						<div className={style.column}>
							<label>Поверх</label>
							<input type='text' placeholder='7' disabled={isEditUserData} />
						</div>
						<div className={style.column}>
							<label>Домофон</label>
							<input type='text' placeholder='6470' disabled={isEditUserData} />
						</div>
					</div>
				</div>
			</div>
			{(errors.name ||
				errors.phone ||
				errors.email ||
				errors.city ||
				errors.flat) && <div>Дані вказано не всі або некоректно</div>}
			<div className={style.empty__error}>
				{isEmpty ? 'Додайте товар, щоб оформити замовлення' : ''}
			</div>
			{isAccount ? '' : <button disabled={isEmpty}>Оформити замовлення</button>}
		</div>
	)
}

export default ReceiverData
