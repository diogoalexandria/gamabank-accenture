const repository = require('../repository/user.repository')
const { customError } = require('../../helpers/error')

const checkPassword = password => {
    // const validPassword = new RegExp(
    //     '^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$'
    // ) //TO DO revisar regex length 6
    // console.log(validPassword.test(password))
    // if (!validPassword.test(password)) {
    //     console.log('Password is Valid')
    //     return true
    // }
    // return false

    if (password.length > 6)
        return true
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

const createUser = async newUser => {
    const cpf = newUser.cpf
    const password = newUser.password

    if (!checkPassword(password)) {
        console.log("Erro senha")
        return { status: 'fail', message: 'Senha com número de caracteres inválido',result: {}, code: 400 }
    }

    if (!checkCPF(cpf)) {
        console.log("Erro cpf")
        return { status: 'fail', message: 'Cpf inválido', result: {}, code: 400 }
    }

    const checkUser = await repository.findByCpf(cpf)

    if (checkUser.length === 0) {
        const result = await repository.save(newUser)
        return { status: 'success', message:'Usuário criado com sucesso.', result, code: 201 }
    } else {
        return { status: 'fail', message: 'Cpf já cadastrado', result: {}, code: 400 }
    }
}

module.exports = { createUser }
