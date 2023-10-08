const mongoose = require('mongoose');
require("dotenv").config();

const connectDatabase = () => {
    console.log("Tentando conectar...");

    mongoose.connect(process.env.MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("MongoDB Atlas Conectado")})
    .catch((e) => {console.log(e)});
}

module.exports = connectDatabase;