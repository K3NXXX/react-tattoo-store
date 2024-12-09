import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { authService } from '../../../../services/auth.service'
import { IUser } from '../../../../types/auth.type'
import { IUserData } from '../../../../types/order.type'
import style from '../ReceiverData.module.scss'

interface IUserDataFormProps {
	isAccount: boolean
}
const UserDataForm: React.FC<IUserDataFormProps> = ({ isAccount }) => {
	const [isEditUserData, setIsEditUserData] = useState(true)
	const userData: IUser = JSON.parse(localStorage.getItem('userData') ?? '{}')
	const userDataOrder: IUser = JSON.parse(
		localStorage.getItem('userDataOrder') ?? '{}'
	)
	const fullUserName = userData.surname + ' ' + userData.name
	const fullUserNameOrder = userDataOrder.surname + ' ' + userDataOrder.name

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUserData>({ mode: 'onChange' })

	const { mutate } = useMutation({
		mutationKey: ['orderUserData'],
		mutationFn: (data: IUserData) => authService.updateData(data, userData._id),
		onSuccess() {
			toast.success('Дані змінені успішно')
		},
		onError() {
			toast.error('Сталася помилка при зміні даних')
		},
	})

	const onSubmit = (data: IUserData) => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.receiver__info}>
			<div>
				<div className={style.userDataForm__top}>
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
								type={!isEditUserData ? 'submit' : 'button'}
							>
								{isEditUserData ? 'Редагувати' : 'Оновити дані'}
							</button>
						</div>
					) : (
						''
					)}
				</div>

				<div className={style.top__row}>
					<div className={style.column}>
						<label>Прізвище та ім'я</label>
						<input
							{...register('name', {
								required: `Не всі дані вказані`,
							})}
							type='text'
							placeholder='Іванов Іван'
							defaultValue={userDataOrder ? fullUserNameOrder : fullUserName}
							disabled={isEditUserData}
						/>
					</div>
					<div className={style.column}>
						<label>Телефон</label>
						<input
							{...register('phone_number', {
								required: true,
								pattern: {
									value:
										/\(?(\s*[0-9]{3}\s*)\)?([ .-]?)(\s*[0-9]{3}\s*)\2(\s*[0-9]{4}\s*)/,
									message: 'Номер телефону вказаний неправильно',
								},
							})}
							type='text'
							placeholder='+380555353535'
							defaultValue={
								userDataOrder
									? userDataOrder.phone_number
									: userData.phone_number
							}
							disabled={isEditUserData}
						/>
					</div>
					<div className={style.column}>
						<label>Ел. пошта</label>
						<input
							{...register('email', {
								required: true,
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Невірна пошта',
								},
								maxLength: {
									value: 100,
									message: 'Пошта повинна містити максимум 100 символів',
								},
							})}
							type='text'
							placeholder='Ivanov2021@gmail.com'
							defaultValue={
								userDataOrder ? userDataOrder.email : userData.email
							}
							disabled={isEditUserData}
						/>
					</div>
				</div>
			</div>
		</form>
	)
}
export default UserDataForm
