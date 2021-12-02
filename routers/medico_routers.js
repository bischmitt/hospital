const express = require('express')
const router = express.Router()

const medicoController = require('../controllers/medico_controller')

// rota pai '/medicos'

router.get('/cadastrar', medicoController.cadastrarMedicoGet)

router.post('/cadastrar', medicoController.cadastrarMedicoPost)

router.get('/listarAdmin', medicoController.listarMedicoAdmin)

router.get('/listarUser', medicoController.listarMedicoUser)

router.get('/deletar/:id', medicoController.deletarMedico)

router.get('/editar/:id', medicoController.editarMedico)

module.exports = router
