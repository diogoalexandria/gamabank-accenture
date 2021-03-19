const faker = require('faker')
const { assert, expect } = require('chai')
const { createUser } = require('../../src/api/services/user.service')
const UserController = require('../../src/api/models/UserController')
const { customError } = require('../../src/helpers/error')

describe('Fluxo do user service.', () => {
    it('Should not create a user with an invalid password', async () => {
        const firstName = 'João'
        const lastName = 'Maria'
        const payload = {
            name: faker.name.findName(firstName, lastName, 0),
            email: faker.internet.email(firstName, lastName, 'gmail'),
            cpf: '22506732683',
            password: 'Teste@_123'
            // password: faker.internet.password(9)
        }
        const userMock = new UserController(payload)
        console.log("userMock", userMock)
        const customErrorMock = new customError({ name:'ErroSenha', message:'Senha com número de caracteres inválido', status:400 })

        // const result = await createUser(userMock)

        expect(await createUser(userMock)).to.throw(customErrorMock)
        // assert.throws(result, customErrorMock)
    })
})
