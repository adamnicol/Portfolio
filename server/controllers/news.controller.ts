import { NextFunction, Request, Response } from "express";
import { NewsSchema } from "../schemas/news.schema";
import { ApiError } from "../middleware/errorHandler";
import Status from "../utils/statusCodes";
import NewsModel from "../models/news.model";
import CommentModel, { IComment } from "../models/comment.model";

export function get(
  req: Request<{}, {}, {}, { limit?: number; offset?: number; tag?: string }>,
  res: Response
) {
  const { limit = 0, offset = 0, tag } = req.query;
  const filter = tag ? { tags: tag.toLowerCase() } : {};

  const total = NewsModel.count(filter);
  const result = NewsModel.find(filter)
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .lean();

  Promise.all([result, total]).then((values) => {
    res.send({
      posts: values[0],
      total: values[1],
      returned: values[0].length,
    });
  });
}

export function getTop(req: Request<{ limit?: number }>, res: Response) {
  const limit = req.params.limit || 10;
  NewsModel.find()
    .sort({ likes: 1 })
    .limit(limit)
    .lean()
    .then((result) => res.send(result));
}

export function count(
  req: Request<{}, {}, {}, { tag?: string }>,
  res: Response
) {
  let filter = {};
  if (req.query.tag) {
    filter = { tags: req.query.tag.toLowerCase() };
  }
  NewsModel.count(filter).then((count) => {
    res.send({ count });
  });
}

export function getById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  NewsModel.findById(req.params.id)
    .populate("author", "username")
    .lean()
    .then((result) => {
      res.send(result);
    })
    .catch(() => next(new ApiError(Status.NotFound, "Invalid id")));
}

export async function getTags(
  req: Request<{}, {}, {}, { limit: number }>,
  res: Response
) {
  const result = await NewsModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
    { $limit: Number(req.query.limit) },
  ]);

  const tags = result.map((x) => x._id);
  res.send(tags);
}

export async function post(
  req: Request<{}, {}, NewsSchema["body"]>,
  res: Response
) {
  const post = {
    ...req.body,
    author: req.token.userId,
  };
  NewsModel.create(post).then((result) => {
    res.send(result);
  });
}

export function getComments(
  req: Request<{ id: string }, {}, {}, { limit?: number; offset?: number }>,
  res: Response
) {
  const { limit = 0, offset = 0 } = req.query;

  const post_id = req.params.id;
  const total = CommentModel.count({ post_id });
  const comments = CommentModel.find({ post_id })
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .lean();

  Promise.all([comments, total]).then((values) => {
    res.send({
      comments: values[0],
      total: values[1],
      returned: values[0].length,
    });
  });
}

export function postComment(
  req: Request<{ id: string }, {}, { comment: IComment }>,
  res: Response
) {
  const comment = {
    author: req.token.userId,
    post_id: req.params.id,
    content: req.body.comment,
  };
  CommentModel.create(comment)
    .then((result) => result.populate("author", "username"))
    .then((result) => {
      NewsModel.findByIdAndUpdate(comment.post_id, {
        $inc: { comments: 1 },
      }).then(() => res.send(result));
    });
}
