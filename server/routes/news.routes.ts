import * as controller from "../controllers/news.controller";
import asyncHandler from "express-async-handler";
import express from "express";
import requireUser from "../middleware/requireUser";
import validateSchema from "../middleware/validateSchema";
import { Role } from "@prisma/client";
import {
  postNews,
  postComment,
  getNews,
  getComments,
} from "../schemas/news.schema";

const router = express.Router();

/**
 * @swagger
 * /news:
 *  get:
 *    tags: ["News"]
 *    summary: Returns a list of news posts
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        required: false
 *        description: The number of posts to return
 *      - in: query
 *        name: offset
 *        type: number
 *        required: false
 *        description: Offset for pagination
 *      - in: query
 *        name: tag
 *        type: string
 *        required: false
 *        description: Return posts by tag
 *    responses:
 *      200:
 *        description: A list of news posts
 */
router.get("/", validateSchema(getNews), asyncHandler(controller.get));

/**
 * @swagger
 * /news/top:
 *  get:
 *    tags: ["News"]
 *    summary: Returns the top rated news posts
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        required: false
 *        description: The number of posts to return
 *    responses:
 *      200:
 *        description: A list of news posts
 */
router.get("/top", asyncHandler(controller.getTop));

/**
 * @swagger
 * /news/count:
 *  get:
 *    tags: ["News"]
 *    summary: Returns a count of news posts
 *    parameters:
 *      - in: query
 *        name: tag
 *        type: string
 *        required: false
 *        description: Return count by tag
 *    responses:
 *      200:
 *        description: Returns the count
 */
router.get("/count", asyncHandler(controller.count));

/**
 * @swagger
 * /news/tags:
 *  get:
 *    tags: ["News"]
 *    summary: Returns a list of tags used on news posts
 *    parameters:
 *      - in: query
 *        name: limit
 *        type: number
 *        required: false
 *        description: The number of tags to return
 *    responses:
 *      200:
 *        description: A list of tags
 */
router.get("/tags", asyncHandler(controller.getTags));

/**
 * @swagger
 * /news/{slug}:
 *  get:
 *    tags: ["News"]
 *    summary: Returns the news post with the specified slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        type: string
 *        required: true
 *        description: The slug
 *    responses:
 *      200:
 *        description: A single news post
 *      404:
 *        description: Post not found
 */
router.get("/:slug", asyncHandler(controller.getBySlug));

/**
 * @swagger
 * /news/{id}/comments:
 *  get:
 *    tags: ["News"]
 *    summary: Returns the comments for a news post
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *        description: The post id
 *      - in: query
 *        name: limit
 *        type: number
 *        required: false
 *        description: The number of comments to return
 *      - in: query
 *        name: offset
 *        type: number
 *        required: false
 *        description: Offset for pagination
 *    responses:
 *      200:
 *        description: A list of comments
 *      404:
 *        description: Post not found
 */
router.get(
  "/:id/comments",
  validateSchema(getComments),
  asyncHandler(controller.getComments)
);

/**
 * @swagger
 * /news/{id}:
 *  post:
 *    tags: ["News"]
 *    summary: Add a news post to the database
 *    parameters:
 *      - in: body
 *        name: post
 *        type: object
 *        required: true
 *        description: The news post
 *    responses:
 *      200:
 *        description: Post was added
 *      401:
 *        description: Authentication required
 *      403:
 *        description: Forbidden
 */
router.post(
  "/",
  requireUser(Role.Admin),
  validateSchema(postNews),
  asyncHandler(controller.post)
);

/**
 * @swagger
 * /news/{id}/comments:
 *  post:
 *    tags: ["News"]
 *    summary: Add a comment to a news post
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *        description: The post id
 *      - in: body
 *        name: comment
 *        type: object
 *        required: true
 *        description: The comment
 *    responses:
 *      200:
 *        description: Comment was added
 *      401:
 *        description: Authentication required
 *      404:
 *        description: Post not found
 */
router.post(
  "/:id/comments",
  requireUser(Role.User),
  validateSchema(postComment),
  asyncHandler(controller.postComment)
);

/**
 * @swagger
 * /news/{id}/like:
 *  post:
 *    tags: ["News"]
 *    summary: Increments the like counter for a news post
 *    parameters:
 *      - in: path
 *        name: id
 *        type: number
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *        description: Like was recorded
 *      401:
 *        description: Authentication required
 *      404:
 *        description: Post not found
 *      409:
 *        description: Already liked
 */
router.post(
  "/:id/like",
  requireUser(Role.User),
  asyncHandler(controller.likePost)
);

module.exports = router;
