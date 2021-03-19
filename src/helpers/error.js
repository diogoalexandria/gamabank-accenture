class customError extends Error {
    constructor({ name, message, status }) {
        super({ name, message })
        this.stack = (new Error()).stack,
        this.statusCode = status || 400
    }
}

module.exports = { customError }
