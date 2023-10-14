import { HttpClient } from "../HTTPClients";

export class AdminTeacherService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("http://kazimov11-001-site1.itempurl.com");

  }

  async getAllTeacher() {
    return await this.get(`api/teacher/all`);
  }

  async postNewTeacher(body, imgFile) {
    const bodyFile = new FormData();
    const date = new Date();
    bodyFile.append("birthday", body.Birthday.replace(/-/g, "."));
    bodyFile.append("typeId", "2");
    bodyFile.append("facultyId", body.FacultyId);
    bodyFile.append("ImageFile", imgFile);
    bodyFile.append("includedYear", date.getFullYear());
    bodyFile.append("firstName", body.FirstName);
    bodyFile.append("language", body.Language);
    bodyFile.append("mail", body.Mail);
    bodyFile.append("password", body.Password);
    bodyFile.append("specialty", body.Specialty);
    bodyFile.append("surName", body.SurName);
    return await this.post(`api/teacher`, bodyFile);
  }

  async deleteTeacherById(id) {
    return await this.delete(`api/teacher/${id}`);
  }
}
