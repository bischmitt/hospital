const express = require('express')
const app = express()
const client = require('./conexao')
const porta = 3000
const exphbs = require('express-handlebars')
const hbs = exphbs.create({
    partialsDir:('views/partials/')
})

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

app.get('/cadastrarUsuario', (req, res) => {
    res.render('cadastrarUsuario')
})

app.listen(porta,()=>{
    console.log('Vamos arrasar neste projeto!')
})