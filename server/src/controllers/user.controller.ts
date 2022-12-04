import * as service from "../services/user.service";
import config from "../utils/config";
import path from "path";
import Status from "../utils/statusCodes";
import { ActivationToken, User } from "../types";
import { ApiError } from "../middleware/errorHandler";
import { NextFunction, Request, Response } from "express";
import { sendTemplate } from "../utils/mailer";
import { UserLoginSchema, UserSchema } from "../schemas/user.schema";
import { verifyToken } from "../utils/auth";

export async function register(
  req: Request<never, never, UserSchema["body"]>,
  res: Response
) {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  //Does the account already exist?
  if (await service.findByEmail(data.email)) {
    throw new ApiError(Status.Conflict, "User already exists");
  }

  // Create a new user account
  const user = await service.create(data);

  if (user) {
    await sendActivationEmail(user);
    res.send({
      ...user,
      password: undefined,
    });
  }
}

export async function login(
  req: Request<never, never, UserLoginSchema["body"]>,
  res: Response
) {
  const { email, password } = req.body;

  // Find the user's account
  const user = await service.findByEmail(email);
  if (!user) {
    throw new ApiError(Status.Unauthorized, "Login failed");
  }

  // Check the passwords match.
  const match = await service.checkPassword(user, password);
  if (!match) {
    throw new ApiError(Status.Unauthorized, "Login failed");
  }

  // Check if the account has been activated.
  if (!user.active) {
    throw new ApiError(Status.Forbidden, "Account not activated");
  }

  // Record the last login date.
  await service.setLoggedIn(user);

  const accessToken = service.createAccessToken(user);
  const refreshToken = service.createRefreshToken(user);

  // Send access and refresh tokens.
  res.cookie("accessToken", accessToken, config.auth.cookies);
  res.cookie("refreshToken", refreshToken, config.auth.cookies);

  res.send({
    ...user,
    password: undefined,
  });
}

export function logout(req: Request, res: Response) {
  // Revoke access tokens.
  res.clearCookie("accessToken", config.auth.cookies);
  res.clearCookie("refreshToken", config.auth.cookies);

  res.send("Logout successful");
}

export async function refresh(req: Request, res: Response) {
  const user = await service.findById(req.token.userId);
  if (user) {
    res.send({ ...user, password: undefined });
  } else {
    throw new ApiError(Status.NotFound, "Not found");
  }
}

function sendActivationEmail(user: User) {
  const template = path.join(__dirname, "..", "templates/activateAccount.hbs");
  const token = service.createActivationToken(user);

  return sendTemplate(user.email, "Activate your account", template, {
    username: user.username,
    url: `${config.server.url}/users/activate/${token}`,
  });
}

export async function activateAccount(
  req: Request<{ token: string }>,
  res: Response,
  next: NextFunction
) {
  // Check the activation token is valid.
  const token = verifyToken<ActivationToken>(req.params.token);
  if (!token.payLoad) {
    res.send("Invalid activation link");
    return next();
  }

  // Find the user's account.
  const user = await service.findByEmail(token.payLoad.email);

  if (!user) {
    res.send("Account not found");
  } else if (user.active) {
    res.send("Account already activated");
  } else if (token.expired) {
    await sendActivationEmail(user);
    res.send("Link expired, a new email has been sent");
  } else {
    await service.activateAccount(user);
    res.send("Your account has been activated");
  }

  return next();
}

export async function getProfile(
  req: Request<{ username: string }>,
  res: Response
) {
  const username = req.params.username;
  const profile = await service.getUserProfile(username);

  if (!profile) {
    throw new ApiError(Status.NotFound, "Not found");
  }

  res.send({
    ...profile,
    ...profile._count,
    _count: undefined,
  });
}
