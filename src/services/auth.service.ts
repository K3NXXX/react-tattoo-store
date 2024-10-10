import axios from 'axios'
import { IAuthForm } from '../types/register-form-type'

class AuthService {
	private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/'

	async register(formData: IAuthForm) {
		const { data } = await axios.post<IAuthForm>(
			`${this.BASE_URL}auth/signup`,
			formData
		)
		console.log('register data', data)
		return data
	}

	async login(formData: IAuthForm) {
		const { data } = await axios.post<IAuthForm>(
			`${this.BASE_URL}auth/login`,
			formData
		)
		return data
	}
}

export const authService = new AuthService()
