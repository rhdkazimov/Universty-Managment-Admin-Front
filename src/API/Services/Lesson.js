import { HttpClient } from "../HTTPClients";

export class AdminLessonService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("http://kazimov11-001-site1.itempurl.com");

  }

  async getLessonsAll() {
    return await this.get(`api/lesson/all`)
  }

  async postNewLesson(body) {
    return await this.post(`api/lesson`,body)
  }

  async deleteLessonById(id){
    return await this.delete(`api/lesson/${id}`)
  }

  async editLessonById(id,body){
    return await this.put(`api/lesson/${id}`,body)
  }
}