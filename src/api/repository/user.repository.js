const database = require('../../helpers/database')
const crypto = require('../../helpers/mycrypto')
const User = require('../models/User')

const save = async user => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, email, password, cpf } = user
            const { encryptedPassword, salt } = await crypto.encryptPassword(
                password
            )
            const id = email + encryptedPassword

            const sqlStatement = `
            INSERT INTO users (id, name, email, cpf, password, salt)
            VALUES ("${id}", "${name}", "${email}", "${cpf}", "${encryptedPassword}", "${salt}");
            `
            const result = await database.execute(sqlStatement)

            resolve(result)
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

// Remover o username para CPF
const findByUsername = async username => {
    return new Promise(async (resolve, reject) => {
        try {
            const sqlStatement = `SELECT * FROM users WHERE cpf="${username}";`
            const result = await database.execute(sqlStatement)

            resolve(new User(result))
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}

//Função para verificar se a senha possui as regras pela expressão regular em validPassword
const checkPassword = async senha => {
    const validPassword = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
    ) //Vá mais longe do trello
    return new Promise(async (resolve, reject) => {
        try {
            if (validPassword.test(senha)) {
                console.log('Password is Valid')
                resolve(senha)
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = { save, findByUsername }
