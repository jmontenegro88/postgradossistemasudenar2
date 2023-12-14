const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const config = require('../db/config')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.params
)

let models = {}

fs.readdirSync(__dirname).forEach(filename => {
  if (
    filename !== 'index.js' &&
    filename[0] !== '.' &&
    filename[filename.length - 1] !== '~'
  ) {
    const model = sequelize.import(path.join(__dirname, filename))
    models[model.name] = model
  }
})

Object.keys(models).forEach(key => {
  if (models[key].associate) {
    models[key].associate(models)
  }
})

module.exports = {
  models,
  sequelize,
  Sequelize,
}
