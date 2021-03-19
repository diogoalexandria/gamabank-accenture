class UserController {
    constructor({ name, email, cpf, password }) {
        (this.name = name),
        (this.email = email),
        (this.cpf = cpf),
        (this.password = password)
    }
}

module.exports = UserController
