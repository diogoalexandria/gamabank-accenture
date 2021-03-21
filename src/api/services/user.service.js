const repository = require('../repository/user.repository')
const { cpfChecker, passwordChecker } = require('../../helpers/recordCheckers')
const { CustomError } = require('../../helpers/CustomError')

const createUser = async newUser => {
    try {
        const { cpf, password } = newUser

        passwordChecker(password)

        cpfChecker(cpf)

        const checkUser = await repository.findByCpf(cpf)

        if (checkUser.length > 0) {
            throw new CustomError({
                name: 'ErroConflito',
                message: 'Cpf já cadastrado',
                statusCode: 409
            })
        }

        const result = await repository.save(newUser)

        return {
            status: 'success',
            message: 'Usuário criado com sucesso.',
            result,
            code: 201
        }
    } catch (err) {
        throw new CustomError(err)
    }
}

module.exports = { createUser }
