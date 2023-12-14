const omit = require('lodash/omit')
const environment = require('../../environment')

module.exports = (sequelize, DataType) => {
  const usuario = sequelize.define(
    'usuario',
    {
      id_usuario: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombres: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      apellidos: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dni: {
        type: DataType.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      telefono: {
        type: DataType.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      pass: {
        type: DataType.STRING(60),
        allowNull: true,
      },
    },
    {
      tableName: 'usuario',
      schema: environment.sharedSchema,
      indexes: [
        {
          unique: true,
          fields: ['email', 'dni'],
        },
      ],
      hooks: {
        afterCreate(instance, { transaction }) {
          instance.email = instance.email.toLocaleLowerCase()
          return instance.save({ transaction })
        },
      },
    }
  )

  usuario.associate = models => {
    usuario.hasMany(models.usuario_rol, {
      foreignKey: 'id_usuario',
      as: 'roles',
    })

    usuario.addScope('defaultScope', {
      include: [
        {
          model: models.usuario_rol,
          as: 'roles',
        },
      ]
    })

    const _getAtributos = usuario.prototype.getAtributos
    usuario.prototype.getAtributos = async function (...args) {
      let attr = await _getAtributos.apply(this, args)
      if (!attr) {
        attr = await models.atributos_usuario.create({
          id_usuario: this.id_usuario,
        })
        await this.setAtributos(attr)
      }

      return attr
    }

    usuario.prototype.toJSON = function () {
      return omit(this.get(), ['atributos'])
    }
  }

  return usuario
}
