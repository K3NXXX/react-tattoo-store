import axios from "../utils/axios";
import { IAdmin } from "../types/admin.type";

class AdminService {
  private BASE_URL = "https://tattoo-shop-801cb78430a8.herokuapp.com/";

  async create(formData: IAdmin) {
    const { data } = await axios.post<IAdmin>(
      `${this.BASE_URL}admin/create`,
      formData,
    );

    return data;
  }
}

export const adminService = new AdminService();
