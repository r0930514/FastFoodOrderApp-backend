import AuthService from "../services/AuthService.js"
import logger from "../utils/logger.js"

class LoginStateController {
    // Session

    // static async logout(req, res) {
    //     logger.info(`User ${req.session.user} logged out`)
    //     req.session.destroy()
    //     res.sendStatus(200)
    //     return
    // }

    // static async isSessionLoggedIn(req, res) {
    //     if (req.session.user == req.body.userphone) {
    //         logger.info(`User ${req.session.user} is logged in`)
    //         res.sendStatus(200)
    //     } else {
    //         res.sendStatus(401)
    //     }
    // }
    
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

}

export default LoginStateController