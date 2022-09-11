import { Request, Response } from "express";
import { UserSchema, UserLoginSchema } from "../schemas/user.schema";
import { signToken } from "../utils/auth";
import Status from "../utils/statusCodes";
import log from "../utils/logger";
import * as service from "../services/user.service";

export async function register(
  req: Request<{}, {}, UserSchema>,
  res: Response
) {
  try {
    const user = await service.createUser(req.body);
    res.send(user);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Conflict).send(e.message);
  }
}

export async function login(
  req: Request<{}, {}, UserLoginSchema>,
  res: Response<string>
) {
  try {
    const { email, password } = req.body;

    const user = await service.findUser(email);
    if (!user) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    const match = await service.checkPassword(user, password);
    if (!match) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    const token = signToken(user);
    res.send(token);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
