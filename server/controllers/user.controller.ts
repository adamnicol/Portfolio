import { Request, Response } from "express";
import UserModel, { User } from "../models/user.model";
import Status from "../utils/statusCodes";
import logger from "../utils/logger";
import bcrypt from "bcrypt";

export async function register(req: Request<{}, {}, User>, res: Response) {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ ...req.body, password: hash });
    res.send(user);
  } catch (e: any) {
    logger.error(e);
    res.status(Status.Conflict).send(e.message);
  }
}
