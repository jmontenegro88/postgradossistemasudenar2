const omit = require('lodash/omit')
const environment = require('../../environment')

module.exports = (sequelize, DataType) => {
  const docente = sequelize.define(
    'docente',
    {
      id_docente: {
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
      direccion: {
        type: DataType.STRING(200),
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
      formacion: {
        type: DataType.ENUM('PRE', 'POS'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      areas: {
        type: DataType.ENUM('IS', 'TL', 'DB'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: 'docente',
      schema: environment.sharedSchema,
      indexes: [
        {
          unique: true,
          fields: ['email'],
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

  docente.associate = models => {
    // docente.hasMany(models.docente_programa, {
    //   foreignKey: 'id_docente',
    //   as: 'programas',
    // })

    const _getAtributos = docente.prototype.getAtributos
    docente.prototype.getAtributos = async function (...args) {
      let attr = await _getAtributos.apply(this, args)
      if (!attr) {
        attr = await models.atributos_docente.create({
          id_docente: this.id_docente,
        })
        await this.setAtributos(attr)
      }

      return attr
    }

    docente.prototype.toJSON = function () {
      return omit(this.get(), ['atributos'])
    }
  }

  return docente
}
