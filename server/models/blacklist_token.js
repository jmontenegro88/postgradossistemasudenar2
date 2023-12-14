const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataType) => {
  const blacklist_token = sequelize.define(
    'blacklist_token',
    {
      token: {
        type: DataType.STRING,
        primaryKey: true,
      },
      exp: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'blacklist_token',
      hooks: {
        afterCreate(instance, { transaction }) {
          const { exp } = instance
          if (!(exp.getTime() > Date.now())) {
            return instance.destroy({ transaction })
          }
        },
      },
    }
  )

  blacklist_token.blacklist = async (token, key) => {
    const data = jwt.verify(token, key)
    if (!data || typeof data.exp !== 'number') {
      throw new Error('Token sin tiempo de expiración')
    }
    const exp = new Date(1000 * data.exp)
    if (isNaN(exp.getTime())) {
      throw new Error('Tiempo de expiración inválido')
    }
    return blacklist_token.create({ token, exp })
  }

  blacklist_token.verify = token => {
    return blacklist_token.findByPk(token).then(t => {
      if (t) {
        throw new Error('Token en blacklist')
      }
    })
  }

  blacklist_token.purge = () => {
    return blacklist_token.destroy({
      where: {
        exp: {
          [Op.lte]: new Date(),
        },
      },
    })
  }

  return blacklist_token
}
