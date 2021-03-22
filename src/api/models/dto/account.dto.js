const Joi = require('joi')

const CreateAccountRequestDTO = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
}).label('LoginRequestDTO')

const CreateAccountResponseDTO = Joi.object({
    message: Joi.string()
}).label('LoginResponseDTO')

module.exports = { /* CreateAccountRequestDTO, */ CreateAccountResponseDTO }
