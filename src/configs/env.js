const dotenv = require('dotenv')

dotenv.config({
    path: process.env.NODE_ENV === 'test' ?
        '.env.test' :
        process.env.NODE_ENV === 'development' ?
        '.env.development' :
        '.env'
})

module.exports = {
    app: {
        host: process.env.HOST,
        port: process.env.PORT
    },
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT
    },
    env: process.env.NODE_ENV,
    secret: process.env.APP_SECRET,
    salt: process.env.SALT
}
