import { IUser } from '../types/auth.type'
import { IUserData } from '../types/order.type'
import axios from '../utils/axios'

class AuthService {
	private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/'

	async register(formData: IUser) {
		const { data } = await axios.post<IUser>(
			`${this.BASE_URL}auth/signup`,
			formData
		)
		if (data.token) {
			window.localStorage.setItem('jwt', data.token)
		}
		return data
	}

	async login(formData: IUser) {
		const { data } = await axios.post<IUser>(
			`${this.BASE_URL}auth/login`,
			formData
		)
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

	async logout() {
		try {
			const { data } = await axios.post('auth/logout')
			return data
		} catch (error) {
			console.log(error)
		}
	}

	async updateData(userData: IUserData, userId: string) {
		try {
			const { data } = await axios.put(`/user/${userId}`, userData)
			localStorage.setItem('userDataOrder', JSON.stringify(data))
			return data
		} catch (error) {
			console.log(error)
		}
	}
}

export const authService = new AuthService()
