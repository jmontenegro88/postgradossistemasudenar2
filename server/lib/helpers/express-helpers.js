const { isObject } = require('lodash')
const environment = require('../../../environment')
const {
  UserInputError,
  InternalServerError,
  AuthenticationError,
} = require('../errors')

function sendErrorResponse(res, err, statusCode = 400) {
  const isInputError = err instanceof UserInputError
  if (!isInputError) {
    if (err instanceof InternalServerError) {
      res.status(500)
    } else if (err instanceof AuthenticationError) {
      res.status(403)
    } else {
      res.status(statusCode)
    }
  }

  if (!err || (environment.production && !isInputError)) {
    res.json({ error: 'Ha ocurrido un error', err })
    return
  }

  if (!(err instanceof Error)) {
    res.json(err)
    return
  }
  const errJson = {}
  if (err.message) {
    errJson.error = err.message
  }
  if (typeof err.errno !== 'undefined') {
    errJson.errno = err.errno
  }
  if (typeof err.code !== 'undefined') {
    errJson.code = err.code
  }
  if (!isInputError) {
    errJson.type = err.name
    errJson.stack = err.stack
  }
  res.json(errJson)
}

async function sendJsonResponse(res, data, statusCode = 200, errorCode = 400) {
  if (typeof data === 'function') {
    try {
      data = data()
    } catch (err) {
      sendErrorResponse(res, err, errorCode)
      return
    }
  }

  if (typeof data === 'undefined') {
    return
  }

  if (!isObject(data) || typeof data.then !== 'function') {
    res.status(statusCode)
    res.json(data)
    return
  }

  return data.then(
    result => {
      if (typeof result === 'undefined') {
        return
      }

      res.status(statusCode)
      res.json(result)
    },
    err => {
      sendErrorResponse(res, err, errorCode)
    }
  )
}

function isQueryTruthy(value) {
  return Boolean(value) && value !== '0'
}

module.exports = {
  sendJsonResponse,
  sendErrorResponse,
  isQueryTruthy,
}
