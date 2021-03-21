const Joi = require('joi')
const authcontroller = require('../api/controllers/auth.controller')
const usercontroller = require('../api/controllers/user.controller')
const {
    SignupRequestDTO,
    SignupResponseDTO
} = require('../api/models/dto/signup.dto')

const {
    LoginRequestDTO,
    LoginResponseDTO
} = require('../api/models/dto/auth.dto')


const signup = {
    method: 'POST',
    path: '/signup',
    handler: usercontroller.newUser,
    options: {
        tags: ['api', 'register'],
        description: 'Rota de Cadastro do user',
        validate: {
            payload: SignupRequestDTO
        },
        response: {
            status: {
                200: SignupResponseDTO,
                400: Joi.any()
            }
        }
    }
}

const login = {
    method: 'POST',
    path: '/login',
    handler: authcontroller.login,
    options: {
        tags: ['api', 'login'],
        description: 'Rota de autenticação',
        notes: 'Rota de login do user.',
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


module.exports = [signup, login]
