const Joi = require('joi')

const DepositDebitRequestDTO = Joi.object({
    cpf_recipient: Joi.string().required(),
    id_account: Joi.string().required(),
    cpf_payer: Joi.string().required(),
    value: Joi.number().required(),
    description: Joi.string()
}).label('DepositDebitRequestDTO')

const DepositDebitResponseDTO = Joi.object({
    type: Joi.string(),
    status: Joi.string(),
    value: Joi.number(),
    description: Joi.string(),
    date: Joi.date()
}).label('DepositDebitResponseDTO')

module.exports = { DepositDebitRequestDTO, DepositDebitResponseDTO }
