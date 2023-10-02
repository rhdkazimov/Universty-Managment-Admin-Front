import { HttpClient } from "../HTTPClients";

export class AdminSpecialtyService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getSpecialtyAll() {
    return await this.get(`api/specialty/all`)
  }

  async deleteSpecialtyById(id){
    return await this.delete(`api/specialty/${id}`)
  }
}