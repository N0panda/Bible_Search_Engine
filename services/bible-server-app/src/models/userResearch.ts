import { searchBibleVerse } from "../services";

export class UserResearch {

  userQuery: string;
  
  constructor(userQuery: string) {
    this.userQuery = userQuery;
  }

  public readUserQuery() {
    return this.userQuery;
  }

  public async getUserResult() {
    const result = await searchBibleVerse(this.userQuery);
    return result;
  }
}
