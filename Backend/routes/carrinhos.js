const express               = require('express');
const CarrinhosController   = require('../controllers/CarrinhosController');
const router                = express.Router();

const carrinhosController   = new CarrinhosController();

router.get('/:id', carrinhosController.get);
router.patch('/:id', carrinhosController.patch);

module.exports = router;