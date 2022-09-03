import { Request, Response } from "express";
import model from "../models/user.model";
import Status from "../utils/statusCodes";

export async function create(request: Request, response: Response) {
  try {
    response.send(await model.create(request.body));
  } catch (e: any) {
    console.error(e);
    return response.status(Status.BadRequest).send(e.message);
  }
}
