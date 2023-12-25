import bcrypt from "bcrypt"
import logger from "../utils/logger.js"

class HashService{
    static saltRounds = 10

    /**
     * 放入要hash的密碼
     * @async
     * @param {String} pwd 
     * @returns {String} Hash值
     */
    static async hashPassword(pwd){
        return await bcrypt.hash(pwd, this.saltRounds)    
    }

    /**
     * 確認傳來的密碼是否與Hash相同
     * @async
     * @param {String} pwd 
     * @param {String} hashedPwd 
     * @returns {Boolean} 是否相同
     */
    static async comparePassword(pwd, hashedPwd){
        return await bcrypt.compare(pwd, hashedPwd)
    }
}

export default HashService