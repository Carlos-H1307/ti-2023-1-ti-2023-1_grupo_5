var express = require("express");
var router = express.Router();
var authenticate = require('../authenticate');
const produtos = require("../models/produtos");
const bodyParser = require("body-parser");
const multer  = require('multer');
const fs = require('fs');

// Configuração do armazenamento (pasta e nome de arquivo)
const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, callback) => {
    return callback(null, Date.now() + '-' + file.originalname); // Nome do arquivo (timestamp + nome original)
  },
});

// Inicialização do Multer com a configuração
const upload = multer({ storage: storage });


/* GET produtos listing. */
router.get('/', (req, res, next) => {
  let request = {};
  if(req.query.q != undefined){
    request = {descricao: { "$regex": req.query.q, "$options": "i" }}
  }
  produtos.find(request).then((prod) => {
    res.statusCode = 200;
    res.json(prod)
  });
})

//deve ser separado por data ou ordem de criaçao
router.get( '/novidades',(req,res,next) => {
  produtos.find({}).limit(4).then((arr) => {
    if (arr) {
      if(arr.length > 0){
        res.statusCode = 200;
        res.json(arr);
      }else{
        res.statusCode = 404;
        res.json([]);
      }
    }else{
      res.statusCode = 404;
      res.json([]);
    }
  }).catch( (err) => {
    res.statusCode = 500;
    res.json([]);
    console.log(err);
  });
});

//nao consegui colocar catch pq da erro quando nao acha produto
router.get('/:id', (req, res, next) => {
  res.statusCode = 200;
  produtos.findOne({_id: req.params.id})
  .then((prod) => {
    res.statusCode = 200;
    res.json(prod);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.post('/', upload.single('file'), (req, res, next) => {
  let reqProduto = {
    categoria: req.body.categoria,
    descricao: req.body.descricao,
    detalhes: req.body.detalhes,
    preco: req.body.preco,
    id_lojista: req.body.idLojista,
    img: "http://localhost:3000/images/" + req.file.filename
  }

  produtos.create(reqProduto).then( (produto) => {
    res.statusCode = 200;
    res.setHeader('Contfent-Type', 'application/json');
    return res.json(produto);
  }).catch( (err) => {
    console.log(err);
    return res.sendStatus(500);
  });
});

//delete deve receber o token da loja, verificar se a loja é a que criou o produto, e se for igual, deletar
router.delete('/', (req, res, next) => {
  let id_lojista = req.body.id_lojista;
  let id_produto = req.body.id_produto;
  let img_path   = "public/" + req.body.img.slice(22, req.body.img.length);
  //retira o produto do banco e verifica se o id_lojista é igual ao passado no body
  produtos.findById(id_produto).then( prod => {
    if(prod != null){
      if(prod.id_lojista === id_lojista){
        produtos.deleteOne({ _id: id_produto }).then( (resposta) => {
          fs.unlink(img_path , (err) => {
              if (err) {
                  throw err;
              }
          });
          console.log("Imagem de " + id_produto + " deletada.");

          res.statusCode = 200;
          res.setHeader('Contfent-Type', 'application/json');
          res.json(resposta);
        })
      }
    }else{
      res.statusCode = 204;
      res.json([]);
    }
  })
});

router.route('/:id')
.patch(authenticate.verifyUser, (req,res,next) => {
  console.log(req.body)
  produtos.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then( response => {
    console.log("produto " + req.body._id + " editado.");
    res.statusCode = 200;
    res.json(response);
  });

});





module.exports = router;
