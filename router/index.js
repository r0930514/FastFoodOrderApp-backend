import express from "express"
import { Router } from "express"
import userRouter from "./user.js"
import newsRouter from "./news.js"
import logger from "../utils/logger.js"
import productRouter from "./product.js"
//orderRouter先做好才能index.js引導過去 
const indexRouter = Router()


indexRouter.use('/static', express.static('./static'))

indexRouter.use('/user', userRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/products', productRouter)


indexRouter.use('/test', (req, res) => {
    logger.http("test")//輸出log
    res.sendStatus(201)//回傳代號
})

export default indexRouter