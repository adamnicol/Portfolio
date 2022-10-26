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
  req: Request<{}, {}, {}, GetNewsSchema["query"]>,
  res: Response
) {
  const { limit = 100, offset = 0, tag } = req.query;

  const user = req.token?.userId;
  const count = tag ? service.countByTag(tag) : service.count();
  const posts = tag
    ? service.getByTag(tag, limit, offset, user)
    : service.getAll(limit, offset, user);

  Promise.all([posts, count]).then((values) => {
    res.send({
      posts: values[0].map((post) => flatten(post)),
      total: values[1],
      returned: values[0].length,
    });
  });
}

export function getTop(
  req: Request<{}, {}, {}, { limit?: number }>,
  res: Response
) {
  const limit = req.query.limit || 10;
  service.getByMostLikes(limit).then((result) => res.send(result));
}

export async function count(
  req: Request<{}, {}, {}, { tag?: string }>,
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
  const user = req.token?.userId;
  await service.find({ slug: req.params.slug }, user).then((post) => {
    if (post) {
      res.send(flatten(post));
    } else {
      next(new ApiError(Status.NotFound, "Not found"));
    }
  });
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
  req: Request<{}, {}, {}, { limit?: number }>,
  res: Response
) {
  const limit = req.query.limit || 10;
  service.getTags(limit).then((tags) => res.send(tags));
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
    slug: await service.generateSlug(req.body.title),
  };

  service.create(post, author, tags).then((result) => {
    res.send(result);
  });
}

export function getComments(
  req: Request<GetCommentsSchema["params"], {}, {}, GetCommentsSchema["query"]>,
  res: Response
) {
  const { limit = 100, offset = 0 } = req.query;

  const post_id = Number(req.params.id);
  const comments = service.getComments(post_id, limit, offset);
  const total = service.getCommentCount({ post_id });

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

  await service
    .createComment(comment, post, user)
    .then((result) => res.send(result));
}

export async function likePost(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  const userId = req.token.userId;
  const postId = Number(req.params.id);

  await service
    .likePost(userId, postId)
    .then((result) => res.send(result))
    .catch((e) => {
      if (e.code === ErrorType.UniqueViolation) {
        next(new ApiError(Status.Conflict, "Already liked"));
      }
    });
}
