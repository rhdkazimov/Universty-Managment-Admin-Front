import { HttpClient } from "../HTTPClients";

export class AdminAnnounceService extends HttpClient {
  constructor() {
    // super("https://win8031.site4now.net:8172/msdeploy.axd?site=kazimov11-001-site1");
    super("https://http://kazimov11-001-site1.itempurl.com");
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