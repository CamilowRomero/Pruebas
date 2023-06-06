const axios = require('axios');
const Geolocalizacion = require('../models/geolocalizacionModel');

exports.obtenerGeolocalizacion = async (localidad) => {
  try {
    const apiKey = '53745bc0cd0ce5b54f971810af40be16';
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${localidad}&limit=1&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const data = response.data[0];

    console.log(response.data);

    const geolocalizacion = new Geolocalizacion({
      localidad: data.name,
      state: data.state,
      country: data.country,
      lat: data.lat,
      lon: data.lon
    });

    await geolocalizacion.save();

    return {
      localidad: data.name,
      latitud: data.lat,
      longitud: data.lon,
      state: data.state,
      country: data.country
    };
  } catch (error) {
    throw new Error('Error al obtener la geolocalización');
  }
}
