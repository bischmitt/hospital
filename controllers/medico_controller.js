const medicosDB = require('../models/medicos_model')
const especialidadesDB = require('../models/especialidades_model')

exports.cadastrarMedicoGet = (req, res) => {
    let acao = "Cadastrar"
    const resultado = []
    res.render('views/pages/cadastrarMedico', { resultado, acao })
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

            salva_funcionario.save((erro) => {
                if (erro) throw erro
                res.redirect('/listarMedicoAdmin')
            })

        } else {
            const id = req.body.idMedico
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
                    res.redirect('/listarMedicoAdmin')
                })
            })
        }
    })
}

exports.listarMedicoAdmin = (req, res) => {
    medicosDB.find({},(erro, resultado) => {
        if (erro) throw erro
        res.render('views/pages/listarMedicoAdmin', { resultado })
    })
}

exports.listarMedicoUser = (req, res) => {
    medicosDB.find({},(erro, resultado) => {
        if (erro) throw erro
        res.render('listarMedico', { resultado })
    })
}

exports.deletarMedico = (req, res) => {
    let idMedico = req.params.id
    /* let obj_id = new ObjectId(idMedico) */
    medicosDB.deleteOne({ _id: idMedico }, (erro, resultado) => {
        if (erro) throw erro
        res.redirect('/listarMedicoAdmin')
    })
}

exports.editarMedico = (req, res) => {
    const idMedico = req.params.id
    let acao = "Salvar"
    medicosDB.findById(idMedico , (erro, resultado) => {
        if (erro) throw erro
        res.render('views/pages/cadastrarMedico', { resultado, acao })
    })
}