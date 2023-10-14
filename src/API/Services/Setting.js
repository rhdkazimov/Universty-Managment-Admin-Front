import { HttpClient } from "../HTTPClients";

export class AdminSettingService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("https://http://kazimov11-001-site1.itempurl.com");
  }

  async getSettingsAll() {
    return await this.get(`api/Settings/all`);
  }

  async postNewSetting(body) {
    return await this.post(`api/Settings`, body);
  }

  async deleteSettingById(id) {
    return await this.delete(`api/Settings/${id}`);
  }

  async editSettingById(id, body) {
    return await this.put(`api/Settings/${id}`, body);
  }
}