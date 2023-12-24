import logger from "../utils/logger.js"

class LoginStateController {
    static async logout(req, res) {
        logger.info(`User ${req.session.user} logged out`)
        req.session.destroy()
        res.sendStatus(200)
        return
    }

    static async isLoggedIn(req, res) {
        if (req.session.user == req.body.userphone) {
            logger.info(`User ${req.session.user} is logged in`)
            res.sendStatus(200)
        } else {
            res.sendStatus(401)
        }
    }
}

export default LoginStateController