const { validate } = require('./auth.controller')

const create = async (request, h) => {
    try {
        const authUser = validate(request)
        //const { email, password } = request.payload
        //const result = await service.login({ emailPayload: email, password })

        return h.response({ message: 'Conta criada com sucesso!' }).code(201)
    } catch (err) {
        return h
            .response({
                name: err.name,
                error: err.message
            })
            .code(err.statusCode)
    }
}

module.exports = {
    create
}
