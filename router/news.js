import { Router } from "express";
import fs from "fs" //read file
import logger from "../utils/logger.js";
const newsRouter = Router();


newsRouter.get("/", (req, res) => {
  fs.readFile("./static/news.json", (err, data) => {
    if (err) {
      logger.error(err.message);
      res.sendStatus(500);// error back 500
      return;
    };
    let news = JSON.parse(data);
    res.json(news);
  })
})

export default newsRouter;