const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();

const favoritsController = require ('../controllers/favoritsController');

router.post('/', verificaToken, favoritsController.afegirFavorits);
router.get('/:id', verificaToken, favoritsController.getFavorits);

module.exports = router