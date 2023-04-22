const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();


const producteController = require('../controllers/producteController');

router.post('/', verificaToken, producteController.crearProducte);
router.get('/', verificaToken, producteController.obtenirProductes);
router.put('/:id', verificaToken, producteController.actualitzarProducte);
router.get('/:id', verificaToken, producteController.obtenirProducte);
router.delete('/:id', verificaToken, producteController.eliminarProducte);

module.exports = router