const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout, renderHome, renderCalculoSolar} = require("../controllers/index.controller");
const resultadoController = require('../controllers/resultado.controller');
const { eliminarConsulta } = require("../controllers/resultado.controller");
router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/home", renderHome);
router.get("/CalculoSolar", renderCalculoSolar);
router.get('/resultados', resultadoController.mostrarResultados);
router.delete('/resultados/:id', eliminarConsulta);

module.exports = router;
