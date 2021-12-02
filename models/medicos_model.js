const mongoose = require('mongoose')
const Medicos = mongoose.model('medicos', {

    nomeMedico: String,
    cpf: String,
    celular: String,
    email: String,
    endereco: String,
    especialidade: Array,
    crm: String,
    salario: String,
    precoConsulta: String

})

module.exports = Medicos