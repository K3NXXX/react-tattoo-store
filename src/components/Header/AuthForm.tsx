import { useForm } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { setIsAuthFormOpened } from '../../redux/slices/globalSlice'
import { IRegisterForm } from '../../types/register-form-type'
import style from './Header.module.scss'
import { RegisterErrors } from './RegisterErrors'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/auth.service'
import { toast } from 'react-toastify'

const AuthForm: React.FC = () => {
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IRegisterForm>({ reValidateMode: 'onSubmit' })

    const {mutate} = useMutation({
        mutationKey: ["register"],
        mutationFn: (data: IRegisterForm)  => authService.register(data),
        onSuccess() {
            toast.success("Реєстрація пройшла успішно")
            setIsAuthFormOpened(false)
            reset()
            
        }
        
    })

	const onSubmit = (data: IRegisterForm) => {
        mutate(data)
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
					<span>Реєстрація</span>
				</div>
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
                                    message:
                                        "Ім'я повинно містити максимум 50 символів",
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/,
                                    message:
                                        'Тільки літери можуть бути в імені',
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
                                    message: "Прізвище повинно містити мінімум 3 символи",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "Прізвище повинно містити максимум 50 символів",
                                },
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/,
                                    message:
                                        'Тільки літери можуть бути в прізвищі',
                                },
                            })}
							placeholder='Прізвище'
							type='text'
						/>

						<input
						    {...register('password', {
                                required: true,
                                minLength: {
                                    value: 10,
                                    message:
                                        'Пароль повинен містити мінімум 10 символів',
                                },
                                pattern: {
                                    value: /\d/,
                                    message:
                                        'Пароль повинен містити мінімум 1 цифру',
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
				<RegisterErrors errors={errors} />
			</div>
		</div>
	)
}

export default AuthForm
