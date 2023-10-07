import { HttpClient } from "../HTTPClients";

export class AdminAuthService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async loginUser(body) {
    return await this. post(`api/user/admin/login`, body).then(({ data }) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    });
  }

  async logout() {
    return await this.get("/logout").then(() => {
      localStorage.clear();
    });
  }
}
