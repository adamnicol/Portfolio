import asyncHandler from "express-async-handler";
import config from "../utils/config";
import { AccessToken, RefreshToken } from "../types";
import { findById } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { signToken, verifyToken } from "../utils/auth";

const checkAccessToken = () =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    // Check for a valid access token.
    if (accessToken) {
      const access = verifyToken<AccessToken>(accessToken);

      if (access.valid && access.payLoad) {
        req.token = access.payLoad;
        return next();
      }

      // Check for a valid refresh token.
      if (access.expired && refreshToken) {
        const refresh = verifyToken<RefreshToken>(refreshToken);

        if (refresh.valid && refresh.payLoad) {
          await renewAccessToken(req, res, refresh.payLoad.userId);
          return next();
        }
      }
    }
    next();
  });

async function renewAccessToken(req: Request, res: Response, userId: number) {
  const user = await findById(userId);

  if (user?.active) {
    // Generate a new access token.
    const newPayLoad: AccessToken = { userId, role: user.role };
    const newAccessToken = signToken(newPayLoad, config.auth.accessTokenTTL);
    req.token = newPayLoad;

    res.cookie("accessToken", newAccessToken, config.auth.cookies);
  }
}

export default checkAccessToken;
