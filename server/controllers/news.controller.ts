import { Request, Response } from "express";
import { News } from "../models/news.model";
import { NewsSchema } from "../schemas/news.schema";
import * as service from "../services/news.service";
import Status from "../utils/statusCodes";
import log from "../utils/logger";

export async function get(
  req: Request<{}, {}, {}, { limit?: number; offset?: number; tag?: string }>,
  res: Response<News[]>
) {
  try {
    const { limit, offset, tag } = req.query;
    const result = tag
      ? await service.get(limit, offset, { tags: tag.toLowerCase() })
      : await service.get(limit, offset);

    res.send(result);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function getTop(
  req: Request<{ count?: number }>,
  res: Response<News[]>
) {
  try {
    const result = await service.getTop(req.params.count);
    res.send(result);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function count(
  req: Request<{}, {}, {}, { tag?: string }>,
  res: Response<string>
) {
  try {
    const count = req.query.tag
      ? await service.count({ tags: req.query.tag.toLowerCase() })
      : await service.count();

    res.send(count.toString());
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function getById(
  req: Request<{ id: string }>,
  res: Response<News>
) {
  try {
    const result = await service.getById(req.params.id);
    if (result === null) {
      res.status(Status.NotFound);
    } else {
      res.send(result);
    }
  } catch (e: any) {
    log.error(e);
    res.status(Status.NotFound).send(e.message);
  }
}

export async function getTags(
  req: Request<{}, {}, {}, { limit: number }>,
  res: Response<string[]>
) {
  try {
    const result = await service.getTags(req.query.limit);
    res.send(result);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function post(
  req: Request<{}, {}, NewsSchema["body"]>,
  res: Response<News>
) {
  try {
    const author = req.token.userId;
    const news = await service.post({ ...req.body, author });
    res.send(news);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
