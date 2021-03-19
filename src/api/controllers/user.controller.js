const service = require('../services/user.service')
const UserController = require('../models/UserController')
const { checkSchema } = require('../../helpers/schemaChecker')


const newUser = async (request, h) => {
    try {
        console.log(h)
        const user = new UserController(request.payload)

        const check = checkSchema(user)
        if (check) {
            const result = await service.createUser(user)
            return h.response(result).code(201)
        }
        return h.response({ error: "Dados inválidos" }).code(400)
    } catch (err) {
        console.log(err)
        return h.response({ error: err.message }).code(err.statusCode)
    }
}

module.exports = { newUser }
