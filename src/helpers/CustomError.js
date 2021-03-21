class CustomError {
    constructor({ name, message, statusCode }) {
        ;(this.name = name),
            (this.message = message || 'Mensagem de erro padrão'),
            (this.stack = new Error().stack),
            (this.statusCode = statusCode || 400)
    }
}

module.exports = { CustomError }
