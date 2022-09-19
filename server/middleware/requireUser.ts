import { Request, Response, NextFunction } from "express";
import { Role } from "../models/user.model";
import { ApiError } from "./errorHandler";
import Status from "../utils/statusCodes";

const requireUser =
  (requiredRole: Role = Role.User) =>
  (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.token;

    if (!accessToken) {
      return next(new ApiError(Status.Unauthorized, "Authentication required"));
    }
    if (accessToken.role < requiredRole) {
      return next(new ApiError(Status.Forbidden, "Forbidden"));
    }

    next();
  };

export default requireUser;
