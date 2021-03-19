const TransitionController = require('./TransitionController')

class Transition extends TransitionController {
    constructor({
        id,
        id_account,
        id_recipient,
        id_payer,
        type,
        status,
        value,
        description,
        date
    }) {
        super({
            cpf_recipient: id_recipient,
            id_account,
            cpf_payer: id_payer,
            value
        }),
            (this.id = id),
            (this.type = type),
            (this.status = status),
            (this.description = description),
            (this.date = date),
            (this.id_account = id_account),
            (this.cpf_recipient = cpf_recipient)((this.cpf_payer = cpf_payer)),
            (this.value = value)
    }
}

module.exports = Transition
