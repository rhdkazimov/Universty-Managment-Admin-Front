import { HttpClient } from "../HTTPClients";

export class AdminGroupService extends HttpClient {
  constructor() {
    super("https://localhost:7046");
  }

  async getGroupsAll() {
    return await this.get(`api/group/all`)
  }

  async postNewGroup(body) {
    return await this.post(`api/group`,body)
  }

  async deleteGroupById(id){
    return await this.delete(`api/group/${id}`)
  }
}