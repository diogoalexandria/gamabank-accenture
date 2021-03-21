const faker = require('faker')
const { assert } = require('chai')
const { createUser } = require('../../src/api/services/user.service')
const { login } = require('../../src/api/services/auth.service')

describe('Fluxo de serviços de usuario.', () => {

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const name = `${firstName} ${lastName}`
    const email = faker.internet.email(firstName, lastName, 'gmail')
    const cpf = '789.123.789-77'
    const password = faker.internet.password(32)


    it('Criação e acesso de usuario a plataforma.', async() => {

        const signupPayload = {
            name,
            email,
            cpf,
            password
        }

        const signupResult = await createUser(signupPayload)

        const signupExpected = ['message']

        const loginPayload = {
            email,
            password
        }

        const loginResult = await login(loginPayload)

        const loginExpected = ['token']

        assert.containsAllDeepKeys(signupResult, signupExpected)

        assert.containsAllDeepKeys(loginResult, loginExpected)

    })
})
