import logger from "../utils/logger.js"
import DatabaseService from "../services/DatabaseService.js"

//CardModel.js & test.js 6個功能

class CardModel
{
    static async test()
    {
        logger.info("test")
        DatabaseService.test()
    }
    //1. 用會員ID去搜尋這個會員的會員卡ID
    static async searchMemberCardByMemberID(memberID)
    {
        try
        {
            const query = await DatabaseService.sql`SELECT point_card_id FROM public."Points_Card" WHERE member_id = ${memberID}`;
            const memberCard = query;
            return memberCard;
        }
        catch (error)
        {
            logger.error(error);
            throw new Error('查詢會員卡失敗');
        }
    }
    //2. 會員有多少點
    static async getMemberPoints(memberID) 
    {
        try 
        {
            const query = await DatabaseService.sql`SELECT point_counts FROM public."Point_Details" WHERE member_id = ${memberID}`;
            const memberPoints = query;
            return memberPoints;
        } 
        catch (error)
        {
            logger.error(error);
            throw new Error('查詢會員點數失敗');
        }
    }

    //3. 會員加點數(期限是1年)
    static async addPointsToMember(memberID, pointsToAdd)
    {
        /* 插入当前日期时间
        參考支援代碼(日期延後1年)
            const date = new Date();
            const datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            const sql = `INSERT INTO table_name (col1, col2, col3) VALUES ("value1", "value2", "${datetime}")`;*/
        try
        {
            logger.info("addPointsToMember");
            const currentDate = new Date();
            const nextYear = new Date(currentDate.getFullYear()+1,currentDate.getMonth(),currentDate.getDate());
            const query = await DatabaseService.sql`UPDATE Point_Details SET point_counts = point_counts + ${pointsToAdd}, point_expired_date = ${nextYear.toISOString().slice(0,10)} WHERE member_id = ${memberID}`;
            await query;
        } 
        catch 
        (error)
        {
            logger.error(error);
            throw new Error('增加會員點數失敗');
        }
    }
    //4. 會員扣點數
    static async deductPointsFromMember(memberID, pointsToDeduct)
    {
        try 
        {
            logger.info("deductPointsFromMember");

            const query = await DatabaseService.sql`UPDATE Point_Details SET point_counts = point_counts - ${pointsToDeduct}WHERE member_id = ${memberID} AND point_counts >= ${pointsToDeduct}`;
            const rowsAffected = await query;
            if (rowsAffected<=0) 
            {
                throw new Error('扣除會員點數失敗，點數不足或會員不存在');
            }
        } 
        catch (error) 
        {
            logger.error(error);
            throw new Error('扣除會員點數失敗');
        }
    }

    //4.5 會員卡明細
    static async point_DetalsFromMember(memberID)
    {
        try
        {
            logger.info("point_DetalsFromMember")
            const query = await DatabaseService.sql`SELECT * FROM public."Point_Details" WHERE point_id = ${point_id}`;
            const pointDetals = await query
            return pointDetals
        }
        catch(error)
        {
            logger.error(error);
            throw new Error('會員卡明細顯示失敗');
        }
    }

    //!! 下面:如果可以的話 !!

    //5. 用會員ID去註冊會員卡(一個會員只能有一張會員卡)
    static async oneCardOneMember()
    {
        try
        {
            logger.info("oneCardOneMember")
            const query = ``
            const CardMember = await query
            return CardMember
        }
        catch(error)
        {
            logger.error(error);
            throw new Error('沒有限制到一個會員只能使用一個會員卡');
            
            
        }
    }
    //6. 用會員ID去刪掉他的會員卡
    

}

export default CardModel
