import { Request, Response, CookieOptions, NextFunction } from "express";
import { UserSchema, UserLoginSchema } from "../schemas/user.schema";
import { findUserByEmail, checkPassword } from "../services/user.service";
import { createToken } from "../utils/auth";
import { User } from "../models/user.model";
import { ApiError } from "../middleware/errorHandler";
import * as service from "../services/user.service";
import Status from "../utils/statusCodes";
import config from "../utils/config";

export async function register(
  req: Request<{}, {}, UserSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await service.createUser(req.body);
    // TODO: Send activation email.
    res.send(user);
  } catch (e: any) {
    next(new ApiError(Status.Conflict, "User exists"));
  }
}

export async function login(
  req: Request<{}, {}, UserLoginSchema["body"]>,
  res: Response<User | string>,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Check for an active user account.
  const user = await findUserByEmail(email);
  if (!user?.active) {
    return next(new ApiError(Status.Unauthorized, "Login Failed"));
  }

  // Check the passwords match.
  const match = await checkPassword(user, password);
  if (!match) {
    return next(new ApiError(Status.Unauthorized, "Login Failed"));
  }

  // Send access and refresh tokens.
  sendAccessTokens(user, res);

  // Password removed in user model.
  res.status(Status.Accepted).send(user);
}

export async function logout(req: Request, res: Response) {
  revokeAccessTokens(res);
  res.send("Logout successful");
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
