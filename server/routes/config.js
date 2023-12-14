const express = require('express')
const router = express.Router()
const { sendJsonResponse } = require('../lib/helpers/express-helpers')
const configService = require('../services/config')

router.post('/client', (_req, res) => {
  sendJsonResponse(res, () => configService.get(configService.clientKeys))
})

module.exports = router
