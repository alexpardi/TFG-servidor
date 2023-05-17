const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();

const clientController = require ('../controllers/clientController');
const favoritsController = require("../controllers/favoritsController");
const cistellController = require("../controllers/cistellController")

router.post('/creaUsuari', clientController.crearUsuari);
router.post('/iniciaSessio', clientController.Login);
router.get('/getUsuari:id', verificaToken, clientController.getUsuari);
router.put('/modificaUsuari', clientController.modificaUsuari);
router.put('/favorits', favoritsController.afegirFavorits);
router.get('/favorits:id', favoritsController.getFavorits);
router.put('/eliminafavorits', favoritsController.eliminarFavorit);
router.put('/cistell', cistellController.afegirCistell);
router.get('/cistell:id', cistellController.getCistell);
router.get('/talles:id', cistellController.getTalles);
router.put('/eliminacistell', cistellController.eliminarCistell);
router.put('/comprar', cistellController.realitzarCompra);
router.get('/compresanteriors:id', cistellController.getCompresAnteriors);

module.exports = router