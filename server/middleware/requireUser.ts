import { Request, Response, NextFunction } from "express";
import { Role } from "../models/user.model";
import Status from "../utils/statusCodes";

const requireUser =
  (requiredRole: Role = Role.User) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.token) {
      return res.status(Status.Unauthorized).send("Authentication required");
    } else if (req.token.role < requiredRole) {
      return res.status(Status.Forbidden).send("Insufficient user level");
    } else {
      return next();
    }
  };

export default requireUser;
