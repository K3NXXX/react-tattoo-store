import axios from '../utils/axios'
import {IProduct} from "../types/product.type";

class ProductsService {
  private BASE_URL = 'https://tattoo-shop-801cb78430a8.herokuapp.com/'

  async create(formData: IProduct) {
    const { data } = await axios.post<IProduct>(
      `${this.BASE_URL}products`,
      formData
    )

    return data
  }
}

export const productsService = new ProductsService()
