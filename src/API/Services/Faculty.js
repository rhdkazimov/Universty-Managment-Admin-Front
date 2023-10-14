import { HttpClient } from "../HTTPClients";

export class AdminFacultyService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("https://http://kazimov11-001-site1.itempurl.com");
  }

  async getFacultysAll() {
    return await this.get(`api/faculty/all`);
  }

  async postNewFaculty(body) {
    return await this.post(`api/faculty`, body);
  }

  async editFacultyById(id, body) {
    return await this.put(`api/faculty/${id}`, body);
  }

  async deleteFacultyById(id) {
    return await this.delete(`api/faculty/${id}`);
  }
}
