const crypto = require('crypto')

function aesEncrypt(data, key, encoding = 'hex') {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = Buffer.concat([iv, cipher.update(data), cipher.final()])
  if (encoding) {
    encrypted = encrypted.toString(encoding)
  }
  return encrypted
}

function aesDecrypt(encrypted, key, encoding) {
  if (typeof encrypted === 'string') {
    encrypted = Buffer.from(encrypted, 'hex')
  }
  const [iv, data] = [encrypted.slice(0, 16), encrypted.slice(16)]
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = Buffer.concat([decipher.update(data), decipher.final()])
  if (encoding) {
    decrypted = decrypted.toString(encoding)
  }
  return decrypted
}

module.exports = {
  aesEncrypt,
  aesDecrypt,
}
