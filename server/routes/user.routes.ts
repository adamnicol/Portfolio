import * as controller from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import config from "./../utils/config";
import express from "express";
import rateLimit from "express-rate-limit";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateSchema";
import { createUserSchema, loginSchema } from "../schemas/user.schema";

const router = express.Router();

// Registers a new user account.
router.post(
  "/register",
  rateLimit(config.registrationLimit),
  validate(createUserSchema),
  asyncHandler(controller.register)
);

// Authenticates a user and returns access tokens.
router.post(
  "/login",
  rateLimit(config.loginLimit),
  validate(loginSchema),
  asyncHandler(controller.login)
);

// Logs the user out and revokes access tokens.
router.post("/logout", requireUser(), asyncHandler(controller.logout));

// Re-checks the access token and returns an updated user object.
router.get("/refresh", requireUser(), asyncHandler(controller.refresh));

// Route for when a user clicks an email verification link.
router.get("/activate/:token", asyncHandler(controller.activateAccount));

module.exports = router;
