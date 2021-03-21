const { CustomError } = require('../../helpers/CustomError')
const { idGenerator } = require('../../helpers/id-generator')
const { cpfChecker, valueChecker } = require('../../helpers/recordCheckers')
const Transition = require('../models/Transition')
const {
    transitionTypes,
    transitionStatus
} = require('../models/transitionAccessoryTable')
const transitionRepository = require('../repository/transition.repository')

const createdDepositDebit = async transitionDTO => {
    try {
        const { cpf_recipient, cpf_payer, value } = transitionDTO
        cpfChecker(cpf_recipient)
        cpfChecker(cpf_payer)
        valueChecker(value)

        const id = idGenerator.generate()
        const type = transitionTypes.deposit
        const status = transitionStatus.pending
        const newTransition = new Transition({
            ...transitionDTO,
            id,
            type,
            status
        })

        const repositoryResult = await transitionRepository.save(newTransition)

        if (repositoryResult.serverStatus > 0) {
            const { id, type, status, value, description } = newTransition
            const response = {
                id,
                type: transitionTypes[type],
                status: transitionStatus[status],
                value,
                description
            }

            return response
        }
    } catch (err) {
        throw new CustomError(err)
    }
}

module.exports = { createdDepositDebit }
