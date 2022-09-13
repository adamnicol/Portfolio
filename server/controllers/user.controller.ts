import { Request, Response } from "express";
import { UserSchema, UserLoginSchema } from "../schemas/user.schema";
import { findUser, checkPassword } from "../services/user.service";
import { createAccessToken } from "../utils/auth";
import * as service from "../services/user.service";
import log from "../utils/logger";
import Status from "../utils/statusCodes";

export async function register(
  req: Request<{}, {}, UserSchema["body"]>,
  res: Response
) {
  try {
    const user = await service.createUser(req.body);
    // TODO: Send activation email.
    res.send(user);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Conflict).send(e.message);
  }
}

export async function login(
  req: Request<{}, {}, UserLoginSchema["body"]>,
  res: Response<string>
) {
  try {
    const { email, password } = req.body;

    // Check for an active user account.
    const user = await findUser(email);
    if (!user?.active) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    // Check the passwords match.
    const match = await checkPassword(user, password);
    if (!match) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    // Create access tokens and cookies.
    const accessToken = createAccessToken(user);
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 mins
      httpOnly: true,
    });

    res.status(Status.Accepted).send("Login Successful");
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.cookie("accessToken", null, {
      maxAge: 0,
      httpOnly: true,
    });

    res.send("Logout successful");
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
