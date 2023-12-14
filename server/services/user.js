const { models } = require("../models");

module.exports = {
  PermissionAttributes: {
    admin: "Administrador",
    revisor: "Revisor",
  },

  getAll() {
    return models.usuario.findAll();
  },

  findById(id, attributes) {
    return models.usuario.findByPk(id, { attributes });
  },

  findByEmail(email) {
    console.log(models.usuario)
    return models.usuario.findOne({
      where: { email },
    });
  },

  async getByDni(dni, attributes) {
    let p = await models.usuario.findOne({
      where: { dni },
      attributes
    });
    return p;
  },

  getByEmail(email) {
    return models.usuario.findOne({ where: { email } });
  },

  createMany(elements) {
    return models.usuario.bulkCreate(elements);
  },
};
