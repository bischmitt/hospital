/* conexão com o banco de dados */
const mongodb = require('mongodb').MongoClient
const url = 'mongodb+srv://bianca:bianca98@cluster0.jnnvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new mongodb(url)

async function conectar() {
    try {
        await client.connect()
        console.log('Conectada ao Banco de dados')
    } catch (erro) {
        console.log('Infelizmente algo deu errado. Tente novamente')
    }
}
conectar()
module.exports = client