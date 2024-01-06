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
                await DatabaseService.sql`INSERT INTO public."Order_Details" (order_id, product_id, specification_id, product_count) VALUES (${order_id}, ${parseInt(order.product_id)}, ${parseInt(order.specification_id)}, ${order.count});`;
            }

            // 根據訂單類型寫入資料庫
            if(order_type.type == "Takeout"){
                await DatabaseService.sql`INSERT INTO public."Takeout" (order_id) VALUES (${order_id});`;
            }else if(order_type.type == "Dine_In"){
                await DatabaseService.sql`INSERT INTO public."Dine_In" (order_id, table_id) VALUES (${order_id}, ${order_type.table_id});`;
            }else{
                throw new Error("order_type.type錯誤");
            }
            logger.warn(`會員ID：${member_id} 新增訂單成功，訂單ID：${order_id}`)

        }catch(e){
            logger.error(e.message);
            throw e;
        }
    }

    /**
     * 簡單查詢某筆訂單的詳細資料
     * @param {String} order_id 提供訂單ID以供查詢
     */
    static async getOrderDetail(order_id){
        try {
            const order = await DatabaseService.sql`
                SELECT 
                    order_detail_id, 
                    "Products".product_id, 
                    "Products".product_name, 
                    "Order_Details".specification_id,
                    "Products_Specification".specification_name,
                    product_count, 
                    "Products".product_price::money::numeric::float8, 
                    ("Products".product_price*product_count)::money::numeric::float8 as "total"
                FROM public."Order_Details" 
                LEFT JOIN public."Products"
                ON public."Order_Details".product_id = public."Products".product_id
                INNER JOIN public."Products_Specification"
                ON "Order_Details".specification_id = "Products_Specification".specification_id
                WHERE order_id = ${order_id}
            `
            return order;
        } catch (e) {
            logger.error(e.message);
            throw e;
        }
    }
    
    static async getOrderByMemberID(member_id){
        try {
            const order = await DatabaseService.sql`
                SELECT * FROM public."Orders" WHERE member_id = ${member_id} ORDER BY order_date DESC;
            `
            return order;
        } catch (e) {
            logger.error(e.message);
            throw e;
        }
    }
}

export default OrderModel;
