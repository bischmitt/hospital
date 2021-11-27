const express = require('express')
const app = express()
const client = require('./conexao')
const dbo = client.db('hospital')
const porta = 3000
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir: 'views/partials',
});

app.engine('handlebars',hbs.engine)
app.set('view engine','handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/cadastrarMedico', (req, res) => {
    res.render('cadastrarMedico')
})

app.post('/addMedico', (req,res)=>{
    const novoMedico = {
        nome: req.body.nomeMedico,
        cpf: req.body.cpf,
        celular: req.body.celular,
        email: req.body.email,
        endereco: req.body.cpf,
        especialidade: req.body.especialidade,
        crm: req.body.crm,
        salario: req.body.salario,
        precoConsulta: req.body.precoConsulta
    }
    dbo.collection('medicos').insertOne(novoMedico,(erro,resultado)=>{
        if(erro) throw erro
        console.log("Um médico foi cadastrado!")
        res.redirect('/cadastrarMedico')
    })
})

app.get('/cadastrarUsuario', (req, res) => {
    res.render('cadastrarUsuario')
})
app.post('/addUsuario', (req,res)=>{
    const novoUsuario = {
        nome: req.body.nomeUsuario,
        dataNascimento: req.body.dataNascimento,
        cpf: req.body.cpf,
        celular: req.body.celular,
        email: req.body.email,
        endereco: req.body.endereco,
        genero: req.body.genero,
        senha: req.body.senha
    }
    dbo.collection('usuarios').insertOne(novoUsuario,(erro,resultado)=>{
        if(erro) throw erro
        console.log("Um usuário foi cadastrado!")
        res.redirect('/')
    })
})

app.get('/cadastrarEspecialidade', (req,res)=>{
    res.render('cadastrarEspecialidade')
})
app.post('/addEspecialidade',(req,res)=>{
    const novaEspecialidade = {
        especialidade: req.body.especialidade,
    }
    dbo.collection('especialidades').insertOne(novaEspecialidade, (erro,resultado)=>{
        if(erro)throw erro
        console.log('Uma especialidade foi cadastrada!')
    })
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/listarMedico', (req,res)=>{
    res.render('listarMedico')
})


app.listen(porta,()=>{
    console.log('Vamos arrasar neste projeto!')
})