import "dotenv/config"
const authConfig = {
    secret: process.env.AUTH_SECRET || "secret",
    expiresIn: process.env.AUTH_EXPIRES_IN || "1d"
}

export default authConfig