import { HttpClient } from "../HTTPClients";

export class AdminTypeService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("http://kazimov11-001-site1.itempurl.com");

  }

  async getTypesAll() {
    return await this.get(`api/Type/all`);
  }

  async postNewType(body) {
    return await this.post(`api/Type`, body);
  }

  async deleteTypeById(id) {
    return await this.delete(`api/Type/${id}`);
  }

  async editTypeById(id, body) {
    return await this.put(`api/Type/${id}`, body);
  }
}