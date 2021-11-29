const express = require('express')
const app = express()
const client = require('./conexao')
const dbo = client.db('hospital')
const porta = 3000
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir: 'views/partials',
});
const ObjectId = require('mongodb').ObjectId;

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

/* AQUI COMEÇA O CRUD DO CADASTRAR MÉDICO */
app.get('/cadastrarMedico', (req, res) => {
    let acao = 'Cadastrar'
    res.render('cadastrarMedico', { acao })
})

app.post('/addMedico', (req, res) => {
    const novoMedico = {
        nomeMedico: req.body.nomeMedico,
        cpf: req.body.cpf,
        celular: req.body.celular,
        email: req.body.email,
        endereco: req.body.cpf,
        especialidade: req.body.especialidade,
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

app.get('/listarMedicoAdmin', (req, res) => {
    dbo.collection('medicos').find({}).toArray((erro, resultado) => {
        if (erro) throw erro
        res.render('listarMedicoAdmin', { resultado })
    })
})

app.get('/deletarMedico/:id', (req, res) => {
    let idMedico = req.params.id
    let obj_id = new ObjectId(idMedico)
    dbo.collection('medicos').deleteOne({ _id: obj_id }, (erro, resultado) => {
        if (erro) throw erro
        res.redirect('/listarMedicoAdmin')
    })
})

app.get('/editarMedico/:id', (req, res) => {
    const idMedico = req.params.id
    const obj_id = new ObjectId(idMedico)
    let acao = "Salvar"
    dbo.collection('medicos').findOne({ _id: obj_id }, (erro, resultado) => {
        if (erro) throw erro
        res.render('cadastrarMedico', { resultado, acao })
    })
})
/* AQUI TERMINA O CRUD DE CADASTRAR MÉDICO */


/* AQUI COMEÇA O CRUD DE CADASTRAR ESPECIALIDADE */
app.get('/cadastrarEspecialidade', (req, res) => {
    let acao = "Cadastrar"
    res.render('cadastrarEspecialidade',{acao})
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


app.get('/cadastrarUsuario', (req, res) => {
    res.render('cadastrarUsuario')
})

app.post('/addUsuario', (req, res) => {
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
    dbo.collection('usuarios').insertOne(novoUsuario, (erro, resultado) => {
        if (erro) throw erro
        console.log("Um usuário foi cadastrado!")
        res.redirect('/')
    })
})

app.get('/listarMedico', (req, res) => {
    dbo.collection('medicos').find({}).toArray((erro, resultado) => {
        if (erro) throw erro
        res.render('listarMedico', { resultado })
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})


app.listen(porta, () => {
    console.log('Vamos arrasar neste projeto!')
})