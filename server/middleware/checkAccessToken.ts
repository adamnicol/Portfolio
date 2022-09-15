import { Request, Response, NextFunction, CookieOptions } from "express";
import { verifyToken, signToken } from "../utils/auth";
import { findUserById } from "../services/user.service";
import config from "../utils/config";

const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  // Check for a valid access token.
  if (accessToken) {
    const decoded = verifyToken(accessToken);

    if (decoded.valid && decoded.payLoad) {
      req.token = decoded.payLoad;
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
};

async function renewAccessToken(req: Request, res: Response, userId: string) {
  const user = await findUserById(userId);

  if (user?.active) {
    const newPayLoad = { userId, role: user.role };
    req.token = newPayLoad;

    // Generate a new access token.
    const newAccessToken = signToken(newPayLoad, config.auth.accessTokenTTL);
    const options = config.cookieOptions as CookieOptions;
    res.cookie("accessToken", newAccessToken, options);
  }
}

export default validateAccessToken;
