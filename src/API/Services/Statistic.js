import { HttpClient } from "../HTTPClients";

export class AdminStatisticService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("http://kazimov11-001-site1.itempurl.com");

  }

  async getUsersCount() {
    return await this.get(`api/statistic/user`);
  }
}
