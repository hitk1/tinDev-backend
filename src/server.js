const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

mongoose.connect('mongodb://127.0.0.1:27017/omnistack8', { useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    console.log('Banco de dados conectado')
})

server.use(cors())      //Garante que qualquer Ip possa acessar essa API
server.use(express.json())  //Configura o Express para "entender" JSON
server.use(routes)

server.listen(3333)