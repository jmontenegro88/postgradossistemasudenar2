require('dotenv').config()
const inquirer = require('inquirer')
const chalk = require('chalk')
const entries = require('lodash/entries')
const { sequelize } = require('./server/models')
const configService = require('./server/services/config')
require('./lib/sigint')()

const prompt = inquirer.createPromptModule()

async function promptFlags(dict, message, source) {
  const choices = entries(dict).map(([field, name]) => {
    return {
      name,
      value: field,
      checked: source ? source[field] : false,
    }
  })

  const { flags } = await prompt([
    {
      name: 'flags',
      type: 'checkbox',
      message,
      choices,
    },
  ])

  const result = {}
  for (const key of Object.keys(dict)) {
    result[key] = flags.includes(key)
  }

  return result
}

async function setUserPermissions() {
  const { dni } = await prompt([
    {
      type: 'input',
      message: 'Identificación',
      name: 'dni',
    },
  ])

  if (!dni) {
    return
  }

  let participante
  try {
    participante = await participanteService.getByDni(dni)
  } catch (err) {
    throw { error: err, what: 'No fue posible consultar el usuario' }
  }

  if (!participante) {
    throw { what: 'El usuario solicitado no existe' }
  }

  console.log(`Nombre: ${participante.nombres} ${participante.apellidos}`)
  const atributos = await participante.getAtributos()
  const update = await promptFlags(
    participanteService.PermissionAttributes,
    'Permisos:',
    atributos
  )
  try {
    atributos.set(update)
    await atributos.save()
    console.info(chalk.green('Usuario actualizado'))
  } catch (err) {
    throw { error: err, what: 'No fue posible actualizar datos de usuario' }
  }
}

async function booleanConfig() {
  const c = await configService.get()
  const config = await promptFlags(
    configService.descriptions,
    'Funcionalidades:',
    c
  )

  try {
    await configService.writeConfig(config)
    console.info(chalk.blue('Configuración actualizada'))
  } catch (err) {
    throw {
      error: err,
      what: 'No fue posible actualizar la configuración en la base de datos',
    }
  }
}

async function menu() {
  while (true) {
    const choices = [
      {
        name: 'Permisos de usuario',
        value: setUserPermissions,
      },
      {
        name: 'Funcionalidades',
        value: booleanConfig,
      },
      {
        name: 'Salir',
        value: null,
      },
    ]
    const { option } = await prompt({
      type: 'list',
      name: 'option',
      message: 'Configuración:',
      choices,
    })

    if (!option) {
      break
    }

    try {
      await option()
    } catch (err) {
      if (!err) {
        continue
      }

      if (err instanceof Error) {
        console.error(chalk.red(err))
      } else {
        const { error, what } = err
        if (error) {
          console.error(chalk.red(error))
        }
        if (what) {
          console.error(chalk.red(`Error: ${what}`))
        }
      }
    }
  }
}

sequelize.options.logging = false
sequelize
  .authenticate()
  .then(menu, err => {
    console.error(chalk.red(err))
    console.error(chalk.red('Error: Falló autenticación en base de datos'))
  })
  .finally(() => sequelize.close())
