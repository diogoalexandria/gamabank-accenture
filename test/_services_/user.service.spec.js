const faker = require('faker')
const { assert } = require('chai')
const { createUser } = require('../../src/api/services/user.service')
const UserController = require('../../src/api/models/UserController')

describe('Fluxo do user service.', () => {
    it('Should not create a user with an invalid password', async () => {
        const firstName = 'Foo'
        const lastName = 'Bar'
        const payload = {
            name: faker.name.findName(firstName, lastName, 0),
            email: faker.internet.email(firstName, lastName, 'gmail'),
            cpf: '22506732683',
            password: '123'
            // password: faker.internet.password(9)
        }
        const userMock = new UserController(payload)
        console.log("userMock", userMock)

        const result = await createUser(userMock)

        assert.equal(result.status, 'fail')
        assert.equal(result.code, 400)
        assert.equal(result.message, 'Senha com número de caracteres inválido')
    })

    it('Should not create a user with an invalid cpf', async () => {
        const firstName = 'Foo'
        const lastName = 'Bar'
        const payload = {
            name: faker.name.findName(firstName, lastName, 0),
            email: faker.internet.email(firstName, lastName, 'gmail'),
            cpf: '12345678910',
            password: 'SenhaTeste123'
            // password: faker.internet.password(9)
        }
        const userMock = new UserController(payload)
        console.log("userMock", userMock)

        const result = await createUser(userMock)

        assert.equal(result.status, 'fail')
        assert.equal(result.code, 400)
        assert.equal(result.message, 'Cpf inválido')
    })


})
