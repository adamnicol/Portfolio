import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import Status from "../utils/statusCodes";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      const error = e as ZodError;
      res.status(Status.BadRequest).json(error.issues);
    }
  };

export default validate;
