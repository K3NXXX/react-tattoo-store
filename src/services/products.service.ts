import { CategoryItem } from '../redux/slices/categorySlice'
import { IAuthForm } from '../types/auth.type'
import axios from '../utils/axios'

class ProductsService {
	private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/'

	async getAll() {
		const { data } = await axios.get<CategoryItem[]>(`${this.BASE_URL}products`)
		return data
	}

	async getOne(id: string) {
		const { data } = await axios.get<CategoryItem>(`${this.BASE_URL}products/${id}`)
		console.log("data", data)
		return data
	}
}

export const productsService = new ProductsService()
