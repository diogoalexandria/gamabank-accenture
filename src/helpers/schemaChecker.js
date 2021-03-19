const { customError } = require("./error")

const checkSchema = (object) => {
    const payloadKeys = Object.keys(object)

    payloadKeys.forEach(key => {
        const value = object[key]

        if (!value) {
            return false
        }
        return true
    })
}

module.exports = { checkSchema }
