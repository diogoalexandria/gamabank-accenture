const Joi = require('joi')
const {
    CreateAccountRequestDTO,
    CreateAccountResponseDTO
} = require('../api/models/dto/account.dto')
const accountController = require('../api/controllers/account.controller')

const createAccount = {
    method: 'POST',
    path: '/account',
    handler: accountController.create,
    options: {
        tags: ['api', 'account'],
        description: 'Rota de criação de conta bancária.',
        notes: 'Rota autenticada por JWT.',
        validate: {
            headers: CreateAccountRequestDTO
        },
        response: {
            status: {
                200: CreateAccountResponseDTO,
                400: Joi.any()
            }
        }
    }
}

module.exports = [createAccount]
