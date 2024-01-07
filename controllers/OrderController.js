import express from 'express';
import logger from '../utils/logger.js';
import OrderModel from '../models/OrderModel.js';
import FirebaseMessageService from '../services/FirebaseMessageService.js';

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
            const notify_token = req.body.notify_token;
            await OrderModel.sendOrder(order, type, userID, notify_token);
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

    /**
     * admin用的查詢全部訂單
     */
    static async getAllOrder(req, res) {
        try {
            const orders = await OrderModel.getOrderByAdmin();
            const userID = req.userID;
            // 40是管理員的ID
            if(userID != 40) {
                res.sendStatus(401)
                return;
            };

            for (let order of orders) {
                order.order_detail = await OrderModel.getOrderDetail(order.order_id);
            }
            res.send(orders).status(200);
        } catch (e) {
            logger.error(e.message);
            res.sendStatus(500);
        }
    }


    /**
     * 完成訂單
     */
    static async doneOrder(req, res) {
        try {
            const order_id = req.params.order_id;
            const userID = req.userID;
            // 40是管理員的ID
            if(userID != 40) {
                res.sendStatus(401)
                return;
            };
            const notify_token = (await OrderModel.doneOrder(order_id))[0].order_notify_token;
            await FirebaseMessageService.sendMessage(notify_token, {
                title: '訂單已完成',
                body: `您的訂單${order_id}已完成`
            })

            res.sendStatus(200);
        } catch (e) {
            logger.error(e.message);
            res.sendStatus(500);
        }
    }


}

export default OrderController;