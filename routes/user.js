const express = require('express');
const verificaToken = require('../controllers/verificaToken');

const router = express.Router();

const userController = require ('../controllers/userController');

router.post('/creaUsuari', userController.crearUsuari);
router.post('/iniciaSessio', userController.Login);
router.get('/getUsuari:id', verificaToken, userController.getUsuari);
router.put('/modificaUsuari', verificaToken, userController.modificaUsuari);
router.put('/eliminaUser', verificaToken, userController.eliminaUsuari);
router.get('/getComanda', verificaToken, userController.getComanda);
router.get('/realitzaComanda:id', verificaToken, userController.realitzarComanda);
router.get('/norealitzaComanda:id', verificaToken, userController.norealitzarComanda);

module.exports = router
