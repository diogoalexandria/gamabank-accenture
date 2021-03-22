const database = require('../../helpers/database')
const Account = require('../models/Account')

const findByCpf = async ({ userCpf }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sqlStatement = `
            SELECT * FROM accounts
            WHERE cpf_user  = '${userCpf}';
            `

            const result = await database.execute(sqlStatement)

            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

const create = async (accountInfos = new Account()) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                id,
                cpf_user,
                type,
                status,
                credit_status,
                credit_limit,
                credit_balance,
                debit_balance
            } = accountInfos
            const sqlStatement = `
            INSERT INTO accounts (id, cpf_user, type, status, credit_status, credit_limit, credit_balance, debit_balance)
            VALUES (
                '${id}',
                '${cpf_user}',
                '${type}',
                '${status}',
                '${credit_status}',
                '${credit_limit}',
                '${credit_balance}',
                '${debit_balance}'
            );
            `
            const result = await database.execute(sqlStatement)

            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    create,
    findByCpf
}
