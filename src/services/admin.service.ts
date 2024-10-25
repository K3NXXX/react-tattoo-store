import axios from "../utils/axios";
import { IAdmin } from "../types/admin.type";

class AdminService {
  private BASE_URL =
    "https://tattoo-shop-801cb78430a8.herokuapp.com/admin-dashboard";

  async create(formData: IAdmin) {
    const { data } = await axios.post<IAdmin>(
      `${this.BASE_URL}/create`,
      formData,
    );

    return data;
  }

  async update(_id: string, formData: IAdmin) {
    const { data } = await axios.put<IAdmin>(
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

export const adminService = new AdminService();
