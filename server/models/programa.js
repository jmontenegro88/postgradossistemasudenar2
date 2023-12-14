const omit = require('lodash/omit')
const environment = require('../../environment')

module.exports = (sequelize, DataType) => {
  const programa = sequelize.define(
    'programa',
    {
      id_programa: {
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
      nombre: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descripcion: {
        type: DataType.STRING(300),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      logo: {
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
      lineas_trabajo: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      fecha_registro: {
        type: DataType.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      numero_registro: {
        type: DataType.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      archivo_registro: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'programa',
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

  programa.associate = models => {
    programa.hasMany(models.estudiante, {
      foreignKey: 'id_programa',
      as: 'estudiantes',
    })
    // programa.hasMany(models.docente_pragrama, {
    //   foreignKey: 'id_programa',
    //   as: 'docentes',
    // })

    const _getAtributos = programa.prototype.getAtributos
    programa.prototype.getAtributos = async function (...args) {
      let attr = await _getAtributos.apply(this, args)
      if (!attr) {
        attr = await models.atributos_programa.create({
          id_programa: this.id_programa,
        })
        await this.setAtributos(attr)
      }

      return attr
    }

    programa.prototype.toJSON = function () {
      return omit(this.get(), ['atributos'])
    }
  }

  return programa
}
