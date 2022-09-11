import { Request, Response } from "express";
import { User } from "../models/user.model";
import * as service from "../services/user.service";
import Status from "../utils/statusCodes";
import log from "../utils/logger";
import { signToken } from "../utils/auth";

export async function register(req: Request<{}, {}, User>, res: Response) {
  try {
    const user = await service.createUser(req.body);
    res.send(user);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Conflict).send(e.message);
  }
}

export async function login(
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<string>
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(Status.Unauthorized).send("Invalid user or password");
    }

    const user = await service.findUser(email);
    if (!user) {
      return res.status(Status.Unauthorized).send("Invalid user or password");
    }

    const match = await service.checkPassword(user, password);
    if (!match) {
      return res.status(Status.Unauthorized).send("Invalid user or password");
    }

    const token = signToken(user);
    res.send(token);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
