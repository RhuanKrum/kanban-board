const Sequelize = require('sequelize')

const db = new Sequelize('postgres', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

db.sync()

module.exports = db