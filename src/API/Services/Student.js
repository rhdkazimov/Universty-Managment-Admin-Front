import { HttpClient } from "../HTTPClients";

export class AdminStudentService extends HttpClient {
  constructor() {
    // super("https://localhost:7046");
    super("http://kazimov11-001-site1.itempurl.com");

  }

  async getAllStudent() {
    return await this.get(`api/student/all`);
  }

  async postNewStudent(body, isStatus, isStateOrdered, imgFile) {
    const bodyFile = new FormData();
    const date = new Date();
    console.log(isStatus);
    console.log(isStateOrdered);
    bodyFile.append("birthday", body.Birthday.replace(/-/g, "."));
    bodyFile.append("typeId", "1");
    bodyFile.append("groupId", body.groupId);
    bodyFile.append("imgFile", imgFile);
    bodyFile.append("includeYear", date.getFullYear());
    bodyFile.append("firstName", body.FirstName);
    bodyFile.append("language", body.Language);
    bodyFile.append("mail", body.Mail);
    bodyFile.append("password", body.Password);
    bodyFile.append("specialty", body.Specialty);
    bodyFile.append("surName", body.SurName);
    bodyFile.append("perYear", body.PerYear);
    bodyFile.append("status", isStatus);
    bodyFile.append("stateOrdered", isStateOrdered);
    bodyFile.append("includePoint", body.IncludePoint);

    return await this.post(`api/student`, bodyFile);
  }

  async deleteStudentById(id) {
    return await this.delete(`api/student/${id}`);
  }
}
