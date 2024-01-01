import DatabaseSercie from '../services/DatabaseService.js';
import logger from '../utils/logger.js';
class UserModel {
    /**
     * 檢查帳號密碼是否存在並回傳正確密碼
     * @param {String} userphone 
     * @returns {String | Boolean} 回傳密碼或false(沒有此帳號)
     */
    static async checkUserExist(userphone) {
        try {
            let result = await DatabaseSercie.sql`SELECT * FROM public."Member" WHERE member_phone = ${userphone};`
            if (result.length == 0) throw new Error("No such user");
            return result[0].member_password;
        } catch (error) {
            logger.warn(error.message);
            return false;
        }
    }

    /**
     * 註冊
     * @param {String} name 
     * @param {String} userphone 
     * @param {String} password 
     * @returns {Boolean}
     */
    static async register(name, userphone, password) {
        try {
            await DatabaseSercie.sql`INSERT INTO public."Member" (member_name, member_phone, member_password) VALUES (${name.toString()}, ${userphone.toString()}, ${password.toString()});`
            return true;
        } catch (error) {
            logger.error(error.message);
            return false;
        }
    }

    /**
     * 回傳用戶ID
     * @param {String} userphone 
     * @returns {String} 回傳用戶ID
     */
    static async returnUserID(userphone) {
        try {
            let result = await DatabaseSercie.sql`SELECT member_id FROM public."Member" WHERE member_phone = ${userphone};`
            if (result.length == 0) throw new Error("No such user");
            return result[0].member_id;
        } catch (error) {
            logger.warn(error.message);
            throw error;
        }
    }
}

export default UserModel;