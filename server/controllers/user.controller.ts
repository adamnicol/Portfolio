import * as service from "../services/user.service";
import config from "../utils/config";
import send from "../utils/mailer";
import Status from "../utils/statusCodes";
import { ActivationToken, User } from "../types";
import { ApiError } from "../middleware/errorHandler";
import { NextFunction, Request, Response } from "express";
import { UserLoginSchema, UserSchema } from "../schemas/user.schema";
import { verifyToken } from "../utils/auth";

export async function register(
  req: Request<{}, {}, UserSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  //Does the account already exist?
  if (await service.findByEmail(data.email)) {
    return next(new ApiError(Status.Conflict, "User already exists"));
  }

  // Create a new user account
  const user = await service.create(data);

  if (user) {
    sendActivationEmail(user);
    res.status(Status.OK).send({
      ...user,
      password: undefined,
    });
  }
}

export async function login(
  req: Request<{}, {}, UserLoginSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Find the user's account
  const user = await service.findByEmail(email);
  if (!user) {
    return next(new ApiError(Status.Unauthorized, "Login failed"));
  }

  // Check the passwords match.
  const match = await service.checkPassword(user, password);
  if (!match) {
    return next(new ApiError(Status.Unauthorized, "Login failed"));
  }

  // Check if the account has been activated.
  if (!user.active) {
    return next(new ApiError(Status.Forbidden, "Account not activated"));
  }

  const accessToken = service.createAccessToken(user);
  const refreshToken = service.createRefreshToken(user);

  // Send access and refresh tokens.
  res.cookie("accessToken", accessToken, config.auth.cookies);
  res.cookie("refreshToken", refreshToken, config.auth.cookies);

  res.status(Status.OK).send({
    ...user,
    password: undefined,
  });
}

export async function logout(req: Request, res: Response) {
  // Revoke access tokens.
  res.clearCookie("accessToken", config.auth.cookies);
  res.clearCookie("refreshToken", config.auth.cookies);

  res.status(Status.OK).send("Logout successful");
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const user = await service.findById(req.token.userId);
  if (user) {
    res.send({ ...user, password: undefined });
  } else {
    next(new ApiError(Status.NotFound, "Not found"));
  }
}

function sendActivationEmail(user: User) {
  const token = service.createActivationToken(user);
  return send({
    to: user.email,
    subject: "Activate your account",
    text: `${config.server.url}/users/activate/${token}`,
  });
}

export async function activateAccount(
  req: Request<{ token: string }>,
  res: Response,
  next: NextFunction
) {
  const token = verifyToken<ActivationToken>(req.params.token);
  if (!token.payLoad) {
    res.send("Invalid activation link");
    return next();
  }

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
