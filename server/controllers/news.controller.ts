import { Request, Response } from "express";
import { News } from "../models/news.model";
import { getNews, getCount, postNews } from "../services/news.service";
import Status from "../utils/statusCodes";
import log from "../utils/logger";

export async function get(
  req: Request<{}, {}, {}, { limit?: number; offset?: number }>,
  res: Response<News[]>
) {
  try {
    const result = await getNews(req.query.limit, req.query.offset);
    res.send(result);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function count(req: Request, res: Response<string>) {
  try {
    const count = await getCount();
    res.send(count.toString());
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function post(req: Request<{}, {}, News>, res: Response<News>) {
  try {
    const news = await postNews(req.body);
    res.send(news);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
