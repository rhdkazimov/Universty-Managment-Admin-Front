import { HttpClient } from "../HTTPClients";

export class AdminSpecialtyService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("https://http://kazimov11-001-site1.itempurl.com");
  }

  async getSpecialtyAll() {
    return await this.get(`api/specialty/all`)
  }

  async postNewSpecialty(body){
    return await this.post(`api/specialty`,body)
  }

  async editSpecialtyById(id,body){
    return await this.put(`api/specialty/${id}`,body)
  }

  async deleteSpecialtyById(id){
    return await this.delete(`api/specialty/${id}`)
  }
}