const mongoose = require('mongoose');

const geolocalizacionSchema = new mongoose.Schema({
  localidad: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }

});

const Geolocalizacion = mongoose.model('Geolocalizacion', geolocalizacionSchema);

module.exports = Geolocalizacion;
