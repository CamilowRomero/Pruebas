const mongoose = require('mongoose');

const datosSistemaSchema = new mongoose.Schema({
  radiacion: {
    type: Number,
    required: true
  },
  autonomia: {
    type: Number,
    required: true
  },
  bateria: {
    type: Number,
    required: true
  },
  panel: {
    type: Number,
    required: true
  },
  capacidad: {
    type: Number,
    required: true
  },
  horaspico: {
    type: Number,
    required: true
  }
});

const DatosSistema = mongoose.model('DatosSistema', datosSistemaSchema);

module.exports = DatosSistema;
