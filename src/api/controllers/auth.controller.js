const { CustomError } = require('../../helpers/CustomError')
const service = require('../services/auth.service')

const login = async (request, h) => {
    try {
        const { email, password } = request.payload
        const result = await service.login({ emailPayload: email, password })

        return h.response(result).code(400)
    } catch (err) {
        return h
            .response({
                error: err.name,
                message: err.message
            })
            .code(err.statusCode)
    }
}

const validate = request => {
    const token = request.headers['x-access-token']

    if (!token) {
        throw new CustomError({
            name: 'JWT não fornecido.',
            message: 'Rota é autenticada por token JWT.',
            statusCode: 400
        })
    }

    try {
        const result = service.verifyJWT(token)

        return result
    } catch (err) {
        throw new CustomError(err)
    }
}

module.exports = {
    login,
    validate
}
