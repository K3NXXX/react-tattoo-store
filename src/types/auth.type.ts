export interface IAuthForm {
  email: string;
  name: string;
  surname: string;
  password: string;
  phone_number: string;
  token: string;
}

export interface IUser {
  token: string;
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}
