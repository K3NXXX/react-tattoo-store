import axios from '../utils/axios'

import { CategoryItem } from '../redux/slices/categorySlice'
import { IUser } from '../types/auth.type'
import { IChangeRating, IProduct } from '../types/product.type'

class ProductsService {
	private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/products'
	private FAVORITES_URL =
		'https://tattoo-shop-801cb78430a8.herokuapp.com/user/favorites'

	async create(formData: IProduct) {
		const { data } = await axios.post<IProduct>(`${this.BASE_URL}`, formData)

		return data
	}

	async update(_id: string, formData: IProduct) {
		const { data } = await axios.put<IProduct>(
			`${this.BASE_URL}/${_id}`,
			formData
		)
		return data
	}

	async getAll() {
		const { data } = await axios.get(`${this.BASE_URL}/`)
		return data
	}

	async getOne(_id: string) {
		const { data } = await axios.get<CategoryItem>(`${this.BASE_URL}/${_id}`)
		return data
	}

	// Favorites

	async getFavorites() {
		const { data } = await axios.get(`${this.FAVORITES_URL}`)
		return data
	}

	async addToFavorite(productId: string) {
		const { data } = await axios.post<IUser>(`${this.FAVORITES_URL}/add`, {
			productId,
		})
		return data
	}

	async removeFromFavorite(productId: string) {
		const { data } = await axios.delete<IUser>(
			`${this.FAVORITES_URL}/${productId}`
		)
		return data
	}

	// Rating

	async getRating(productId: string) {
		const { data } = await axios.get(`${this.BASE_URL}/rating/${productId}`)
		return data
	}

	async addOrUpdateRating(changeRatingData: IChangeRating) {
		try {
			const { data } = await axios.post(
				`${this.BASE_URL}/rating/add`,
				changeRatingData
			)

			return data
		} catch (error) {
			console.log('Error during changing rating', error)
			throw new Error('Error during changing rating')
		}
	}

	async makePurchasing(purchaseData: IProduct[]) {
		try {
			const { data } = await axios.post(
				`https://tattoo-shop-801cb78430a8.herokuapp.com/user/orders`,
				{ items: purchaseData }
			)
			return data
		} catch (error) {
			console.log('Error during purchasing: ', error)
			throw new Error('Error during purchasing')
		}
	}

	async getOrdersHistory() {
		try {
			const userData = JSON.parse(localStorage.getItem('userData') ?? '{}')
			if (userData) {
				const { data } = await axios.get(
					`https://tattoo-shop-801cb78430a8.herokuapp.com/user/${userData._id}`
				)
				return data
			}
		} catch (error) {
			console.log('Error during purchasing: ', error)
			throw new Error('Error during purchasing')
		}
	}
}

export const productsService = new ProductsService()
