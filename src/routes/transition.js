const Joi = require('joi')
const {
    DepositDebitRequestDTO,
    DepositDebitResponseDTO
} = require('../api/models/dto/transition.dto')
const transitioncontroller = require('../api/controllers/transition.controller')

const depositDebit = {
    method: 'POST',
    path: '/deposit/debit',
    handler: transitioncontroller.depositDebit,
    options: {
        tags: ['api', 'transition'],
        description: 'Rota de depósito em conta débito',
        notes:
            'É necessário cpf do proprietário da conta, número da conta, cpf do depositante e valor',
        validate: {
            payload: DepositDebitRequestDTO
        },
        response: {
            status: {
                200: DepositDebitResponseDTO,
                400: Joi.any() //TODO: check this use
            }
        }
    }
}

module.exports = [depositDebit]
