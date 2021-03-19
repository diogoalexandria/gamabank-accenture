const { assert } = require('chai')
const { internet } = require('faker')
const {
    encryptPassword,
    comparePassword
} = require('../../src/helpers/myCrypto')

describe('Funcionamento da ferramenta de criptografia.', () => {
    it('Senha criptografada bate com a senha fornecida.', async () => {
        const password = internet.password(32)
        const { encryptedPassword, salt } = await encryptPassword(password)
        const isValid = await comparePassword(password, salt, encryptedPassword)

        assert.equal(isValid, true)
    })
})
