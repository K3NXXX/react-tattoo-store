import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoArrowDownCircle, IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setIsAuthFormOpened } from '../../redux/slices/globalSlice'
import { authService } from '../../services/auth.service'
import { IUser } from '../../types/auth.type'
import style from './Header.module.scss'
import { RegisterErrors } from './RegisterErrors'
import { useNavigate } from 'react-router-dom'

const AuthForm: React.FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [activeAuthWay, setActiveAuthWay] = useState('register')
	const [authWay, setAuthWay] = useState('register')
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUser>({ reValidateMode: 'onSubmit' })

	const { mutate: registerMutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IUser) => authService.register(data),
		onSuccess(data) {
			toast.success('Реєстрація пройшла успішно')
			dispatch(setIsAuthFormOpened(false))
			localStorage.setItem('userData', JSON.stringify(data))
			navigate('/react-tattoo-store/account')
			reset()
		},
		onError(error: any) {
			toast.error(error.response.data.error)
		},
	})

	const { mutate: loginMutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IUser) => authService.login(data),
		onSuccess(data) {
			toast.success('Авторизація пройшла успішно')
			dispatch(setIsAuthFormOpened(false))
			localStorage.setItem('userData', JSON.stringify(data))
			navigate('/react-tattoo-store/account')
			reset()
		},
		onError(error: any) {
			const errorMessage = error?.response?.data?.error || 'Сталася помилка'
			toast.error(errorMessage)
		},
	})

	const onSubmit = (data: IUser) => {
		if (authWay === 'register') {
			registerMutate(data)
		} else if (authWay === 'login') {
			loginMutate(data)
		}
	}

	const handleClickAuthWay = (type: string): void => {
		setAuthWay(type)
		setActiveAuthWay(type)
		reset()
	}

	return (
		<div className={style.popup_bg}>
			<div className={style.popup}>
				<IoCloseOutline
					size={30}
					className={style.close}
					onClick={() => dispatch(setIsAuthFormOpened(false))}
				/>
				<div className={style.choose}>
					<span
						className={
							activeAuthWay === 'register' ? style.active : style.authWay
						}
						onClick={() => handleClickAuthWay('register')}
					>
						Реєстрація
					</span>
					<IoArrowDownCircle color='#BB8C5F' size={30} />
					<span
						className={activeAuthWay === 'login' ? style.active : style.authWay}
						onClick={() => handleClickAuthWay('login')}
					>
						Авторизація
					</span>
				</div>
				{authWay === 'register' ? (
					<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
						<div className={style.popupForm_wrapper}>
							<input
								{...register('name', {
									required: true,
									minLength: {
										value: 3,
										message: "Ім'я повинно містити мінімум 3 символи",
									},
									maxLength: {
										value: 50,
										message: "Ім'я повинно містити максимум 50 символів",
									},
									pattern: {
										value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/,
										message: 'Тільки літери можуть бути в імені',
									},
								})}
								placeholder="Ім'я"
								type='text'
							/>

							<input
								{...register('surname', {
									required: true,
									minLength: {
										value: 3,
										message: 'Прізвище повинно містити мінімум 3 символи',
									},
									maxLength: {
										value: 50,
										message: 'Прізвище повинно містити максимум 50 символів',
									},
									pattern: {
										value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/,
										message: 'Тільки літери можуть бути в прізвищі',
									},
								})}
								placeholder='Прізвище'
								type='text'
							/>

							<input
								{...register('password', {
									required: true,
									minLength: {
										value: 8,
										message: 'Пароль повинен містити мінімум 8 символів',
									},
									pattern: {
										value: /\d/,
										message: 'Пароль повинен містити мінімум 1 цифру',
									},
								})}
								placeholder='Пароль'
								type='password'
							/>

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
								placeholder='Email'
								type='text'
							/>

							<input
								{...register('phone_number', {
									required: true,
									pattern: {
										value:
											/\(?(\s*[0-9]{3}\s*)\)?([ .-]?)(\s*[0-9]{3}\s*)\2(\s*[0-9]{4}\s*)/,
										message: 'Номер телефону вказаний неправильно',
									},
								})}
								placeholder='Номер телефону'
								type='text'
							/>
						</div>
						<button>Зареєструватися</button>
					</form>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
						<div className={style.popupForm_wrapper}>
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
								placeholder='Email'
								type='text'
							/>
							<input
								{...register('password', {
									required: true,
									minLength: {
										value: 8,
										message: 'Пароль повинен містити мінімум 8 символів',
									},
									pattern: {
										value: /\d/,
										message: 'Пароль повинен містити мінімум 1 цифру',
									},
								})}
								placeholder='Пароль'
								type='password'
							/>
						</div>
						<button>Ввійти</button>
					</form>
				)}

				<RegisterErrors errors={errors} />
			</div>
		</div>
	)
}

export default AuthForm
