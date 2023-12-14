const omit = require('lodash/omit')
const environment = require('../../environment')

module.exports = (sequelize, DataType) => {
  const rol = sequelize.define(
    'rol',
    {
      id_rol: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataType.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descripcion: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'rol',
      schema: environment.sharedSchema,
      indexes: [
        {
          unique: true,
          fields: ['codigo', 'descripcion'],
        },
      ],
      hooks: {
        afterCreate(instance, { transaction }) {
          instance.codigo = instance.codigo.toUpperCase()
          return instance.save({ transaction })
        },
      },
    }
  )

  rol.associate = models => {
    rol.hasMany(models.usuario_rol, {
      foreignKey: 'id_rol',
      as: 'roles',
    })
    const _getAtributos = rol.prototype.getAtributos
    rol.prototype.getAtributos = async function (...args) {
      let attr = await _getAtributos.apply(this, args)
      if (!attr) {
        attr = await models.atributos_rol.create({
          id_rol: this.id_rol,
        })
        await this.setAtributos(attr)
      }

      return attr
    }

    rol.prototype.toJSON = function () {
      return omit(this.get(), ['atributos'])
    }
  }

  return rol
}
