const mongoose = require('mongoose');
require('dotenv').config();

console.log("Tentando conectar...");
console.log(process.env.DB_DEV_URL)
mongoose.connect(process.env.DB_DEV_URL, 
{useNewUrlParser: true, useUni1fiedTopology: true})
.then((conn) => {
    console.log("MongoDB Atlas Conectado")
    conn.connection.dropDatabase()
    .then(() => {
        console.log("Banco de dados deletada.")

    })
    .catch( (err) => {
        console.log(err);
    })

    //conn.connection.close();
})
.catch((e) => {console.log(e)});