const LRU = require('lru-cache')
const { models, sequelize } = require("../models");

module.exports = {
  _cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 60,
  }),

  create(data) {
    return new Promise(async (resolve, reject) => {
      const t = await sequelize.transaction();
      try {
        const docente = await models.docente.create(data, {
          transaction: t,
        });
        await t.commit();
        resolve(assign(data, docente.get()));
      } catch (error) {
        console.log(error);
        await t.rollback();
        reject(error);
      }
    });
  },
}
