require('dotenv').config()
const chalk = require('chalk')
const { sequelize } = require('./server/models')

let exitStatus = 0

sequelize
  .sync({ force: true })
  .then(
    () => {
      console.log(chalk.green('Database was successfully updated'))
    },
    err => {
      console.error(err)
      console.log(chalk.red("Couldn't update database"))
      exitStatus = 1
    }
  )
  .finally(async () => {
    await sequelize.close()
    process.exit(exitStatus)
  })
