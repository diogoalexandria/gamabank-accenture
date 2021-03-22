class UserJWTPayload {
    constructor({ id, name, email, cpf }) {
        this.id = id
        this.name = name
        this.email = email
        this.cpf = cpf
    }
}

module.exports = UserJWTPayload
