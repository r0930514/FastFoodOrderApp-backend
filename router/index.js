import express from "express"
import { Router } from "express"
import userRouter from "./user.js"
import newsRouter from "./news.js"
const indexRouter = Router()


indexRouter.use('/static', express.static('./static'))

indexRouter.use('/user', userRouter)
indexRouter.use('/news', newsRouter)

indexRouter.use('test', (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
})

export default indexRouter