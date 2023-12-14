import express from "express"
import indexRouter from "./router/index.js"

const app = express()

app.use('/debug', indexRouter)

app.listen(3000, ()=>{
    console.log("Hello")
})