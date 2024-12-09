import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminService } from '../../services/admin.service'
import { IAdmin, IAdminData } from '../../types/admin.type'
import style from './Admin.module.scss'

const InfoPanel: React.FC<IAdminData> = ({ userData }) => {
	const [isEditingEmail, setIsEditingEmail] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [email, setEmail] = useState(userData.email)
	const [originalEmail, setOriginalEmail] = useState(userData.email)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAdmin>({
		mode: 'onChange',
	})

	const { mutate, data } = useMutation({
		mutationKey: ['updateAdmin'],
		mutationFn: (data: IAdmin) => adminService.update(userData._id, data),
		onSuccess: data => {
			toast.success('Адміністратора оновлено успішно')
			localStorage.setItem(
				'userData',
				JSON.stringify({ ...userData, email: data.email })
			)
			setEmail(data.email)
			setOriginalEmail(data.email)
			setIsSaving(false)
			setIsEditingEmail(false)
		},
		onError: (error: any) => {
			toast.error(error.response.data.error)
			setIsSaving(false)
		},
	})

	useEffect(() => {
		if (data && data.email) {
			setEmail(data.email)
			setOriginalEmail(data.email)
		}
	}, [data])

	const onSubmit = handleSubmit((data: IAdmin) => {
		setIsSaving(true)
		mutate({ ...data, _id: userData._id })
	})

	const handleEmailEdit = () => {
		setIsEditingEmail(true)
	}

	const handleEmailEditClose = () => {
		setIsEditingEmail(false)
	}

	const handleEmailSave = () => {
		onSubmit()
	}

	const handleLogout = () => {
		localStorage.removeItem('jwt')
		localStorage.removeItem('userData')
		navigate('/react-tattoo-store')
		window.location.reload()
	}

	const hasChanges = email !== originalEmail

	return (
		<div className={style.userInfo}>
			<div className={style.column}>
				<div className={style.online}>
					<div className={style.contacts}>
						{isEditingEmail ? (
							<div className={style.editData}>
								<div className={style.editEmail}>
									{errors.email && (
										<p className={style.errorMessage}>{errors.email.message}</p>
									)}

									<input
										className={errors.email ? style.errorInput : ''}
										{...register('email', {
											required: "Пошта є обов'язковою",
											pattern: {
												value:
													/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
												message: 'Невалідна пошта',
											},
											maxLength: {
												value: 100,
												message: 'Пошта повинна містити максимум 100 символів',
											},
										})}
										placeholder='Ел. пошта'
										type='text'
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<button
									onClick={hasChanges ? handleEmailSave : handleEmailEditClose}
									className={style.exit}
									disabled={isSaving}
								>
									{isSaving
										? 'Зберігається...'
										: hasChanges
										? 'Зберегти'
										: 'Скасувати'}
								</button>
							</div>
						) : (
							<>
								<div className={style.contactsData}>
									<button
										onClick={handleEmailEdit}
										className={style.editButton}
									>
										Змінити
									</button>
									<p>{email}</p>
								</div>
								<button onClick={handleLogout} className={style.exit}>
									Вийти
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoPanel
