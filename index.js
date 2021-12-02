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
    //Linha abaixo quebra o código(bootstrap não funciona)
    // defaultLayout: false,
    //Linha abaixo define o caminho para diretório layouts para o arquivo main
    layoutsDir: "views/layouts/"
});

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set("views",__dirname )

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('/public'))

 app.get('/', (req, res) => {
    res.redirect('/login')
})


/* Rotas */
/* Médicos */
const medico_routers = require('./routers/medico_routers')
app.use('/medicos', medico_routers)

/* Login */
const login_routers = require('./routers/login_routers')
app.use('/login', login_routers)



app.listen(porta, () => {
    console.log('Vamos arrasar neste projeto!')
})
