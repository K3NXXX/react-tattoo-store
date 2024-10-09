import axios from 'axios'
import { IRegisterForm } from '../types/register-form-type'

class AuthService {
	private BASE_URL = "https://tattoo-shop-801cb78430a8.herokuapp.com/";
  
	async register(data: IRegisterForm) {
	  const response = await axios.post<IRegisterForm[]>(`${this.BASE_URL}auth/signup`, data);
	  return response;
	}
  

  }
  
  export const authService = new AuthService();