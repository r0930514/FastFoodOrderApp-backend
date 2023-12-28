import DatabaseService from '../services/DatabaseService.js';
import classify from '../utils/classify.js';
import logger from '../utils/logger.js';

class ProductModel {
    /**
     * @async
     * @returns {Object} 回傳分類後的所有產品
     */
    static async getGroupByProduct() {
        try {
            const result = await DatabaseService.sql`SELECT * FROM public."Products" ORDER BY product_class ASC;`;
            //透過product_class分類
            return classify(result, "product_class");
        } catch (e) {
            logger.error(e.message)
        }
    }

    static async getProductById(productID) 
    {
        try 
        {
            const productData = await DatabaseService.sql`SELECT * FROM public."Products" WHERE product_id = ${productID}`;
            return productData;
        } 
        catch (error) 
        {
            logger.error(error.message);
            throw new Error('獲取produc_id失敗');
        }   
        //const productID = await DatabaseService.sql`SELECT * FROM public."Products" ORDER BY product_class ASC;`;
    }
}

export default ProductModel;

