const service = require('../services/user.service')
const UserController = require('../models/UserController')
const { checkSchema } = require('../../helpers/schemaChecker')

const newUser = async (request, h) => {
    try {
        const userController = new UserController(request.payload)

        const check = checkSchema(userController)
        if (check) {
            const { status, message, result, code } = await service.createUser(userController)
            if (status === 'success')
                return h.response({ message, result }).code(code)
            return h.response({ error: message }).code(code)
        }
        return h.response({ error: "Dados inválidos" }).code(400)
    } catch (err) {
        return h.response({ error: err.message }).code(500)
    }
}

module.exports = { newUser }
