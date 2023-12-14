const assert = require('assert')
const normalize = require('../../shared/normalize')
const { sendJsonResponse } = require('../lib/helpers/express-helpers')
const { UserInputError } = require('../lib/errors')

function inputNormalize(normalizerName, ...args) {
  const normalizer = normalize[normalizerName]
  if (typeof normalizer !== 'function') {
    throw new Error(`Invalid normalizer ${normalizerName}`)
  }

  return async (req, res, next) => {
    let validInput = false
    await sendJsonResponse(res, () => {
      const arr = []
      try {
        req.body = normalizer(req.body, arr, ...args)
      } catch (err) {
        if (err instanceof assert.AssertionError) {
          throw UserInputError.ERR_INVALID_INPUT(err.message)
        }

        throw err
      }

      if (arr.length > 0) {
        throw UserInputError.ERR_INVALID_INPUT(
          `Por favor verifique los siguientes campos: ${arr.join(', ')}.`
        )
      }

      validInput = true
    })

    if (validInput) {
      next()
    }
  }
}

module.exports = {
  inputNormalize,
}
