import { IAuthForm, IUser } from '../types/auth.type'
import axios from '../utils/axios'

class AuthService {
	private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/'

	async register(formData: IAuthForm) {
		const { data } = await axios.post<IAuthForm>(
			`${this.BASE_URL}auth/signup`,
			formData
		)
		if (data.token) {
			window.localStorage.setItem('jwt', data.token)
		}
		return data
	}

	async login(formData: IAuthForm) {
		const { data } = await axios.post<IAuthForm>(
			`${this.BASE_URL}auth/login`,
			formData
		)
		console.log('logindata', data)
		if (data.token) {
			window.localStorage.setItem('jwt', data.token)
		}
		return data
	}

	async getMe() {
		try {
			const { data } = await axios.get(`auth/me`)
			return data
		} catch (error) {
			console.error('Error fetching user data:', error)
			throw error
		}
	}

	// async updateData(data: IUser) {
	// 	try {
	// 		const {data} = await axios.post()
	// 	} catch (error) {
	// 		console.log(error);
			
	// 	}
	// }
}

export const authService = new AuthService()
