const express = require('express')
const app = express()
const mongoose = require('mongoose')
const porta = 3000

mongoose.connect('mongodb+srv://bianca:bianca98@cluster0.jnnvj.mongodb.net/MyDoc?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log('Estamos conectadas ao Banco de Dados')
})

const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir: 'views/partials',
});

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('/public'))

/* app.get('/', (req, res) => {
    res.render('home')
}) */


/* Rotas */
/* Médicos */
const medico_routers = require('./routers/medico_routers')
app.use('/medicos', medico_routers)

/* Login */
const login_routers = require('./routers/login_routers')
app.use('/login', login_routers)


/* AQUI COMEÇA O CRUD DE CADASTRAR ESPECIALIDADE */
app.get('/cadastrarEspecialidade', (req, res) => {
    let acao = "Cadastrar"
    res.render('cadastrarEspecialidade', { acao })
})

app.post('/addEspecialidade', (req, res) => {
    const novaEspecialidade = {
        especialidade: req.body.especialidade,
    }

    if (req.body.idEspecialidade == "") {
        dbo.collection('especialidades').insertOne(novaEspecialidade, (erro, resultado) => {
            if (erro) throw erro
            console.log('Uma especialidade foi cadastrada!')
            res.redirect('/cadastrarEspecialidade')
        })
    } else {
        const idEspecialidade = req.body.idEspecialidade
        const objEspecialidade = new ObjectId(idEspecialidade)
        dbo.collection('especialidades').findOneAndReplace(
            { _id: objEspecialidade },
            novaEspecialidade,
            (erro, resultado) => {
                if (erro) throw erro
            })
        res.redirect('/listarEspecialidade')
    }
})

app.get('/listarEspecialidade', (req, res) => {
    dbo.collection('especialidades').find({}).toArray((erro, resultado) => {
        if (erro) throw erro
        res.render('listarEspecialidade', { resultado })
    })
})

app.get('/deletarEspecialidade/:id', (req, res) => {
    let idEspecialidade = req.params.id
    let obj_id = new ObjectId(idEspecialidade)
    dbo.collection('especialidades').deleteOne({ _id: obj_id }, (erro, resultado) => {
        if (erro) throw erro
        res.redirect('/listarEspecialidade')
    })
})

app.get('/editarEspecialidade/:id', (req, res) => {
    let idEspecialidade = req.params.id
    let obj_id = new ObjectId(idEspecialidade)
    let acao = "Salvar"
    dbo.collection('especialidades').findOne({ _id: obj_id }, (erro, resultado) => {
        if (erro) throw erro
        res.render('cadastrarEspecialidade', { resultado, acao })
    })
})

/* AQUI TERMINA O CRUD DE CADASTRAR ESPECIALIDADE */


app.listen(porta, () => {
    console.log('Vamos arrasar neste projeto!')
})

//teste jpm
