const database = require('../../helpers/database')

const incrementDebitBalance = async({ value, id_account }) => {
    return new Promise(async(resolve, reject) => {
        try {

            const sqlStatement = `
                UPDATE accounts
                SET debit_balance = debit_balance + ${value}
                WHERE id = '${id_account}';
                `
            const result = await database.execute(sqlStatement)

            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

const save = async newTransition => {
    return new Promise(async(resolve, reject) => {
        try {
            const {
                id,
                id_account,
                cpf_recipient,
                cpf_payer,
                type,
                status,
                value,
                description
            } = newTransition

            const sqlStatement = `
            INSERT INTO transitions (id, id_account, cpf_recipient, cpf_payer , type, status , value, description)
            VALUES ('${id}','${id_account}','${cpf_recipient}','${cpf_payer}','${type}','${status}','${value}','${description}');
            `

            const result = await database.execute(sqlStatement)

            resolve(result)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { save, incrementDebitBalance }
