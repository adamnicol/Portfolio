import express from "express";
import * as controller from "../controllers/news.controller";
import requireUser from "../middleware/requireUser";
import validateSchema from "../middleware/validateSchema";
import { schema } from "../schemas/news.schema";
import { Role } from "../models/user.model";

const router = express.Router();

// Returns all news posts in the database.
router.get("/", controller.get);

// Returns the top rated news posts.
router.get("/top", controller.getTop);

// Returns a count of news posts in the database.
router.get("/count", controller.count);

// Returns the tags that have been used on news posts.
router.get("/tags", controller.getTags);

// Returns the news post with the specified ID.
router.get("/:id", controller.getById);

// Returns comments for the news post with the specified ID.
router.get("/:id/comments", controller.getById);

// Adds a news post to the database.
router.post(
  "/",
  requireUser(Role.Admin),
  validateSchema(schema),
  controller.post
);

module.exports = router;
