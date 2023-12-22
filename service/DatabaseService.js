import postgres from "postgres";
import databaseConfig from "../config/databaseConfig.js";
import logger from "../utils/logger.js";

/**
 * Database service
 * @class
 * @static sql
 */
class DatabaseService {
    static sql = postgres(databaseConfig)
    static async test() {
        await this.sql`SELECT 1+1`
            .then(() => {
                logger.info("Database connection successful")
            })
            .catch((error) => {
                logger.error("Database connection failed")
                logger.error(error.message)
                logger.info(databaseConfig)
            })
    }
}

export default DatabaseService;