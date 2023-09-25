var express = require('express');
var authenticate = require('../authenticate');
let carrinhos = require('../models/carrinhos');
let produtos = require('../models/produtos');

class CarrinhosController {
    async get( req, res ){
        try {
            let c = await carrinhos.findById(req.params.id).populate({path: 'produtos.produto', model: produtos});
        
            let filtrado = c.produtos.filter( (prod) => {
              if(prod.produto != null){
                return true
              }
            });
            
            if(c.produtos.length != filtrado.length){
              await carrinhos.findByIdAndUpdate(req.params.id, {produtos: filtrado});
            }
        
            if(c != null){
              res.json(filtrado);
            }else{
               res.json({});
            }
        } catch (error) {
            res.sendStatus(404);
        }
    }

    async patch(){
        carrinhos.findByIdAndUpdate(req.params.id, {produtos: req.body}).then(() => {
            res.statusCode = 200;
            res.json({});
        }).catch( (err) => {
            res.statusCode = 404;
        })
    }
}

module.exports = CarrinhosController;
