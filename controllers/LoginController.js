import express from "express"
import AuthService from "../service/AuthService.js"
import TestFileService from "../service/TestFileService.js"


class LoginController {

    /**
    * @async
    * @param {express.Request} req 
    * @param {express.Response} res 
    */
    static async login(req, res) {
        const username = req.body.email
        const password = req.body.password

        const userDB = await TestFileService.fileReadObject()

        // Check if user already exists
        for (let element of userDB) {
            if (element.user == username) {
                const isPasswordCorrect = await AuthService.comparePassword(password, element.password)
                if (isPasswordCorrect) {
                    req.session.user = username
                    res.sendStatus(200)
                    return
                }
            }
        }
        res.sendStatus(401)
    }
}
export default LoginController