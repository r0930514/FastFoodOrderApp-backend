import express from "express"
import indexRouter from "./router/index.js"
import logger from "./utils/logger.js"
import DatabaseService from "./services/DatabaseService.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/debug', indexRouter)

DatabaseService.test();

app.listen(3000, ()=>{
    logger.info("Server started on port 3000")
})

