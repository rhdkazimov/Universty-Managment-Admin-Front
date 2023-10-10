import { HttpClient } from "../HTTPClients";

export class AdminStatisticService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getUsersCount() {
    return await this.get(`api/statistic/user`);
  }
}
