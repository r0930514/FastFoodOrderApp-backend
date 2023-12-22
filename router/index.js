import express from "express"
import { Router } from "express"
import userRouter from "./user.js"
import newsRouter from "./news.js"
import logger from "../utils/logger.js"
const indexRouter = Router()


indexRouter.use('/static', express.static('./static'))

indexRouter.use('/user', userRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/products', )


indexRouter.use('/test', (req, res) => {
    logger.http("test")
    res.sendStatus(200)
})

export default indexRouter