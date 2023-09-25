var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const normalize = require('normalize-mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const clientesSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  idCarrinho: {
    type: mongoose.Schema.Types.ObjectId,
  }
});
clientesSchema.plugin(passportLocalMongoose);
var clientes = mongoose.model('clientes', clientesSchema);
module.exports = clientes;