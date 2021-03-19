class TransitionController {
    constructor({ cpf_recipient, id_account, cpf_payer, value, description }) {
        ;(this.cpf_recipient = cpf_recipient),
            (this.id_account = id_account),
            (this.cpf_payer = cpf_payer),
            (this.value = value),
            (this.description = description)
    }
}

module.exports = TransitionController
