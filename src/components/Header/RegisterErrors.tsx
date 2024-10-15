import { FieldErrors } from 'react-hook-form'
import { toast } from 'react-toastify'
import { IAuthForm } from '../../types/auth.type'
import styles from './Header.module.scss'

interface RegisterErrorsProps {
	errors: FieldErrors<IAuthForm>
}

export function RegisterErrors({ errors }: RegisterErrorsProps) {
	return (
		<div className={styles.errors}>
			{errors.password?.message &&
				toast.error(errors.password.message, {
					toastId: '',
				})}
			{errors.name?.message &&
				toast.error(errors.name.message, {
					toastId: '',
				})}
			{errors.surname?.message &&
				toast.error(errors.surname.message, {
					toastId: '',
				})}
			{errors.email?.message &&
				toast.error(errors.email.message, {
					toastId: '',
				})}
			{errors.phone_number?.message &&
				toast.error(errors.phone_number.message, {
					toastId: '',
				})}
		</div>
	)
}
