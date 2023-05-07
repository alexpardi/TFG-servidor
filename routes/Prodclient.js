const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();


const producteController = require('../controllers/producteController');

router.get('/', producteController.obtenirProductes);
router.get('/:id', producteController.obtenirProducte);

module.exports = router