import { HttpClient } from "../HTTPClients";

export class AdminAuthService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("https://http://kazimov11-001-site1.itempurl.com");
  }

  async loginUser(body) {
    return await this.post(`api/user/admin/login`, body).then(({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    });
  }

  async createAdmin(body) {
    return await this.post(`api/user/admin/register`, body);
  }

  async logout() {
    return await this.post("api/user/logout").then(() => {
      localStorage.clear();
    });
  }
}
