import logger from "../utils/logger.js"
import DatabaseService from "../services/DatabaseService.js"
class CardModel{
    static async test(){
        logger.error("test")
        DatabaseService.test()
    }
    //1. 用會員ID去搜尋這個會員的會員卡ID

    //2. 會員有多少點

    //3. 會員加點數(期限是1年)

    //4. 會員扣點數

    //4.5 會員卡明細

    //!! 下面:如果可以的話 !!

    //5. 用會員ID去註冊會員卡(一個會員只能有一張會員卡)
    //6. 用會員ID去刪掉他的會員卡
}

export default CardModel
