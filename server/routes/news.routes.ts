import express from "express";
import * as controller from "../controllers/news.controller";
import validate from "../middleware/validateSchema";
import schema from "../schemas/news.schema";

const router = express.Router();

// Returns all news posts in the database.
router.get("/", controller.get);

// Returns the top X news posts ordered by most likes.
router.get("/top/:count?", controller.getTop);

// Returns the news post with the specified ID.
router.get("/post/:id", controller.getById);

// Returns a list of tags that have been used on news posts.
router.get("/tags", controller.getTags);

// Returns a count of news posts in the database.
router.get("/count/:tag?", controller.count);

// Adds a news post to the database.
router.post("/post", validate(schema), controller.post);

module.exports = router;
