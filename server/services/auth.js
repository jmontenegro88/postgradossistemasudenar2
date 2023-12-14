const assert = require('assert')
const LRU = require('lru-cache')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { aesEncrypt, aesDecrypt } = require('../lib/crypto')
const { models } = require('../models')
const userService = require('../services/user')

const JWT_SECRET = Buffer.from(process.env.JWT_SECRET, 'hex')
const AES_KEY = Buffer.from(process.env.AES_KEY, 'hex')

module.exports = {
  _cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 60,
  }),

  async findUserByEmail(email) {
    const usuario = await userService.findByEmail(email)
    if (usuario && usuario.pass) {
      return usuario
    } else {
      return null
    }
  },

  createToken(instance, expiresIn, disposable) {
    const typePrefix = disposable ? 'D' : 'S'
    const userPrefix = 'P'
    const id = String(instance.id_usuario)
    const data = `${typePrefix}${userPrefix}${id.padStart(4, '0')}`
    return jwt.sign(
      {
        user: aesEncrypt(data, AES_KEY),
      },
      JWT_SECRET,
      { expiresIn }
    )
  },

  async verifyToken(token) {
    const cached = this._cache.get(token)
    try {
      const data = jwt.verify(token, JWT_SECRET)
      if (cached) {
        return cached
      }
      assert(data)
      let { user } = data
      assert(user)
      user = aesDecrypt(user, AES_KEY, 'utf8')
      const [, typePrefix, userPrefix, id] = user.match(/^(\w)(\w)0*(\d+)$/)
      let usuario
      if (typePrefix === 'D') {
        await models.blacklist_token.verify(token)
      }
      if (userPrefix === 'P') {
        usuario = await userService.findById(id)
      }
      assert(usuario)
      const result = {
        usuario,
        sesion: typePrefix === 'S',
      }
      this._cache.set(token, result)
      return result
    } catch (err) {
      if (cached) {
        delete this._cache.del(token)
      }
      return null
    }
  },

  disposeToken(token) {
    if (this._cache.has(token)) {
      this._cache.del(token)
    }
    return models.blacklist_token.blacklist(token, JWT_SECRET)
  },

  async updatePassword(instance, pass) {
    pass = await bcrypt.hash(pass, 10)
    return instance.update({ pass })
  },
}
