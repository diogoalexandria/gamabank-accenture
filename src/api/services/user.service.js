const repository = require('../repository/user.repository')
const { customError } = require('../../helpers/error')

const checkPassword = senha => {
    const validPassword = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,30}$'
    ) //Vá mais longe do trello

    if (validPassword.test(senha)) {
        console.log('Password is Valid')
        return true
    }
    return false
}

function checkCPF(strCPF) {
    let sum
    let rest
    sum = 0
    if (strCPF == '00000000000') return false

    for (i = 1; i <= 9; i++)
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)

    rest = (sum * 10) % 11

    if (rest == 10 || rest == 11) rest = 0
    if (rest != parseInt(strCPF.substring(9, 10))) return false

    sum = 0
    for (i = 1; i <= 10; i++)
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    rest = (sum * 10) % 11

    if (rest == 10 || rest == 11) rest = 0
    if (rest != parseInt(strCPF.substring(10, 11))) return false

    return true
}

const createAccount = async newUser => {
    const cpf = newUser.getCpf()
    const password = newUser.getPassword()

    if (!checkPassword(password))
        throw new customError({ name:'ErroSenha', message:'Senha com número de caracteres inválido', status:400 })

    if (!checkCPF(cpf))
        throw new customError({ name: 'ErroCpf', message:'Cpf inválido', status: 400 })

    const checkUser = await repository.findByCpf(cpf)

    if (checkUser.length === 0) {
        const result = await repository.save(newUser)
        return result
    } else {
        throw new customError({ name:'ErroConflito', message:'Cpf já cadastrado', status:409 })
    }
}

module.exports = { createAccount }
