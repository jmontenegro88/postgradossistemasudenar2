const assert = require('assert')
const isObject = require('lodash/isObject')
const pick = require('lodash/pick')
const difference = require('lodash/difference')

const isNull = v => typeof v === 'undefined' || v === null
const specialPattern = new RegExp('[^ A-Za-z\xc0-\xff]*', 'g')
const squeezeWhitespace = str => str.replace(/\s+/g, ' ').trim()
const downwords = new Set([
  'de',
  'del',
  'la',
  'el',
  'los',
  'las',
  'y',
  'para',
  'por',
  'un',
  'una',
])
const capitalizeName = str =>
  str
    .split(/\s+/)
    .map(
      w =>
        w &&
        (downwords.has(w) ? w : w.charAt(0).toLocaleUpperCase() + w.slice(1))
    )
    .join(' ')
    .trim()

function normalizeName(name, special) {
  if (!special) {
    name = name.replace(specialPattern, '')
  }

  name = squeezeWhitespace(name)
  name = capitalizeName(name)
  return name
}

function validateString(v, minLength = 1) {
  assert(typeof v === 'string' && v.length > 0)
  v = v.trim()
  assert(v.length > minLength - 1)
  return v
}

function nameValidator(special) {
  return v => {
    v = validateString(v)
    v = normalizeName(v, special)
    return v
  }
}

function digitValidator(minLength) {
  return v => {
    v = validateString(v)
    assert(/^\d+$/.test(v))

    if (minLength) {
      assert(v.length >= minLength)
    }

    return v
  }
}

const emailPattern = /^\S+?@(?:[^\s.]+\.)+[^\s.]{2,}$/
function validateEmail(v) {
  v = validateString(v)
  assert(emailPattern.test(v))
  return v.toLocaleLowerCase()
}

const inputValidator = validators => {
  const keys = Object.keys(validators)
  const validator = (input, arr, _keys) => {
    _keys = _keys || keys
    assert(isObject(input))
    input = pick(input, _keys)

    for (const key of _keys) {
      let v = validators[key]
      if (!v) {
        continue
      }

      let fieldName = key
      if (Array.isArray(v)) {
        ;[v, fieldName] = v
      }

      let r
      try {
        r = v(input[key])
      } catch (err) {
        if (arr && err instanceof assert.AssertionError) {
          arr.push(fieldName)
          continue
        } else {
          throw err
        }
      }

      if (typeof r !== 'undefined') {
        input[key] = r
      }
    }

    return input
  }

  for (const key of keys) {
    validator[key] = validators[key]
  }

  return validator
}

const participanteValidator = inputValidator({
  nombres: nameValidator(),
  apellidos: nameValidator(),
  institucion: [nameValidator(true), 'institución'],
  programa: nameValidator(true),
  dni: [digitValidator(), 'DNI'],
  email: [validateEmail, 'e-mail'],
  pass: [v => validateString(v, 8), 'contraseña'],
  telefono: [v => validateString(v), 'teléfono'],
  pos_admin: v => (typeof v !== 'undefined' ? !!v : v),
})

const normalize = {
  participante: (input, badFieldArray, existing) => {
    assert(isObject(input))
    if (existing) {
      let id = input.id_participante
      assert(id)
      id = Number(id)
      assert(id)
      assert((id | 0) === id)
      input.id_participante = id
    }

    input = participanteValidator(input, badFieldArray)
    return input
  },

  asistencia: (input, badFieldArray) => {
    assert(isObject(input))
    assert(!isNull(input.id_evento), 'No se ha especificado el evento')
    assert(
      !isNull(input.participante || input.id_participante),
      'No se ha especificado el participante'
    )

    if (input.participante) {
      input.participante = participanteValidator(
        input.participante,
        badFieldArray,
        difference(Object.keys(participanteValidator), ['pass'])
      )
    }

    return input
  },
}

module.exports = normalize
