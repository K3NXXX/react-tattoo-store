export interface IUser {
  token: string;
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  password: string;
  role: string;
  cart: [];
  orders: [];
  favorites: string[];
}
