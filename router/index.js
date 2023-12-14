import express from "express"
import { Router } from "express"
const indexRouter = Router()

indexRouter.use('/static', express.static('./static'))

indexRouter.post('/user', (req, res)=>{
    console.log(req.body);
    res.sendStatus(200)
})


export default indexRouter