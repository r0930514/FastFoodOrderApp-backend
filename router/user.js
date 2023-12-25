import { Router } from "express";
import session from "express-session"
import 'dotenv/config'
import RegisterController from "../controllers/RegisterController.js";
import LoginController from "../controllers/LoginController.js";
import LoginStateController from "../controllers/LoginStateController.js";
const userRouter = Router()

userRouter.post('/register', RegisterController.register)
userRouter.post('/login', LoginController.login)
userRouter.get('/isLoggedIn', LoginStateController.isTokenLoggedIn)


export default userRouter