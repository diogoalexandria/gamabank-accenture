class Account {
    constructor({
        id,
        cpf_user,
        type,
        status,
        credit_status,
        credit_limit,
        credit_balance,
        debit_balance,
        invoice_day
    }) {
        this.id = id
        this.cpf_user = cpf_user
        this.type = type
        this.status = status
        this.credit_status = credit_status
        this.credit_limit = credit_limit
        this.credit_balance = credit_balance
        this.debit_balance = debit_balance
        this.invoice_day = invoice_day
    }
}

module.exports = Account
