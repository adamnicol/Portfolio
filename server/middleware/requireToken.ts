import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { Role } from "../models/user.model";
import Status from "../utils/statusCodes";

const requireToken =
  (role: Role) => (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(Status.Forbidden).send("Forbidden");
    }

    const decoded = verifyToken(accessToken);

    if (!decoded.valid || decoded.expired) {
      return res.status(Status.Forbidden).send("Forbidden");
    } else if (decoded.payLoad && decoded.payLoad.role < role) {
      return res.status(Status.Forbidden).send("Forbidden");
    } else {
      res.locals.token = decoded.payLoad;
      return next();
    }
  };

export default requireToken;
