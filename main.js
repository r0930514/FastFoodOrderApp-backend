import express from "express"
import indexRouter from "./router/index.js"
import logger from "./utils/log.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/debug', indexRouter)

app.listen(3000, ()=>{
    console.log("Hello")
})

