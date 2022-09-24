import express from "express";
import * as controller from "../controllers/user.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateSchema";
import asyncHandler from "express-async-handler";
import { createUserSchema, loginSchema } from "../schemas/user.schema";

const router = express.Router();

// Registers a new user account.
router.post(
  "/register",
  validate(createUserSchema),
  asyncHandler(controller.register)
);

// Authenticates a user and returns access tokens if successful.
router.post("/login", validate(loginSchema), asyncHandler(controller.login));

// Logs the user out and revokes access tokens.
router.get("/logout", requireUser(), asyncHandler(controller.logout));

// Re-checks the access token and returns an updated user object.
router.get("/refresh", requireUser(), asyncHandler(controller.refresh));

module.exports = router;
