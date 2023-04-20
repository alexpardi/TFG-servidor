const express = require('express');
const router = express.Router();


const producteController = require('../controllers/producteController');

router.post('/', producteController.crearProducte);
router.get('/', producteController.obtenirProductes);
router.put('/:id', producteController.actualitzarProducte);
router.get('/:id', producteController.obtenirProducte);
router.delete('/:id', producteController.eliminarProducte);

module.exports = router