const jwt = require('jsonwebtoken')
const config = require('../../configs/env')
const { findByEmail } = require('../repository/user.repository')
const { comparePassword } = require('../../helpers/myCrypto')
const { CustomError } = require('../../helpers/CustomError')
const UserJWTPayload = require('../models/UserJWTPayload')

const login = async ({ emailPayload, password }) => {
    try {
        const findResponse = await findByEmail(emailPayload)
        if (findResponse.length === 0) {
            throw new CustomError({
                name: 'Email não cadastrado',
                message: 'Email não cadastrado.',
                statusCode: 404
            })
        }

        const {
            id,
            name,
            email: userEmail,
            cpf,
            salt,
            password: passwordEncrypted
        } = findResponse[0]
        const passwordIsValid = comparePassword(
            password,
            salt,
            passwordEncrypted
        )
        if (!passwordIsValid) {
            throw new CustomError({
                name: 'Credenciais inválidas.',
                message: 'Senha não confere com a original.',
                statusCode: 409
            })
        }
        const userJWTPayload = { id, name, email: userEmail, cpf }
        const token = signedJWT(userJWTPayload)

        return {
            token
        }
    } catch (err) {
        throw new CustomError(err)
    }
}

const signedJWT = userPayload => {
    return jwt.sign(userPayload, config.secret, {
        algorithm: 'HS256',
        expiresIn: '1h'
    })
}

const verifyJWT = token => {
    let verifyResult = new UserJWTPayload({})

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            new CustomError({
                message: 'JWT inválido',
                statusCode: 409
            })
        }
        const { id, name, email, cpf } = decoded
        verifyResult = new UserJWTPayload({ id, name, email, cpf })
    })

    return verifyResult
}

module.exports = { login, verifyJWT }
