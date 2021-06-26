import { ListUserService } from "../services/ListUsersService";
import { Request, Response } from "express";


class ListUserController {

  async handle(request: Request, response: Response){
    const listUsersService = new ListUserService();
    const users = await listUsersService.execute();

    return response.json(users);
  }
}

export { ListUserController };