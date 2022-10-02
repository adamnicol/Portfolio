import * as controller from "../controllers/news.controller";
import asyncHandler from "express-async-handler";
import express from "express";
import requireUser from "../middleware/requireUser";
import validateSchema from "../middleware/validateSchema";
import { Role } from "@prisma/client";
import { schema } from "../schemas/news.schema";

const router = express.Router();

// Returns all news posts in the database.
router.get("/", asyncHandler(controller.get));

// Returns the top rated news posts.
router.get("/top", asyncHandler(controller.getTop));

// Returns a count of news posts in the database.
router.get("/count", asyncHandler(controller.count));

// Returns the tags that have been used on news posts.
router.get("/tags", asyncHandler(controller.getTags));

// Returns the news post with the specified slug.
router.get("/:slug", asyncHandler(controller.getBySlug));

// Returns comments for the news post with the specified ID.
router.get("/:id/comments", asyncHandler(controller.getComments));

// Adds a news post to the database.
router.post(
  "/",
  requireUser(Role.Admin),
  validateSchema(schema),
  asyncHandler(controller.post)
);

// Adds a comment to a news post.
router.post(
  "/:id/comments",
  requireUser(Role.User),
  asyncHandler(controller.postComment)
);

module.exports = router;
