import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Subject } from "typeorm/persistence/Subject";

interface IAuthenticateRequest {
  email:string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user){
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }

    //Gerar token
    const token = sign({
      email: user.email
    },"6945a6f027eea4d015ccbce88c9072c4", {subject: user.id, expiresIn: "1d"});

    return token;
  }
}

export { AuthenticateUserService };