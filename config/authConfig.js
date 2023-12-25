import "dotenv/config"
const authConfig = {
    secret: process.env.AUTH_SECRET || "secret"
    //expiresIn: process.env.AUTH_EXPIRES_IN || "1d",
    //expiresIn: 要放什麼 : "1d" 一天

}

export default authConfig