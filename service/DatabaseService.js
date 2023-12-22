import postgres from "postgres";
import databaseConfig from "../config/databaseConfig.js";
import logger from "../utils/logger.js";
class DatabaseService {
    static sql = postgres(databaseConfig)
    static async test() {
        try {
            await this.sql`SELECT 1+1`
            logger.info("Database connection successful")
        } catch (error) {
            logger.error("Database connection failed")
        }
        return 
    }
}

export default DatabaseService;