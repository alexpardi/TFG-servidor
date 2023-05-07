const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();

const clientController = require ('../controllers/clientController');
const favoritsController = require("../controllers/favoritsController");

router.post('/creaUsuari', clientController.crearUsuari);
router.post('/iniciaSessio', clientController.Login);
router.get('/getUsuari:id', verificaToken, clientController.getUsuari);
router.put('/modificaUsuari', clientController.modificaUsuari);
router.get('/getFavorits', clientController.getFavorits);

module.exports = router