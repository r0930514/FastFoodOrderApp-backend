import express from "express"
import AuthService from "../service/AuthService.js";
import UserModel from "../models/UserModel.js";
import logger from "../utils/logger.js";

class RegisterController {
    /**
     * @async
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async register(req, res) {
        const username = req.body.userphone
        
        //check if user already exists
        if(await UserModel.checkUserExist(username)){
            logger.warn(`Register failed for user ${username}: User already exists`)
            res.status(409).send("User already exists")
            return
        }
        try {
            const hashedPwd = await AuthService.hashPassword(req.body.password)
            // Add user to DB
            if(!await UserModel.register("null", username, hashedPwd)) throw new Error("Failed to register user")
            logger.info(`Register success for user ${username}`)
            res.sendStatus(200)            
        } catch (e) {
            logger.error(e.message)
            res.sendStatus(500)
        }
        
    }

}

export default RegisterController