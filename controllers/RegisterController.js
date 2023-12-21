import express from "express"
import AuthService from "../service/AuthService.js";
import TestFileService from "../service/TestFileService.js";

class RegisterController {
    /**
     * @async
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async register(req, res) {
        const username = req.body.email
        const userDB = await TestFileService.fileReadObject()

        // Check if user already exists
        for (let element of userDB) {
            if (element.user == username) {
                res.status(409).send("User already exists")
                return
            }
        }
        const hashedPwd = await AuthService.hashPassword(req.body.password)

        // Add user to DB
        userDB.push({
            user: username,
            password: hashedPwd
        })
        await TestFileService.objectWriteFile(userDB)

        console.log(userDB);


        res.sendStatus(200)

        

    }

}

export default RegisterController