import { HttpClient } from "../HTTPClients";

export class AdminAnnounceService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getAnnouncesAll() {
    return await this.get(`api/Announce/all`)
  }

  async postNewAnnounce(body) {
    return await this.post(`api/Announce`,body)
  }

  async deleteAnnounceById(id){
    return await this.delete(`api/Announce/${id}`)
  }
}