import express from "express";

const controller = require("../controllers/news.controller");
const router = express.Router();

router.get("/", controller.getAll);

router.post("/create", controller.create);

module.exports = router;
