const express = require('express')
const app = express()
const client = require('./conexao')
const dbo = client.db('hospital')
const porta = 3000

global.statusUser = -1

const {eAdmin} = {
    eAdmin: function(req, res, next){
        if(global.statusUser == 0 ){
            return next()
       }
        else{
            res.send("Você deve ser um administrador para acessar essa página")
        }
    }
}

const {eUser} = {
    eUser: function(req, res, next){
        if(global.statusUser >= 0){
            return next()
        }
        else{
            res.send("Você deve estar logado como usuário comum para acessar essa página")
        }
    }
}



const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir: 'views/partials',
});
// const ObjectId = require('mongodb').ObjectId;
// const mongoose = require('mongoose')
const {ObjectId} = require('bson')



app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.redirect('/login')
})

/* AQUI COMEÇA O CRUD DO CADASTRAR MÉDICO */
app.get('/cadastrarMedico', eAdmin, (req, res) => {
    let acao = 'Cadastrar'
    dbo.collection('especialidades').find({}).toArray((erro, arrayEspecialidade) => {
        if (erro) throw erro
        res.render('cadastrarMedico', { acao, arrayEspecialidade })
    })
})

app.post('/addMedico', eAdmin, (req, res) => {
    let idEspecialidade = new ObjectId(req.body.especialidade)
    dbo.collection('especialidades').findOne({ _id: idEspecialidade }, (erro, resultado) => {
        if (erro) throw erro

        const novoMedico = {
            nomeMedico: req.body.nomeMedico,
            cpf: req.body.cpf,
            celular: req.body.celular,
            email: req.body.email,
            endereco: req.body.cpf,
            especialidade: resultado,
            crm: req.body.crm,
            salario: req.body.salario,
            precoConsulta: req.body.precoConsulta
        }

        if (req.body.idMedico == "") {
            dbo.collection('medicos').insertOne(novoMedico, (erro, resultado) => {
                if (erro) throw erro
                console.log("Um médico foi cadastrado!")
                res.redirect('/cadastrarMedico')
            })
        } else {
            const idMedico = req.body.idMedico
            const objMedico = new ObjectId(idMedico)
            dbo.collection('medicos').findOneAndReplace(
                { _id: objMedico },
                novoMedico,
                (erro, resultado) => {
                    if (erro) throw erro
                })
            res.redirect('/listarMedicoAdmin')
        }
    })
})

app.get('/listarMedicoAdmin', eAdmin, (req, res) => {
    dbo.collection('medicos').find({}).toArray((erro, resultado) => {
        if (erro) throw erro
        res.render('listarMedicoAdmin', { resultado})
    })
})

app.get('/deletarMedico/:id', eAdmin, (req, res) => {
    let idMedico = req.params.id
    let obj_id = new ObjectId(idMedico)
    dbo.collection('medicos').deleteOne({ _id: obj_id }, (erro, resultado) => {
        if (erro) throw erro
        res.redirect('/listarMedicoAdmin')
    })
})

app.get('/editarMedico/:id', eAdmin, (req, res) => {
    const idMedico = (req.params.id).toString()
    const obj_id = new ObjectId(idMedico)
    let acao = "Salvar"
    dbo.collection('especialidades').find({}).toArray((erro, arrayEspecialidade) => {
        console.log(idMedico)
        console.log(obj_id)
        if (erro) throw erro
        dbo.collection('medicos').findOne({ _id: obj_id }, (erro, resultado) => {
            if (erro) throw erro
            res.render('cadastrarMedico', { resultado, acao, arrayEspecialidade })
        })
    })
})
/* AQUI TERMINA O CRUD DE CADASTRAR MÉDICO */

/* AQUI TERMINA O CRUD DE CADASTRAR ESPECIALIDADE */




app.get('/listarMedico',eUser, (req, res) => {
    dbo.collection('medicos').find({}).toArray((erro, resultado) => {
        if (erro) throw erro
        res.render('listarMedico', { resultado })
    })
})

app.get('/login', (req, res) => {
    global.statusUser = -1
    res.render('login')
})

app.post("/addLogin", (req, res)=>{

    const usuario = req.body.loginUsuario
    const senha = req.body.senha

    dbo.collection("usuarios").findOne({email:usuario}, (erro, resultado)=>{
        if(erro)throw erro
        if(resultado == null || !(resultado.senha == senha)){
            falha = 1
            res.render('login',{falha})

        }
        else{
            global.statusUser = resultado.status
            if (resultado.status == 0){
                res.redirect("/listarMedicoAdmin")
            }
            else if(resultado.status>0){
                res.redirect("/listarMedico")
            }
        }
        
    })
})



    
app.listen(porta, () => {
    console.log('Vamos arrasar neste projeto!')
})
