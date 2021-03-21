const jwt = require('jsonwebtoken')
const config = require('../../configs/env')
const { findByEmail } = require('../repository/user.repository')
const { comparePassword } = require('../../helpers/myCrypto')
const { CustomError } = require('../../helpers/CustomError')

const login = async({ emailPayload, password }) => {
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
            email,
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
        const userJWTPayload = { id, name, email, cpf }
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
        expiresIn: 300
    })
}

const verifyJWT = async token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err)
                reject(
                    new CustomError({
                        message: 'JWT inválido',
                        statusCode: 409
                    })
                )

            resolve({ auth: true, data: decoded })
        })
    })
}

module.exports = { login, verifyJWT }
