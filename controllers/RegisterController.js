import express from "express"
import AuthService from "../service/AuthService.js";
import TestFileService from "../service/TestFileService.js";

class RegisterController{
    /**
     * @async
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async register(req, res) {
        //console.log(req.body);
        const username = req.body.email
        const userDB = await TestFileService.fileReadObject()


        userDB.forEach(element => {
            if(element.user == username ){
                return
                return res.sendStatus(409).send({
                    error: "已註冊"
                })
            }
        });

        const hashedPwd = await AuthService.hashPassword(req.body.password)

    
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