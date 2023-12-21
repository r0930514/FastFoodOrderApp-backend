import { Router } from "express";
import fs from "fs"
const newsRouter = Router();


newsRouter.get("/", (req, res) => {
  fs.readFile("./private/news.json", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    };
    let news = JSON.parse(data);
    res.json(news);
  })
  console.log("news");
})

export default newsRouter;