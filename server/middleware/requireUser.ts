import Status from "../utils/statusCodes";
import { ApiError } from "./errorHandler";
import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";

const requireUser =
  (requiredRole: Role = Role.User) =>
  (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.token;

    if (!accessToken) {
      return next(new ApiError(Status.Unauthorized, "Authentication required"));
    }

    const roles = [Role.User, Role.Moderator, Role.Admin];

    if (roles.indexOf(accessToken.role) < roles.indexOf(requiredRole)) {
      return next(new ApiError(Status.Forbidden, "Forbidden"));
    }

    next();
  };

export default requireUser;
