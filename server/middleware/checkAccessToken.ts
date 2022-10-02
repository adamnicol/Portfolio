import config from "../utils/config";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { findById } from "../services/user.service";
import { signToken, verifyToken } from "../utils/auth";

async function checkAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken, refreshToken } = req.cookies;

  // Check for a valid access token.
  if (accessToken) {
    const access = verifyToken(accessToken);

    if (access.valid && access.payLoad) {
      req.token = access.payLoad;
      return next();
    }

    // Check for a valid refresh token.
    if (access.expired && refreshToken) {
      const refresh = verifyToken(refreshToken);

      if (refresh.valid && refresh.payLoad) {
        await renewAccessToken(req, res, refresh.payLoad.userId);
        return next();
      }
    }
  }
  next();
}

async function renewAccessToken(req: Request, res: Response, userId: number) {
  const user = await findById(userId);

  if (user?.active) {
    // Generate a new access token.
    const newPayLoad = { userId, role: user.role };
    const newAccessToken = signToken(newPayLoad, config.auth.accessTokenTTL);
    req.token = newPayLoad;

    res.cookie(
      "accessToken",
      newAccessToken,
      config.cookieOptions as CookieOptions
    );
  }
}

export default checkAccessToken;
