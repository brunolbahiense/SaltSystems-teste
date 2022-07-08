const express = require('express')
const routes = express()
const { postForm } = require('./controllers')


routes.post('/form', postForm)

module.exports = routes