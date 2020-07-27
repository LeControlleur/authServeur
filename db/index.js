require("dotenv").config()

const { Sequelize } = require("sequelize")
const config = require("../config")[process.env.NODE_ENV]


const sequelize = new Sequelize(config.serverDb, config.userDb, config.passwordDb, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})



module.exports = sequelize