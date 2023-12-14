const omit = require('lodash/omit')
const environment = require('../../environment')

module.exports = (sequelize, DataType) => {
  const estudiante = sequelize.define(
    'estudiante',
    {
      id_estudiante: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
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
      direccion: {
        type: DataType.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fotografia: {
        type: DataType.TEXT,
        allowNull: false,
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
      genero: {
        type: DataType.ENUM('M', 'F', 'O'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fecha_nacimiento: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      semestre: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      estado_civil: {
        type: DataType.ENUM('S', 'C', 'V'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fecha_ingreso: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fecha_egreso: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      id_usuario: {
        type: DataType.INTEGER
      },
    },
    {
      tableName: 'estudiante',
      schema: environment.sharedSchema,
      indexes: [
        {
          unique: true,
          fields: ['codigo', 'email'],
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

  estudiante.associate = models => {
    estudiante.belongsTo(models.programa, {
      foreignKey: 'id_programa',
      as: 'programa',
    })

    const _getAtributos = estudiante.prototype.getAtributos
    estudiante.prototype.getAtributos = async function (...args) {
      let attr = await _getAtributos.apply(this, args)
      if (!attr) {
        attr = await models.atributos_estudiante.create({
          id_estudiante: this.id_estudiante,
        })
        await this.setAtributos(attr)
      }

      return attr
    }

    estudiante.prototype.toJSON = function () {
      return omit(this.get(), ['atributos'])
    }
  }

  return estudiante
}
