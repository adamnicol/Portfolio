import { Request, Response } from "express";
import { News } from "../models/news.model";
import * as service from "../services/news.service";
import Status from "../utils/statusCodes";
import log from "../utils/logger";

export async function getAll(
  req: Request<{}, {}, {}, { limit?: number; offset?: number }>,
  res: Response<News[]>
) {
  try {
    const { limit, offset } = req.query;
    const result = await service.getAll(limit, offset);
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

export async function getByTag(
  req: Request<{ tag: string }, {}, {}, { limit?: number; offset?: number }>,
  res: Response<News[]>
) {
  try {
    const { limit, offset } = req.query;
    const result = await service.getByTag(limit, offset, req.params.tag);
    res.send(result);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function count(req: Request, res: Response<string>) {
  try {
    const count = await service.getCount();
    res.send(count.toString());
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}

export async function countByTag(
  req: Request<{ tag: string }>,
  res: Response<string>
) {
  try {
    const count = await service.getCountByTag(req.params.tag);
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
    const result = await service.getNewById(req.params.id);
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

export async function post(req: Request<{}, {}, News>, res: Response<News>) {
  try {
    const news = await service.postNews(req.body);
    res.send(news);
  } catch (e: any) {
    log.error(e);
    res.status(Status.Error).send(e.message);
  }
}
