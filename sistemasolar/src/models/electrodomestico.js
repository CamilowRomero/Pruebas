const mongoose = require('mongoose');

const electrodomesticoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  consumo: { type: Number, required: true },
  horas: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Campo para la referencia al usuario
});

const Electrodomestico = mongoose.model('Electrodomestico', electrodomesticoSchema);

module.exports = Electrodomestico;


