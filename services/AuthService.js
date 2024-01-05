import jsonwebtoken from "jsonwebtoken";
import authConfig from "../config/authConfig.js";
import logger from "../utils/logger.js";
class AuthService {
  /**
   * 
   * @param {String} username 使用者名稱 
   * @returns {String | null} 回傳token or null
   */
    static generateToken(username) {
        try {
            return jsonwebtoken.sign({username: username}, authConfig.secret, {
                expiresIn: "7d", //token有效期限
            });
        }catch(err){
            logger.warn(err);
            return null;
        }
    }

    /**
     * 
     * @param {String} token 輸入token
     * @returns {import("jsonwebtoken").JwtPayload} 回傳解碼訊息
     */
    static verifyToken(token) {
        try {
            const verify = jsonwebtoken.verify(token, authConfig.secret);
            return verify
        }catch(err){
            logger.warn(err);
            return null;
        }
    }
}

export default AuthService;