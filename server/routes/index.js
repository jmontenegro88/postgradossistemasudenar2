const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload())
app.use('/sesion', require('./sesion'))
app.use('/config', require('./config'))

module.exports = app
