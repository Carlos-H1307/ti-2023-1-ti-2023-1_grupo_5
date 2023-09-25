var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carrinhosSchema = new Schema({
  produtos: [{
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'produto'
    },
    quantidade: {
      type: Number
    }
  }]
});
var carrinhos = mongoose.model('carrinhos', carrinhosSchema);
module.exports = carrinhos