module.exports = (sequelize, DataType) => {
  const INSTANCE_ID = 1
  const configuracion = sequelize.define(
    'configuracion',
    {
      id_configuracion: {
        type: DataType.INTEGER,
        primaryKey: true,
        defaultValue: INSTANCE_ID,
        validate: {
          allowSingleOne(v) {
            return v === INSTANCE_ID
          },
        },
      },
      certificados: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      talleres: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      actualizar_datos: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      actualizar_video: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      registrar_poster: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      evaluacion: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
    },
    {
      tableName: 'configuracion',
    }
  )

  configuracion.INSTANCE_ID = INSTANCE_ID
  configuracion.CLIENT_KEYS = [
    'certificados',
    'talleres',
    'actualizar_datos',
    'actualizar_video',
    'registrar_poster',
    'evaluacion',
  ]

  return configuracion
}
