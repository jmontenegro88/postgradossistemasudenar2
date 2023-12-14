const { isObject } = require('lodash')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const { UserInputError } = require('../lib/errors')
const { sendJsonResponse } = require('../lib/helpers/express-helpers')
const { verificarToken } = require('../middleware/autenticacion')
const authService = require('../services/auth')

router.post('/login', (req, res) => {
  sendJsonResponse(res, async () => {
    const { body } = req
    if (!isObject(body) || !body.email || !body.password) {
      throw new UserInputError.ERR_INVALID_INPUT()
    }
    body.email = body.email.toLocaleLowerCase()
    const usuario = await authService.findUserByEmail(body.email)
    if (!usuario) {
      throw new UserInputError.ERR_UNKNOWN_EMAIL()
    }
    // const result = await bcrypt.compare(body.password, usuario.pass)
    const result = body.password === usuario.pass
    if (!result) {
      throw new UserInputError.ERR_WRONG_PASSWORD()
    }
    const token = authService.createToken(usuario, '1d')
    console.log(token)
    return {
      token,
      roles: usuario.roles && usuario.roles.length>0
        ? usuario.roles.map(r => r.rol) : []
    }
  })
})

router.post('/autenticar', verificarToken, (req, res) => {
  const { usuario, sesion } = req
  if (sesion) {
    const data = { usuario }
    if (usuario.atributos && usuario.atributos.admin) {
      data.admin = true
    }
    if (usuario.atributos && usuario.atributos.revisor) {
      data.revisor = true
    }
    sendJsonResponse(res, data)
  } else {
    sendJsonResponse(res, { valido: !!usuario })
  }
})

module.exports = router
