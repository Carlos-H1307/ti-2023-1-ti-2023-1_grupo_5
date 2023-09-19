const express             = require('express');
const authenticate        = require('../authenticate');
const produtos            = require('../models/produtos');
const Carrinhos           = require('../controllers/Carrinhos');
const router              = express.Router();

const carrinhos = new Carrinhos();

router.get('/:id', carrinhos.get);
router.patch('/:id', carrinhos.patch);

module.exports = router;