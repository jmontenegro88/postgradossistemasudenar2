module.exports = (sequelize, DataType) => {
  const usuario_rol = sequelize.define(
    'usuario_rol',
    {
      id_usuario: {
        type: DataType.INTEGER,
        primaryKey: true,
      },
      id_rol: {
        type: DataType.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: 'usuario_rol',
    }
  )

  usuario_rol.associate = models => {
    usuario_rol.belongsTo(models.usuario, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    })
    usuario_rol.belongsTo(models.rol, {
      foreignKey: 'id_rol',
      as: 'rol',
    })

    usuario_rol.addScope('defaultScope', {
      include: [
        {
          model: models.rol,
          as: 'rol',
        },
      ]
    })
  }

  return usuario_rol
}
