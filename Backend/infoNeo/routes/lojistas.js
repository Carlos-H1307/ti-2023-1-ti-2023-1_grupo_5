var express = require('express');
var router = express.Router();
const lojistas = require('../models/lojistas');
const produtos = require("../models/produtos");

router.post('/logarLojista', (req, res, next) => {
  lojistas.find({email: req.body.email}).then( (loja) => {
    if(loja.length != 1){
      res.statusCode = 200;
      res.json(null);
      console.log("Lojista inexistente no banco de dados.");
    }else{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      loja = loja[0];
      console.log(req.body.senha)
      if(loja.senha === req.body.senha){

        let lojista = {
          nome: loja.nome,
          endereco: loja.endereco,
          cnpj: loja.cnpj,
          telefone: loja.telefone,
          email: loja.email,
          _id: loja._id,
          produtos: [],
          firstFetched: false,
        };
        
        res.json(lojista);
        console.log("Lojista logado: ");
        console.log(lojista);
      }else{
        res.json(null);
      }
    }
  })
});
router.post('/fetchProdutos', (req, res, next) => {
  let id = req.body.id_lojista;
  produtos.find({id_lojista: id}).then( (produtos) => {
    if(produtos.length < 1){
      res.statusCode = 200;
      res.setHeader('Contfent-Type', 'application/json');
      res.json([]);
    }else{
      res.statusCode = 200;
      res.setHeader('Contfent-Type', 'application/json');
      res.json(produtos);
    }
  }
  )
});

router.post('/verificaEmail', (req, res, next) => {
  console.log("a")
  lojistas.findOne({email: req.body.email}).then((lojista) => {
    if(lojista != null){
      res.statusCode = 200;
      res.json({stts: true});
    }else{
      res.statusCode = 200;
      res.json({stts: false});
    }
  }).catch((error) => {
    res.statusCode = 502; 
    console.log(error);
  });
});

router.post('/cadastrarLojista', (req, res, next) => {
  lojistas.findOne({email: req.body.email}).then((lojista) => {
    if(lojista != null){
      res.statusCode = 200;
      return;
    }else{
      lojistas.create(req.body);
      res.statusCode = 200;
      res.json();
    }
  }).catch((error) => {
    res.statusCode = 502; 
    console.log(error);
    return;
  });
  
  
})

module.exports = router;