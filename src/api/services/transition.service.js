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

        const newId = idGenerator.generate()
        const typeDefault = transitionTypes.deposit
        const statusDefault = transitionStatus.pending
        const newTransition = new Transition({
            ...transitionDTO,
            id: newId,
            type: typeDefault,
            status: statusDefault
        })

        const saveResult = await transitionRepository.save(newTransition)
        const incrementResult = await transitionRepository.incrementDebitBalance(
            { value: newTransition.value, id_account: newTransition.id_account }
        )

        if (saveResult.serverStatus < 1 || incrementResult.serverStatus < 1) {
            throw new CustomError({
                name: 'Falha no lançamento.',
                message:
                    'Houve um erro interno ao registrar a movimentação bancária.',
                statusCode: 500
            })
        }
        const {
            id,
            type,
            status,
            value: consolidateValue,
            description
        } = newTransition
        const response = {
            id,
            type: transitionTypes[type],
            status: transitionStatus[status],
            value: consolidateValue,
            description
        }

        return response
    } catch (err) {
        throw new CustomError(err)
    }
}

module.exports = { createdDepositDebit }
