import * as UserService from "../services/user.service";
import config from "../utils/config";
import Status from "../utils/statusCodes";
import { ApiError } from "../middleware/errorHandler";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { createToken } from "../utils/auth";
import { User } from "@prisma/client";
import { UserLoginSchema, UserSchema } from "../schemas/user.schema";

export async function register(
  req: Request<{}, {}, UserSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  // Does a user already exist with this email address?
  const user = await UserService.findByEmail(req.body.email);
  if (user) {
    next(new ApiError(Status.Conflict, "User already exists"));
  }

  await UserService.create(req.body).then((user) => {
    res.send({ ...user, password: undefined });
  });
}

export async function login(
  req: Request<{}, {}, UserLoginSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Check for an active user account.
  const user = await UserService.findByEmail(email);
  if (!user?.active) {
    return next(new ApiError(Status.Unauthorized, "Login failed"));
  }

  // Check the passwords match.
  const match = await UserService.checkPassword(user, password);
  if (!match) {
    return next(new ApiError(Status.Unauthorized, "Login failed"));
  }

  // Send access tokens.
  sendAccessTokens(user, res);

  res.status(Status.Accepted).send({ ...user, password: undefined });
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const user = await UserService.findById(req.token.userId);
  if (user) {
    res.send({ ...user, password: undefined });
  } else {
    next(new ApiError(Status.NotFound, "Not found"));
  }
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
