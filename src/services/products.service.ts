import axios from "../utils/axios";
import { IProduct } from "../types/product.type";

class ProductsService {
  private BASE_URL = "https://tattoo-shop-801cb78430a8.herokuapp.com/products";

  async create(formData: IProduct) {
    const { data } = await axios.post<IProduct>(`${this.BASE_URL}`, formData);

    return data;
  }

  async update(_id: string, formData: IProduct) {
    const { data } = await axios.put<IProduct>(
      `${this.BASE_URL}/${_id}`,
      formData,
    );
    return data;
  }

  async getAll() {
    const { data } = await axios.get(`${this.BASE_URL}/`);

    return data;
  }
}

export const productsService = new ProductsService();
