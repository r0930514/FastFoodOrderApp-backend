import express from 'express';
import logger from '../utils/logger.js';
import AuthService from '../services/AuthService.js';
import UserModel from '../models/UserModel.js';
import OrderModel from '../models/OrderModel.js';

class OrderController {
    /**
     * 新增訂單
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async addOrder(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const jwt = AuthService.verifyToken(token)
            if (jwt == null) {
                res.sendStatus(401);
                return;
            }
            const userID = await UserModel.returnUserID(jwt.username);
            const order = req.body.orders;
            const type = req.body.type;
            await OrderModel.sendOrder(order, type, userID);
            res.sendStatus(200);
        } catch (e) {
            logger.error(e.message);
            res.sendStatus(500);
        }
    }
}

export default OrderController;