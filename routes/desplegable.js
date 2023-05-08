const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();


const producteController = require('../controllers/producteController');

router.get('/:esport', producteController.desplegableG);
router.get('/petit/:esport/:tipus', producteController.desplegableP);

module.exports = router