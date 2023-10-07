import { HttpClient } from "../HTTPClients";

export class AdminGroupLessonService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getAllGroupLessons() {
    return await this.get(`api/grouplesson/all`)
  }

  async postNewGroupLesson(body) {
    return await this.post(`api/grouplesson`,body)
  }

  async deleteGroupLessonById(id){
    return await this.delete(`api/grouplesson/${id}`)
  }

  async editGroupLessonById(id,body){
    return await this.put(`api/grouplesson/${id}`,body)
  }
}