const Clientes = require('../models/clientes');
const Carrinhos = require('../models/carrinhos');

var passport = require('passport');
var authenticate = require('../authenticate'); 
const { default: mongoose } = require('mongoose');

class ClientesController {

    async get( req, res ){

    }

    async post( req, res ){

        if(!req.body.username){
            return res.sendStatus(400);
        }

        if(!req.body.password){
            return res.sendStatus(400);
        }

        const client = {
            username: req.body.username,
            password: req.body.password
        };

        Clientes.register(new Clientes(client), req.body.password, (err, clientDone) => {
            if(err) {
                return res.sendStatus(400);

            } else {
                passport.authenticate('cliente-local')(req, res, () => {
                    Carrinhos.create({_id: clientDone._id})
                    .then( () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.json({success: true, status: 'Registration Successful!'});
                    })
                    .catch( (err) => {
                        Clientes.deleteOne({_id: clientDone._id});
                        return res.sendStatus(500);
                    });
                });
            }
        })
    }

    async login( req, res ){

        var token = authenticate.getToken({
            _id: req.user._id,
            username: req.user.username
        });

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Authorization', 'json');
        
        let c = {
            _id: req.user._id,
            email: req.user.username,
            token: token
        };
        return res.json(c);
    }

    async logout( req, res ){

    }

}

module.exports = ClientesController;