import * as controller from '../controllers/user.controller';
import asyncHandler from 'express-async-handler';
import config from './../utils/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateSchema';
import { createUserSchema, loginSchema } from '../schemas/user.schema';

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *  get:
 *    tags: ["Users"]
 *    summary: Registers a new user account
 *    parameters:
 *      - in: body
 *        name: user
 *        type: object
 *        required: true
 *        description: User details
 *    responses:
 *      200:
 *        description: Success
 *      409:
 *        description: User already exists
 */
router.post("/register", rateLimit(config.registrationLimit), validate(createUserSchema), asyncHandler(controller.register));

/**
 * @swagger
 * /users/login:
 *  get:
 *    tags: ["Users"]
 *    summary: Authenticates a user
 *    parameters:
 *      - in: body
 *        name: credentials
 *        type: object
 *        required: true
 *        description: Login details
 *    responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Login failed
 *      403:
 *        description: Activation required
 */
router.post("/login", rateLimit(config.loginLimit), validate(loginSchema), asyncHandler(controller.login));

/**
 * @swagger
 * /users/logout:
 *  get:
 *    tags: ["Users"]
 *    summary: Logs the user out
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/logout", requireUser(), asyncHandler(controller.logout));

/**
 * @swagger
 * /users/refresh:
 *  get:
 *    tags: ["Users"]
 *    summary: Forces a re-check of the access token
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/refresh", requireUser(), asyncHandler(controller.refresh));

/**
 * @swagger
 * /users/activate/{token}:
 *  get:
 *    tags: ["Users"]
 *    summary: Activates an account
 *    parameters:
 *      - in: path
 *        name: token
 *        type: string
 *        required: true
 *        description: Activation token
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid token
 *      403:
 *        description: Token expired
 *      404:
 *        description: Not found
 */
router.get("/activate/:token", asyncHandler(controller.activateAccount));

/**
 * @swagger
 * /users/{username}:
 *  get:
 *    tags: ["Users"]
 *    summary: Returns the user profile
 *    parameters:
 *      - in: path
 *        name: username
 *        type: string
 *        required: true
 *        description: Username
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not found
 */
router.get("/:username", asyncHandler(controller.getProfile));

module.exports = router;
