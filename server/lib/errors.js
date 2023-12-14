const { isObject } = require('lodash')

function defineError(name, fn, codes) {
  const constructor = function (message, ...args) {
    const err = new Error(message)
    Reflect.setPrototypeOf(err, constructor.prototype)
    if (fn) {
      fn.call(err, ...args)
    }
    return err
  }

  Object.defineProperty(constructor, 'name', {
    configurable: true,
    writable: false,
    enumerable: false,
    value: name,
  })
  Object.defineProperty(constructor.prototype, 'name', {
    configurable: true,
    writable: false,
    enumerable: false,
    value: name,
  })
  Object.setPrototypeOf(constructor.prototype, Error.prototype)

  if (!codes) {
    return constructor
  }
  if (Array.isArray(codes)) {
    for (let i = 0; i < codes.length; i++) {
      const [code, defaultMessage] = codes[i]
      constructor[code] = function (message, ...args) {
        const err = constructor(message || defaultMessage, ...args)
        err.errno = i
        err.code = code
      }
    }
  } else if (isObject(codes)) {
    for (const code of Object.keys(codes)) {
      constructor[code] = function (message, ...args) {
        const err = new constructor(message || codes[code], ...args)
        err.code = code
        return err
      }
    }
  }
  return constructor
}

const UserInputError = defineError('UserInputError', null, {
  ERR_INVALID_INPUT: 'Solicitud inválida',
  ERR_SHORT_PASSWORD: 'La contraseña debe contener al menos 8 carácteres',
  ERR_UNKNOWN_EMAIL: 'Correo electrónico no registrado',
  ERR_WRONG_PASSWORD: 'Contraseña incorrecta',
  ERR_DUPLICATE_EMAIL:
    'El correo electrónico ingresado ya se encuentra registrado',
  ERR_NO_TOKEN: 'Es necesario el token de autenticación',
  ERR_INVALID_TOKEN: 'EL token no es valido o ha caducado',
  ERR_NO_PASSWORD: 'Se requiere de una contraseña',
})

const InternalServerError = defineError('InternalServerError')
const AuthenticationError = defineError('AuthenticationError', null, {
  ERR_DISALLOWED_ACTION: 'Acción no permitida',
})
const BadRequestError = defineError('BadRequestError', null, {
  ERR_DISABLED_FEATURE: 'Característica no disponible',
})

module.exports = {
  defineError,
  UserInputError,
  InternalServerError,
  AuthenticationError,
  BadRequestError,
}
