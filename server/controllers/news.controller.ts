import * as NewsService from "../services/news.service";
import Status from "../utils/statusCodes";
import { ApiError } from "../middleware/errorHandler";
import { NextFunction, Request, Response } from "express";
import { WithCounts } from "../types";
import {
  PostNewsSchema,
  PostCommentSchema,
  GetNewsSchema,
  GetCommentsSchema,
} from "../schemas/news.schema";

export function get(
  req: Request<{}, {}, {}, GetNewsSchema["query"]>,
  res: Response
) {
  const { limit = 100, offset = 0, tag } = req.query;

  const count = tag ? NewsService.countByTag(tag) : NewsService.count();
  const posts = tag
    ? NewsService.getByTag(tag, limit, offset)
    : NewsService.getAll(limit, offset);

  Promise.all([posts, count]).then((values) => {
    res.send({
      posts: values[0].map((post) => flatten(post)),
      total: values[1],
      returned: values[0].length,
    });
  });
}

export function getTop(req: Request<{ limit?: number }>, res: Response) {
  const limit = req.params.limit || 10;
  NewsService.getByMostLikes(limit).then((result) => res.send(result));
}

export async function count(
  req: Request<{}, {}, {}, { tag?: string }>,
  res: Response
) {
  const count = req.query.tag
    ? await NewsService.countByTag(req.query.tag)
    : await NewsService.count();

  res.send(count);
}

export async function getBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
) {
  await NewsService.find({ slug: req.params.slug }).then((post) => {
    if (post) {
      res.send(flatten(post));
    } else {
      next(new ApiError(Status.NotFound, "Not found"));
    }
  });
}

export function getTags(
  req: Request<{}, {}, {}, { limit?: number }>,
  res: Response
) {
  const limit = req.query.limit || 10;
  NewsService.getTags(limit).then((tags) => res.send(tags));
}

export async function post(
  req: Request<{}, {}, PostNewsSchema["body"]>,
  res: Response
) {
  const author = req.token.userId;
  const tags = req.body.tags || [];
  const post = {
    title: req.body.title,
    content: req.body.content,
    slug: await NewsService.generateSlug(req.body.title),
  };

  NewsService.create(post, author, tags).then((result) => {
    res.send(result);
  });
}

export function getComments(
  req: Request<GetCommentsSchema["params"], {}, {}, GetCommentsSchema["query"]>,
  res: Response
) {
  const { limit = 100, offset = 0 } = req.query;

  const post_id = Number(req.params.id);
  const comments = NewsService.getComments(post_id, limit, offset);
  const total = NewsService.getCommentCount({ post_id });

  Promise.all([comments, total]).then((values) => {
    res.send({
      comments: values[0],
      total: values[1],
      returned: values[0].length,
    });
  });
}

export async function postComment(
  req: Request<PostCommentSchema["params"], {}, PostCommentSchema["body"]>,
  res: Response
) {
  const user = req.token.userId;
  const post = Number(req.params.id);
  const comment = req.body.comment;

  await NewsService.createComment(comment, post, user).then((result) =>
    res.send(result)
  );
}

function flatten<T>(input: WithCounts<T>) {
  return { ...input, ...input._count, _count: undefined };
}
