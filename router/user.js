import { Router } from "express";
import 'dotenv/config'
import RegisterController from "../controllers/RegisterController.js";
import LoginController from "../controllers/LoginController.js";
import LoginStateController from "../controllers/LoginStateController.js";
const userRouter = Router()

userRouter.post('/register', RegisterController.register)
userRouter.post('/login', LoginController.login)
userRouter.get('/isLoggedIn', LoginStateController.isTokenLoggedIn)
userRouter.get('/isPhoneExist', LoginStateController.isPhoneExist)


export default userRouter