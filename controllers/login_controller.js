const loginDB = require('../models/login_model')
const mongoose = require("mongoose")

exports.acessarLoginGet = (req, res) => {
    res.render('views/pages/login')
}

exports.acessarLoginPost = (req, res) => {
    
    const usuario = req.body.loginUsuario
    const senha = req.body.senha

    loginDB.findOne({usuario:usuario}, (erro, resultado)=>{
        if (erro) throw erro
        if(resultado == null || !(resultado.senha == senha)){
            res.send("Usuário e/ou senha Inválidos")
        }
        else{
            global.statusUser = resultado.status
            if (resultado.status == 0){
                res.send("ADM")
            }
            else if(resultado.status>0){
                res.send("USER")
            }
        }
    })

    
}

