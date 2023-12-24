import express from "express"
import AuthService from "../services/AuthService.js";
import UserModel from "../models/UserModel.js";
import logger from "../utils/logger.js";

class RegisterController {
    /**
     * @async
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async register(req, res) {
        const userphone = req.body.userphone
        const password = req.body.password
        const username = req.body.username
        
        //check if user already exists
        if(await UserModel.checkUserExist(userphone)){
            logger.warn(`Register failed for user ${userphone}: User already exists`)
            res.status(409).send("User already exists")
            return
        }
        try {
            const hashedPwd = await AuthService.hashPassword(req.body.password)
            // Add user to DB
            if(!await UserModel.register(username, userphone, hashedPwd)) 
                throw new Error("Failed to register user")
            logger.info(`Register success for user ${userphone}`)
            res.sendStatus(200)            
        } catch (e) {
            logger.error(e.message)
            res.sendStatus(500)
        }
        
    }

}

export default RegisterController