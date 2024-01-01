import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const orderRouter = Router();

orderRouter.post("/add", OrderController.addOrder);

export default orderRouter;