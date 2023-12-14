const { noop } = require('lodash')
const { sendErrorResponse } = require('../lib/helpers/express-helpers')
const { BadRequestError } = require('../lib/errors')
const configService = require('../services/config')

function configMiddleware(callback, fallback) {
  if (typeof callback !== 'function') {
    if (Array.isArray(callback)) {
      const keys = callback
      callback = config => keys.every(key => config[key])
    } else {
      const key = callback
      callback = config => Boolean(config[key])
    }
  }

  return async (req, res, next) => {
    const config = await configService.getInstance().catch(noop)
    if (!config || !callback(config)) {
      if (typeof fallback === 'function') {
        fallback(res, () => next('route'), req)
      } else {
        next('route')
      }
    } else {
      next()
    }
  }
}

function featureMiddleware(features) {
  return configMiddleware(features, res =>
    sendErrorResponse(res, BadRequestError.ERR_DISABLED_FEATURE())
  )
}

module.exports = {
  configMiddleware,
  featureMiddleware,
}
