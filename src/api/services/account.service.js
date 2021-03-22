const { idGenerator } = require('../../helpers/id-generator')
const { create, findByCpf } = require('../repository/account.respository')
const {
    accountStatus,
    accountTypes
} = require('../models/accountAccessoryTable')
const { creditStatus } = require('../models/creditAccessoryTable')
const Account = require('../models/Account')
const { CustomError } = require('../../helpers/CustomError')

const createAccount = async ({ userCpf }) => {
    try {
        const findResult = await findByCpf({ userCpf })

        if (findResult.length > 0) {
            throw new CustomError({
                name: 'CPF já utilizado.',
                message: 'CPF de usuário já possui conta cadastrada.',
                statusCode: 406
            })
        }

        const creditDefault = 200
        const debitDefault = 0
        const invoiceDayDefault = '05'

        const accountInfos = new Account({
            id: idGenerator.generate(),
            cpf_user: userCpf,
            type: accountTypes.current,
            status: accountStatus.active,
            credit_balance: creditDefault,
            credit_limit: creditDefault,
            credit_status: creditStatus.pending,
            debit_balance: debitDefault
        })
        const createResult = await create(accountInfos)

        if (createResult.serverStatus < 1) {
            throw new CustomError({
                name: 'Falha na criação de conta.',
                message: 'Houve um erro interno ao registrar a conta bancária.',
                statusCode: 500
            })
        }

        const {
            id,
            type,
            status,
            credit_status,
            credit_balance,
            debit_balance
        } = accountInfos
        const response = {
            id,
            type: accountTypes[type],
            status: accountStatus[status],
            creditStatus: creditStatus[credit_status],
            creditBalance: credit_balance,
            debitBalance: debit_balance,
            invoiceDay: invoiceDayDefault
        }

        return response
    } catch (err) {
        throw new CustomError(err)
    }
}

module.exports = {
    createAccount
}
