import { Request, Response } from "express";
import { User } from "../models/user.model";
import { createUser } from "../services/user.service";
import Status from "../utils/statusCodes";
import log from "../utils/logger";

export async function register(req: Request<{}, {}, User>, res: Response) {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Conflict).send(e.message);
  }
}
