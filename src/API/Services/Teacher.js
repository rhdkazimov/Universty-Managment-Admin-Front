import { HttpClient } from "../HTTPClients";

export class AdminTeacherService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getAllTeacher() {
    return await this.get(`api/teacher/all`);
  }

  async postNewTeacher(body) {
    return await this.post(`api/teacher`, body);
  }

  async deleteTeacherById(id) {
    return await this.delete(`api/teacher/${id}`);
  }

}