import express from "express"
import HashService from "../services/HashService.js"
import logger from "../utils/logger.js"
import UserModel from "../models/UserModel.js"
import AuthService from "../services/AuthService.js"


class LoginController {

    /**
    * @async
    * @param {express.Request} req 
    * @param {express.Response} res 
    */
    static async login(req, res) {
        const userphone = req.body.userphone
        const password = req.body.password

        // Check if user exists
        const userExist = await UserModel.checkUserExist(userphone)
        if (userExist != false) {
            const isPasswordCorrect = await HashService.comparePassword(password, userExist)
            if (isPasswordCorrect) {
                logger.info(`Login success for user ${userphone}`)
                res
                    .setHeader("Authorization", "Bearer " + await AuthService.generateToken(userphone)) 
                    .json({userphone: userphone})
                    .status(200)
                    
                return
            } else {
                logger.warn(`Login failed for user ${userphone}: Password incorrect`)
                res.sendStatus(401)
                return
            }
        }

        logger.warn(`Login failed for user ${userphone}`)
        res.sendStatus(401)
    }


}
export default LoginController

