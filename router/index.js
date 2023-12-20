import express from "express"
import { Router } from "express"
import userRouter from "./user.js"
const indexRouter = Router()

indexRouter.use('/static', express.static('./static'))

indexRouter.use('/user', userRouter)

indexRouter.use('test', (req, res)=>{
    console.log(req.body);
    res.sendStatus(200)
})



export default indexRouter