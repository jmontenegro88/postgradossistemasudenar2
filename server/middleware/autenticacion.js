const authService = require('../services/auth')
const { sendJsonResponse } = require('../lib/helpers/express-helpers')
const { AuthenticationError, UserInputError } = require('../lib/errors')

async function authRequest(req) {
  const authHeader = req.headers.authorization
  if (!authHeader && !req.query.token) {
    return
  }

  const tokenMatch = String(authHeader).match(/^bearer\s+(.+)$/i)
  const token = tokenMatch ? tokenMatch[1] : req.query.token
  if (!token) {
    return
  }

  const data = await authService.verifyToken(token)
  if (!data) {
    return
  }

  const { usuario, sesion } = data
  req.token = token
  req.usuario = usuario
  req.sesion = !!sesion
}

function sessionMiddleware(...funcs) {
  return async (req, res, next) => {
    await authRequest(req)
    sendJsonResponse(res, async () => {
      let last = false
      let lastfn = () => (last = true)

      for (const fn of funcs) {
        let r = fn(req, lastfn)
        if (r instanceof Promise) {
          r = await r
        }

        if (!r) {
          throw new AuthenticationError()
        }

        if (last) {
          break
        }
      }

      next()
    })
  }
}

const verificarToken = sessionMiddleware(() => true)
const verificarTokenSesion = sessionMiddleware(
  ({ usuario, sesion }) => usuario && sesion
)
const verificarTokenTemporal = sessionMiddleware(
  ({ usuario, sesion }) => usuario && !sesion
)
const verificarTokenAdmin = sessionMiddleware(
  ({ usuario, sesion }) => usuario && sesion && usuario.atributos && usuario.atributos.admin
)

module.exports = {
  verificarToken,
  verificarTokenSesion,
  verificarTokenTemporal,
  verificarTokenAdmin,
}
