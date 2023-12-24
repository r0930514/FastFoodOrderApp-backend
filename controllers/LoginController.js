import express from "express"
import AuthService from "../services/AuthService.js"
import logger from "../utils/logger.js"
import UserModel from "../models/UserModel.js"


class LoginController {

    /**
    * @async
    * @param {express.Request} req 
    * @param {express.Response} res 
    */
    static async login(req, res) {
        const username = req.body.userphone
        const password = req.body.password

        // Check if user exists
        const userExist = await UserModel.checkUserExist(username)
        if (userExist != false) {
            const isPasswordCorrect = await AuthService.comparePassword(password, userExist)
            if (isPasswordCorrect) {
                req.session.user = username
                logger.info(`Login success for user ${username}`)
                logger.info(req.session.user + " " + req.sessionID)
                res.sendStatus(200)
                return
            }else{
                logger.warn(`Login failed for user ${username}: Password incorrect`)
                res.sendStatus(401)
                return
            }
        }
        
        logger.warn(`Login failed for user ${username}`)
        res.sendStatus(401)
    }

    
}
export default LoginController

