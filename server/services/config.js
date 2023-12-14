const { pick, difference, intersection } = require('lodash')
const { CronJob } = require('cron')
const {
  models: { configuracion },
} = require('../models')

const configService = {
  keys: difference(
    Object.keys(configuracion.tableAttributes),
    configuracion.primaryKeyAttributes
  ),
  clientKeys: configuracion.CLIENT_KEYS,
  descriptions: {
    actualizar_datos: 'Actualización de datos de póster',
    actualizar_video: 'Actualización de video y plantilla de póster',
    certificados: 'Descarga de certificados',
    evaluacion: 'Evaluación de pósters',
    registrar_poster: 'Registro de pósters',
    talleres: 'Inscripción a talleres',
  },

  getInstance() {
    return configuracion
      .findByPk(configuracion.INSTANCE_ID)
      .then(config => config || configuracion.create())
  },

  async writeConfig(config) {
    const instance = await this.getInstance()
    instance.set(pick(config, this.keys))
    return instance.save()
  },

  set(prop, val) {
    return this.writeConfig({ [prop]: val })
  },

  async get(props) {
    const instance = await this.getInstance()
    const values = instance.get()
    if (!props) {
      return pick(values, this.keys)
    } else if (Array.isArray(props)) {
      return pick(values, intersection(props, this.keys))
    } else {
      return values[props] || null
    }
  },

  createConfigJob(time, config) {
    if (time instanceof Date) {
      if (time.getTime() <= Date.now()) {
        return null
      }
    }

    return new CronJob({
      cronTime: time,
      start: true,
      onTick: () => this.writeConfig(config),
    })
  },
}

module.exports = configService
