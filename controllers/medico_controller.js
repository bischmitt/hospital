const medicosDB = require('../models/medicos_model')
const especialidadesDB = require('../models/especialidades_model')
const mongoose = require('mongoose')

exports.cadastrarMedicoGet = (req, res) => {
    let acao = "Cadastrar"
    especialidadesDB.find({}, (erro, arrayEspecialidade) => {
        if (erro) throw erro
        res.render('views/pages/cadastrarMedico', { acao, arrayEspecialidade })
    }).lean()
}

exports.cadastrarMedicoPost = (req, res) => {
    let idEspecialidade = req.body.especialidade
    especialidadesDB.findById(idEspecialidade, (erro, resultado) => {
        if (erro) throw erro

        if (req.body.idMedico == "") {
            const salva_medico = new medicosDB()
            salva_medico.nomeMedico = req.body.nomeMedico
            salva_medico.cpf = req.body.cpf
            salva_medico.celular = req.body.celular
            salva_medico.email = req.body.email
            salva_medico.endereco = req.body.cpf
            salva_medico.especialidade = resultado
            salva_medico.crm = req.body.crm
            salva_medico.salario = req.body.salario
            salva_medico.precoConsulta = req.body.precoConsulta

            salva_medico.save((erro) => {
                if (erro) throw erro
                res.redirect('/medicos/listarAdmin')
            })

        } else {
            const id = mongoose.Types.ObjectId(req.body.idMedico)
            medicosDB.findById(id, (erro, resultado) => {
                if (erro) throw erro

                resultado.nomeMedico = req.body.nomeMedico
                resultado.cpf = req.body.cpf
                resultado.celular = req.body.celular
                resultado.email = req.body.email
                resultado.endereco = req.body.cpf
                resultado.especialidade = resultado
                resultado.crm = req.body.crm
                resultado.salario = req.body.salario
                resultado.precoConsulta = req.body.precoConsulta

                resultado.save((erro) => {
                    if (erro) throw erro
                    res.redirect('/medicos/listarAdmin')
                })
            })
        }
    })
}

exports.listarMedicoAdmin = (req, res) => {
    medicosDB.find({}, (erro, resultado) => {
        if (erro) throw erro
        res.render('views/pages/listarMedicoAdmin', { resultado })
    }).lean()
}

exports.listarMedicoUser = (req, res) => {
    medicosDB.find({}, (erro, resultado) => {
        if (erro) throw erro
        res.render('views/pages/listarMedico', { resultado })
    })
}

exports.deletarMedico = (req, res) => {
    let idMedico = mongoose.Types.ObjectId(req.params.id)
    /* let obj_id = new ObjectId(idMedico) */
    medicosDB.deleteOne({ _id: idMedico }, (erro, resultado) => {
        if (erro) throw erro
        res.redirect('/medicos/listarAdmin')
    })
}

exports.editarMedico = (req, res) => {
    let idMedico = mongoose.Types.ObjectId(req.params.id)
    /* const idMedico = req.params.id */
    let acao = "Salvar"
    especialidadesDB.find({}, (erro, arrayEspecialidade) => {
        console.log(arrayEspecialidade)
        if (erro) throw erro
        medicosDB.findOne({_id: idMedico}, (erro, resultado) => {
            if (erro) throw erro
            res.render('views/pages/cadastrarMedico', { resultado, acao, arrayEspecialidade })
        }).lean()
    }).lean()
}

