import "dotenv/config"

const databaseConfig = {
    host: process.env.DB_HOST || "localhost" ,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || "postgres",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
}


export default databaseConfig