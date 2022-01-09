import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) throw new Error("Username or password invalid!");

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) throw new Error("Username or password invalid!");

    const token = sign({ username }, "3935ca875074dc4a39598a2e061c3aa0", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}