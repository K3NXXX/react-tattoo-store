export interface IAdmin {
  _id: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface IAdminData {
  userData: {
    _id: string;
    email: string;
  };
}
