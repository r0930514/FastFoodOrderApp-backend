import UserModel from "../models/UserModel.js"
import AuthService from "../services/AuthService.js"
import logger from "../utils/logger.js"

class LoginStateController {
    static async isTokenLoggedIn(req, res) {
        // 回傳 token 是否有效
        const result = await AuthService.verifyToken(req.headers.authorization.split(" ")[1])
        if (result != null) {
            logger.info(`User ${result.username} is logged in`)
            res.sendStatus(200)
        } else {
            logger.warn(`Token is invalid`)
            res.sendStatus(401)
        }
    }
    static async isPhoneExist(req, res) {
        const result = await UserModel.checkUserExist(req.body.userphone)
        if (result == false) {
            logger.info(`User ${req.body.userphone} is not exist`)
            res.sendStatus(404)
        }else{
            logger.info(`User ${req.body.userphone} is exist`)
            res.sendStatus(200)
        }
    }

}

export default LoginStateController