import UserModel from "../models/UserModel.js";
import AuthService from "../services/AuthService.js";
import logger from "../utils/logger.js";

async function authMiddeleware(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const jwt = AuthService.verifyToken(token)
        if (jwt == null) {
            res.sendStatus(401);
            return;
        }
        req.userID = await UserModel.returnUserID(jwt.username)
        next();
    }catch(e){
        logger.error(e.message);
        res.sendStatus(500);
        return;
    }
}

export default authMiddeleware;