module.exports = (sequelize, DataType) => {
  const docente_programa = sequelize.define(
    'docente_programa',
    {
      id_docente: {
        type: DataType.INTEGER,
        primaryKey: true,
      },
      id_programa: {
        type: DataType.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: 'docente_programa',
    }
  )

  docente_programa.associate = models => {
    docente_programa.belongsTo(models.docente, {
      foreignKey: 'id_docente',
      as: 'docente',
    })
    docente_programa.belongsTo(models.programa, {
      foreignKey: 'id_programa',
      as: 'programa',
    })
  }

  return docente_programa
}
