import { Request, Response } from "express";
import model, { News } from "../models/news.model";
import Status from "../utils/statusCodes";
import logger from "../utils/logger";

export async function get(req: Request, res: Response) {
  try {
    const news = await model.find();
    res.send(news);
  } catch (e: any) {
    logger.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function create(req: Request<{}, {}, News>, res: Response) {
  try {
    const news = await model.create(req.body);
    res.send(news);
  } catch (e: any) {
    logger.error(e);
    res.status(Status.Error).send(e.message);
  }
}
