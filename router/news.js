import { Router } from "express";
import fs from "fs"
import logger from "../utils/logger.js";
const newsRouter = Router();


newsRouter.get("/", (req, res) => {
  fs.readFile("./static/news/news.json", (err, data) => {
    if (err) {
      logger.error(err.message);
      res.sendStatus(500);
      return;
    };
    let news = JSON.parse(data);
    res.json(news);
  })
  logger.info("getNews!");
})

export default newsRouter;