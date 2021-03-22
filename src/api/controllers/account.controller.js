const { validate } = require('./auth.controller')
const service = require('../services/account.service')

const create = async (request, h) => {
    try {
        const authUser = validate(request)
        const serviceResult = await service.createAccount({
            userCpf: authUser.cpf
        })

        return h
            .response({
                message: 'Conta criada com sucesso!',
                accountInfos: serviceResult
            })
            .code(201)
    } catch (err) {
        return h
            .response({
                error: err.name,
                message: err.message
            })
            .code(err.statusCode)
    }
}

module.exports = {
    create
}
