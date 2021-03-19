const { status } = require('../api/controllers/app.controller')
const authcontroller = require('../api/controllers/auth.controller')
const usercontroller = require('../api/controllers/user.controller')

const {
    LoginRequestDTO,
    LoginResponseDTO
} = require('../api/models/dto/auth.dto')

const Joi = require('joi')

const root = {
    method: 'GET',
    path: '/',
    handler: status,
    options: {
        tags: ['api'],
        description: 'Verificação do status da aplicação',
        notes:
            'Pode ser utilizado sempre que outra aplicação estiver monitorando'
    }
}

const login = {
    method: 'POST',
    path: '/login',
    handler: authcontroller.login,
    options: {
        tags: ['api', 'login'],
        description: 'Rota de autenticação',
        notes: 'Anotações da rota...',
        validate: {
            payload: LoginRequestDTO
        },
        response: {
            status: {
                200: LoginResponseDTO,
                400: Joi.any()
            }
        }
    }
}

const validate = {
    method: 'GET',
    path: '/login/verify',
    handler: authcontroller.validate
}

const newUser = {
    method: 'POST',
    path: '/signup',
    handler: usercontroller.newUser,
    options: {
        tags: ['api', 'register'],
        description: 'Rota de Cadastro do user'
        /*validate: {
            payload:
        },
        response: {
            status: {
                200: ,
                400: Joi.any()
            }
        }*/
    }
}

module.exports = [root, login, validate, newUser]
