import { Router } from "express";
import OrderController from "../controllers/OrderController.js";
import authMiddeleware from "../middleware/authMiddleware.js";

const orderRouter = Router();
//使用認證中間件
orderRouter.use(authMiddeleware);

//新增訂單
orderRouter.post("/add", OrderController.addOrder);

//取得這個會員的所有訂單的詳細資料
orderRouter.get("/", OrderController.getOrder);

export default orderRouter;