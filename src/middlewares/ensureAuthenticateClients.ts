import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClients(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  //Bearer 4654564186464-4515614
  //[0] - Bearer
  //[1] - 4654564186464-4515614
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "3935ca875074dc4a39598a2e061c3aa0"
    ) as IPayload;

    request.id_client = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
