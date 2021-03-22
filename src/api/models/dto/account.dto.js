const Joi = require('joi')

const CreateAccountRequestDTO = Joi.object({
    headers: {
        'x-access-token': Joi.string().required()
    }
}).label('CreateAccountRequestDTO')

const CreateAccountResponseDTO = Joi.object({
    message: Joi.string(),
    accountInfos: {
        id: Joi.string(),
        type: Joi.string(),
        status: Joi.string(),
        creditStatus: Joi.string(),
        creditBalance: Joi.string(),
        debitBalance: Joi.string(),
        invoiceDay: Joi.string()
    }
}).label('CreateAccountResponseDTO')

module.exports = { /* CreateAccountRequestDTO, */ CreateAccountResponseDTO }
