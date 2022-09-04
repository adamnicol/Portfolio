import { Request, Response } from "express";
import model from "../models/news.model";
import Status from "../utils/statusCodes";

export async function getAll(request: Request, response: Response) {
  try {
    response.send(await model.find());
  } catch (e: any) {
    console.error(e);
    return response.status(Status.Error).send(e.message);
  }
}

export async function create(request: Request, response: Response) {
  try {
    response.send(await model.create(request.body));
  } catch (e: any) {
    console.error(e);
    return response.status(Status.Error).send(e.message);
  }
}
