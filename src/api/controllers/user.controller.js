const service = require('../services/user.service')
const UserController = require('../models/UserController')
const { schemaChecker } = require('../../helpers/recordCheckers')

const newUser = async (request, h) => {
    try {
        const userController = new UserController(request.payload)

        schemaChecker(userController)

        const { status, message, code } = await service.createUser(
            userController
        )
        if (status === 'success') return h.response({ message }).code(code)
    } catch (err) {
        return h
            .response({
                error: err.name,
                message: err.message
            })
            .code(err.statusCode)
    }
}

module.exports = { newUser }
