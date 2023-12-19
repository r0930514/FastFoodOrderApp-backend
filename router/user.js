import { Router } from "express";
import session from "express-session"
import session_key from "../private/session_key.js"
import RegisterController from "../controllers/RegisterController.js";
const userRouter = Router()

userRouter.use(session({
    secret: session_key,
    resave: false,
    saveUninitialized: true,
}))

userRouter.get('/login', (req, res)=>{
    res.send(session_key)
})

userRouter.post('/register', RegisterController.register)


export default userRouter