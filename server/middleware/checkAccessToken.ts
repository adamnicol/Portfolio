import { Request, Response, NextFunction, CookieOptions } from "express";
import { verifyToken, signToken } from "../utils/auth";
import { findUserById } from "../services/user.service";
import config from "../utils/config";

async function validateAccessToken(
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
    if (refreshToken) {
      const refresh = verifyToken(refreshToken);

      if (refresh.valid && refresh.payLoad) {
        await renewAccessToken(req, res, refresh.payLoad.userId);
        return next();
      }
    }
  }
  next();
}

async function renewAccessToken(req: Request, res: Response, userId: string) {
  const user = await findUserById(userId);

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

export default validateAccessToken;
