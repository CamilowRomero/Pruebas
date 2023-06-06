const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const electrodomesticoController = require('../controllers/controlador.electrodomesticos');

router.post('/guardar_datos', isAuthenticated, electrodomesticoController.guardarDatos);
module.exports = router;

