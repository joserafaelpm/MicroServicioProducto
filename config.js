module.exports = {
    api: {
        port: process.env.API_PORT || 8005,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'HAXs8Ccs9i',
        password: process.env.MYSQL_PASS || 'uxtO1Eu50H',
        database: process.env.MYSQL_DB || 'HAXs8Ccs9i',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
    }
}