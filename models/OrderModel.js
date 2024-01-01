import logger from "../utils/logger.js";
import DatabaseService from "../services/DatabaseService.js";
import getTime from "../utils/getTime.js";


class OrderModel{
    /**
     * @requires orders
     * @requires order_type
     * @param {Object[]} orders 訂單明細物件
     * @param {Object} order_type 訂單類型物件
     * @param {Number} member_id 會員ID
     * */
    static async sendOrder(orders, order_type, member_id){
        const time = getTime();
        try{
            // 建立訂單
            const order_id = (await DatabaseService.sql`INSERT INTO public."Orders" (member_id, order_date, order_type) VALUES (${member_id}, ${time}, ${order_type.type}) RETURNING order_id;`)[0].order_id
            // 將訂單明細寫入資料庫
            for(let order of orders){
                await DatabaseService.sql`INSERT INTO public."Order_Details" (order_id, product_id, specification_id, product_count) VALUES (${order_id}, ${order.product_id}, ${order.specification_id}, ${order.count});`;
            }

            // 根據訂單類型寫入資料庫
            if(order_type.type == "Takeout"){
                await DatabaseService.sql`INSERT INTO public."Takeout" (order_id) VALUES (${order_id});`;
            }else if(order_type.type == "Dine_In"){
                await DatabaseService.sql`INSERT INTO public."Dine_In" (order_id, table_id) VALUES (${order_id}, ${order_type.table_id});`;
            }else{
                throw new Error("order_type.type錯誤");
            }
            logger.info(order_id + " 訂單已建立");

        }catch(e){
            logger.error(e.message);
            throw e;
        }
    }
}

export default OrderModel;
