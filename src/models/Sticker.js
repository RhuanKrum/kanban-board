const Sequelize = require('sequelize')
const db = require('../config/database')

const Sticker = db.define('sticker', {
  text: {
    type: Sequelize.STRING
  },
  laneId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Sticker