import express from "express"
import indexRouter from "./router/index.js"
import newsRouter from "./router/news.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/debug', indexRouter)

app.listen(3000, ()=>{
    console.log("Hello")
})

