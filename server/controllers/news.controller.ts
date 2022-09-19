import { NextFunction, Request, Response } from "express";
import { News } from "../models/news.model";
import { NewsSchema } from "../schemas/news.schema";
import { ApiError } from "../middleware/errorHandler";
import Status from "../utils/statusCodes";
import * as service from "../services/news.service";

export async function get(
  req: Request<{}, {}, {}, { limit?: number; offset?: number; tag?: string }>,
  res: Response<News[]>
) {
  const { limit, offset, tag } = req.query;
  const result = tag
    ? await service.get(limit, offset, { tags: tag.toLowerCase() })
    : await service.get(limit, offset);

  res.send(result);
}

export async function getTop(
  req: Request<{ count?: number }>,
  res: Response<News[]>
) {
  const result = await service.getTop(req.params.count || 10);
  res.send(result);
}

export async function count(
  req: Request<{}, {}, {}, { tag?: string }>,
  res: Response<string>
) {
  const count = req.query.tag
    ? await service.count({ tags: req.query.tag.toLowerCase() })
    : await service.count();

  res.send(count.toString());
}

export async function getById(
  req: Request<{ id: string }>,
  res: Response<News>,
  next: NextFunction
) {
  const result = await service.getById(req.params.id);
  if (result === null) {
    next(new ApiError(Status.NotFound, "Invalid ID"));
  } else {
    res.send(result);
  }
}

export async function getTags(
  req: Request<{}, {}, {}, { limit: number }>,
  res: Response<string[]>
) {
  const result = await service.getTags(req.query.limit);
  res.send(result);
}

export async function post(
  req: Request<{}, {}, NewsSchema["body"]>,
  res: Response<News>
) {
  const author = req.token.userId;
  const news = await service.post({ ...req.body, author });
  res.send(news);
}
