const service = require('../services/transition.service')
const { schemaChecker } = require('../../helpers/recordCheckers')
const TransitionController = require('../models/TransitionController')

const depositDebit = async (request, h) => {
    try {
        const transitionDTO = new TransitionController(request.payload)
        schemaChecker(transitionDTO)

        const serviceResult = await service.createdDepositDebit(transitionDTO)
        return h.response(serviceResult).code(201)
    } catch (err) {
        return h
            .response({
                error: err.name,
                message: err.message
            })
            .code(err.statusCode)
    }
}

module.exports = { depositDebit }
