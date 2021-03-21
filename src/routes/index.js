const Joi = require('joi')
const { status } = require('../api/controllers/app.controller')
const transition = require('./transition')
const user = require('./user')

const root = {
    method: 'GET',
    path: '/',
    handler: status,
    options: {
        tags: ['api'],
        description: 'Verificação do status da aplicação',
        notes: 'Pode ser utilizado sempre que outra aplicação estiver monitorando'
    }
}


module.exports = [root, ...transition, ...user]
