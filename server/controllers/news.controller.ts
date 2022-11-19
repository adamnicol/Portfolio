import * as service from "../services/news.service";
import ErrorType from "../prisma/error.codes";
import Status from "../utils/statusCodes";
import { ApiError } from "../middleware/errorHandler";
import { NextFunction, Request, Response } from "express";
import { PopulatedPost } from "../types";
import {
  PostNewsSchema,
  PostCommentSchema,
  GetNewsSchema,
  GetCommentsSchema,
} from "../schemas/news.schema";

export function get(
  req: Request<never, never, never, GetNewsSchema["query"]>,
  res: Response,
  next: NextFunction
) {
  const { limit = 100, offset = 0, tag } = req.query;

  const userId = req.token?.userId;
  const count = tag ? service.countByTag(tag) : service.count();
  const posts = tag
    ? service.getByTag(tag, limit, offset, userId)
    : service.getAll(limit, offset, userId);

  Promise.all([posts, count])
    .then((values) => {
      res.send({
        posts: values[0].map((post) => flatten(post)),
        total: values[1],
        returned: values[0].length,
      });
    })
    .catch((error) => next(error));
}

export function getTop(
  req: Request<never, never, never, { limit?: number }>,
  res: Response,
  next: NextFunction
) {
  const limit = req.query.limit ?? 10;
  service
    .getByMostLikes(limit)
    .then((result) => res.send(result))
    .catch((error) => next(error));
}

export async function count(
  req: Request<never, never, never, { tag?: string }>,
  res: Response
) {
  const count = req.query.tag
    ? await service.countByTag(req.query.tag)
    : await service.count();

  res.send(count.toString());
}

export async function getBySlug(
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction
) {
  const userId = req.token?.userId;
  const post = await service.find({ slug: req.params.slug }, userId);

  if (post) {
    res.send(flatten(post));
  } else {
    next(new ApiError(Status.NotFound, "Not found"));
  }
}

function flatten(post: PopulatedPost) {
  return {
    ...post,
    ...post._count,
    liked: post.likes.length > 0,
    author: post.author.username,
    _count: undefined,
  };
}

export function getTags(
  req: Request<never, never, never, { limit?: number }>,
  res: Response,
  next: NextFunction
) {
  const limit = req.query.limit ?? 10;
  service
    .getTags(limit)
    .then((result) => res.send(result))
    .catch((error) => next(error));
}

export async function post(
  req: Request<never, never, PostNewsSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const author = req.token.userId;
  const tags = req.body.tags ?? [];
  const post = {
    title: req.body.title,
    content: req.body.content,
    slug: await service.generateSlug(req.body.title),
  };

  service
    .create(post, author, tags)
    .then((result) => res.send(result))
    .catch((error) => next(error));
}

export function getComments(
  req: Request<
    GetCommentsSchema["params"],
    never,
    never,
    GetCommentsSchema["query"]
  >,
  res: Response,
  next: NextFunction
) {
  const { limit = 100, offset = 0 } = req.query;

  const post_id = Number(req.params.id);
  const comments = service.getComments(post_id, limit, offset);
  const total = service.getCommentCount({ post_id });

  Promise.all([comments, total])
    .then((values) => {
      res.send({
        comments: values[0],
        total: values[1],
        returned: values[0].length,
      });
    })
    .catch((error) => next(error));
}

export function postComment(
  req: Request<PostCommentSchema["params"], never, PostCommentSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const userId = req.token.userId;
  const postId = Number(req.params.id);
  const comment = req.body.comment;

  service
    .createComment(comment, postId, userId)
    .then((result) => res.send(result))
    .catch((error) => next(error));
}

export function likePost(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const userId = req.token.userId;
  const postId = Number(req.params.id);

  service
    .likePost(userId, postId)
    .then((result) => res.send(result))
    .catch((error) => {
      if (error.code === ErrorType.UniqueViolation) {
        next(new ApiError(Status.Conflict, "Already liked"));
      } else {
        next(error);
      }
    });
}
