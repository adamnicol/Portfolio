import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { Role } from "../models/user.model";
import Status from "../utils/statusCodes";

const requireToken =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(Status.Forbidden).send("Authentication required");
    }

    if (token.toLowerCase().startsWith("bearer")) {
      token = token.slice(6, token.length).trim();
    }

    const decoded = verifyToken(token);

    if (decoded.expired) {
      return res.status(Status.Forbidden).send("Token expired");
    } else if (!decoded.valid) {
      return res.status(Status.Forbidden).send("Token invalid");
    } else if (decoded.payLoad && decoded.payLoad.role < role) {
      return res.status(Status.Forbidden).send("Insufficient Permission");
    }

    res.locals.token = decoded;
    next();
  };

export default requireToken;
