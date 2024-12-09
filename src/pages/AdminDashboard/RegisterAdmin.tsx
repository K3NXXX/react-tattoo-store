import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminService } from '../../services/admin.service'
import { IAdmin } from '../../types/admin.type'
import style from './Admin.module.scss'

const RegisterAdmin: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IAdmin>({ mode: 'onChange' })

	const { mutate } = useMutation({
		mutationKey: ['createAdmin'],
		mutationFn: (data: IAdmin) => adminService.create(data),
		onSuccess: () => {
			toast.success('Адміністратора зареєстровано успішно')
			reset()
		},
	})

	const onSubmitRegisterAdmin = (adminData: IAdmin) => {
		mutate(adminData)
	}

	return (
		<>
			<form
				key='adminForm'
				onSubmit={handleSubmit(onSubmitRegisterAdmin)}
				className={style.form}
			>
				<div className={style.formItem}>
					{errors.email && (
						<span className={style.errorMessage}>{errors.email.message}</span>
					)}
					<input
						className={errors.email ? style.errorInput : ''}
						{...register('email', {
							required: "Пошта є обов'язковою",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Невалідна пошта',
							},
							maxLength: {
								value: 100,
								message: 'Пошта повинна містити максимум 100 символів',
							},
						})}
						placeholder='Ел. пошта'
						type='email'
					/>
				</div>
				<div className={style.formItem}>
					{errors.password && (
						<span className={style.errorMessage}>
							{errors.password.message}
						</span>
					)}
					<input
						className={errors.password ? style.errorInput : ''}
						{...register('password', {
							required: "Пароль є обов'язковим",
							minLength: {
								value: 8,
								message: 'Пароль повинен містити мінімум 8 символів',
							},
							validate: {
								hasLowercase: value =>
									/[a-z]/.test(value) ||
									'Пароль повинен містити принаймні одну малу літеру',
								hasUppercase: value =>
									/[A-Z]/.test(value) ||
									'Пароль повинен містити принаймні одну велику літеру',
								hasNumber: value =>
									/\d/.test(value) ||
									'Пароль повинен містити хоча б одну цифру',
								noSpaces: value =>
									!/\s/.test(value) || 'Пароль не повинен містити пробілів',
							},
						})}
						placeholder='Пароль'
						type='password'
					/>
				</div>
				<button type='submit'>Зареєструвати</button>
			</form>
		</>
	)
}

export default RegisterAdmin
