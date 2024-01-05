import express from 'express';
import logger from '../utils/logger.js';
import OrderModel from '../models/OrderModel.js';

class OrderController {
    /**
     * 新增訂單
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async addOrder(req, res) {
        try {
            // 取得從中間件過來的userID
            const userID = req.userID;

            const order = req.body.orders;
            const type = req.body.type;
            await OrderModel.sendOrder(order, type, userID);
            res.sendStatus(200);
        } catch (e) {
            logger.error(e.message);
            res.sendStatus(500);
        }
    }

    /**
     * 查詢某個會員的詳細資料（裡面包含每筆訂單的全部明細）
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    static async getOrder(req, res) {
        try {
            const userID = req.userID;
            const orders = await OrderModel.getOrderByMemberID(userID);
            for (let order of orders) {
                order.order_detail = await OrderModel.getOrderDetail(order.order_id);
            }
            res.send(orders).status(200);
        } catch (e) {
            logger.error(e.message);
            res.sendStatus(500);
        }
    }
}

export default OrderController;