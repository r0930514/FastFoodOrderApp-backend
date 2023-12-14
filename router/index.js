import express from "express"
import { Router } from "express"
const indexRouter = Router()

indexRouter.use('/static', express.static('../static'))

export default indexRouter