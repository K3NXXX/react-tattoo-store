import axios from "../utils/axios";

import { CategoryItem } from "../redux/slices/categorySlice";
import { IProduct } from "../types/product.type";
import { IUser } from "../types/auth.type";

class ProductsService {
  private BASE_URL = "https://tattoo-shop-801cb78430a8.herokuapp.com";
  private FAVORITES_URL =
    "https://tattoo-shop-801cb78430a8.herokuapp.com/user/favorites";

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
    const { data } = await axios.get(`${this.BASE_URL}/products`);
    return data;
  }

  async getOne(_id: string) {
    const { data } = await axios.get<CategoryItem>(
      `${this.BASE_URL}/products/${_id}`,
    );
    return data;
  }

  // Favorites

  async getFavorites() {
    const { data } = await axios.get(`${this.FAVORITES_URL}`);
    return data;
  }

  async addToFavorite(productId: string) {
    const { data } = await axios.post<IUser>(`${this.FAVORITES_URL}/add`, {
      productId,
    });
    return data;
  }

  async removeFromFavorite(productId: string) {
    const { data } = await axios.delete<IUser>(
      `${this.FAVORITES_URL}/${productId}`,
    );
    return data;
  }

  // Rating

  async getRating(productId: string) {
    const { data } = await axios.get(
      `${this.BASE_URL}/products/rating/${productId}`,
    );
    return data;
  }

  async addOrUpdateRating(productId: string, userId: string, rating: number) {
    const { data } = await axios.post(`${this.BASE_URL}/products/rating/add`, {
      productId,
      userId,
      rating,
    });

    return data;
  }

  async addToCart(productId: string, quantity: number) {
    const { data } = await axios.post(`${this.BASE_URL}/user/cart/add`, {
      productId,
      quantity,
    });

    return data;
  }

  async removeFromCart(productId: string) {
    const { data } = await axios.delete(
      `${this.BASE_URL}/user/cart/${productId}`,
    );

    return data;
  }
}

export const productsService = new ProductsService();
