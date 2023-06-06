// Resultado.js

const mongoose = require('mongoose');

const resultadoSchema = new mongoose.Schema({
  consumoTotal: {
    type: Number,
    required: true
  },
  bateriasPot: {
    type: Number,
    required: true
  },
  bateriasCorr: {
    type: Number,
    required: true
  },
  numBaterias: {
    type: Number,
    required: true
  },
  numPaneles: {
    type: Number,
    required: true
  },
  inversor: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Resultado', resultadoSchema);
