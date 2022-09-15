import { Request, Response, CookieOptions } from "express";
import { UserSchema, UserLoginSchema } from "../schemas/user.schema";
import { findUserByEmail, checkPassword } from "../services/user.service";
import { createToken } from "../utils/auth";
import { User } from "../models/user.model";
import * as service from "../services/user.service";
import log from "../utils/logger";
import Status from "../utils/statusCodes";
import config from "../utils/config";

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
    const user = await findUserByEmail(email);
    if (!user?.active) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    // Check the passwords match.
    const match = await checkPassword(user, password);
    if (!match) {
      return res.status(Status.Unauthorized).send("Login failed");
    }

    // Send access and refresh tokens.
    sendAccessTokens(user, res);

    res.status(Status.Accepted).send("Login Successful");
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    revokeAccessTokens(res);
    res.send("Logout successful");
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

function sendAccessTokens(user: User, res: Response) {
  const accessToken = createToken(user, config.auth.accessTokenTTL);
  const refreshToken = createToken(user, config.auth.refreshTokenTTL);
  const options = config.cookieOptions as CookieOptions;
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
}

function revokeAccessTokens(res: Response) {
  res.cookie("accessToken", null, { maxAge: 0 });
  res.cookie("refreshToken", null, { maxAge: 0 });
}
