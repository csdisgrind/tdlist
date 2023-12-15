// Buffer Line
import { User } from "../utils-demo/types";
import fs from "fs";

class UserRepository {
  private data: User[];
  constructor(userList: User[]) {
    this.data = userList;
  }

  private async updateStorage() {
    fs.writeFileSync("./storage-demo/user.json", JSON.stringify(this.data));
    return;
  }

  private findUser(user: User) {
    const { name } = user;
    return this.data.map((user) => user.name).includes(name);
  }

  async getUser(user: User) {
    return this.findUser(user);
  }

  async insertUser(newUser: User) {
    if (this.findUser(newUser)) {
      throw new Error("duplicated user");
      return;
    }
    this.data.push(newUser);
    await this.updateStorage();
  }
}

export default UserRepository;
