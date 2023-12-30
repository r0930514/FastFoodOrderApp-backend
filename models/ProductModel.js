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

    /**
     * @async
     * @param {String} productID 
     * @returns {Object} 回傳該產品的資料
     */
    static async getProductById(productID) 
    {
        try {
            const productData = await DatabaseService.sql`SELECT * FROM public."Products" WHERE product_id = ${productID}`;
            return productData;
        } 
        catch (error) {
            logger.error(error.message);
            throw new Error('獲取produc_id失敗');
        }   
    }

    /**
     * 取得產品規格
     * @async
     * @param {String} productID
     * @returns {Object} 回傳該產品的規格
     */
    static async getSpecById(productID) 
    {
        try {
            const specData = await DatabaseService.sql`SELECT "specification_id", "specification_name" FROM public."Products_Specification" WHERE product_id = ${productID};`;
            return specData;
        } 
        catch (error) {
            logger.error(error.message);
            throw 'specData 取得失敗';
        }   
    }
}

export default ProductModel;

