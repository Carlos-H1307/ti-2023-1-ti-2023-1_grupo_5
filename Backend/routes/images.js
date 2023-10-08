var express = require('express');
var router = express.Router();
const clientes = require('../models/clientes');
const carrinhos = require('../models/carrinhos');

var passport = require('passport');
var authenticate = require('../authenticate');

router.get('/:imgSrc', (req, res, next) => {
  clientes.findOne({email: req.body.email}).then((cliente) => {
    console.log(cliente)
    if(cliente != null){
      //existe email
      res.statusCode = 200;
      return res.json({msg: "Email existente."});
    }else{
      //nao existe email
      res.statusCode = 204;
      return res.json({});
    }
  }).catch((error) => {
    //??
        console.log(error);
  })
  //algum tipo de erro
  //res.statusCode = 501; 
  //res.json({msg: "O servidor não soube responder à requisição."});
});