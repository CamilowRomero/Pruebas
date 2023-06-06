const axios = require('axios');
const Electrodomestico = require('../models/electrodomestico');
const DatosSistema = require('../models/DatosSistema');
const Resultado = require('../models/Resultado');
exports.guardarDatos = async (req, res) => {
  const { Radiacion, Bateria, Autonomia, Panel, Capacidad, HorasPico, } = req.body;
  const nombres = req.body.nombre;
  const consumos = req.body.consumo;
  const horas = req.body.horas;
  const cantidades = req.body.cantidad;

  try {
    // Crear un arreglo para almacenar los electrodomésticos
    const datosSistema = new DatosSistema({
      radiacion: Radiacion,
      autonomia: Autonomia,
      bateria: Bateria,
      panel: Panel,
      capacidad: Capacidad,
      horaspico: HorasPico
    });
    await datosSistema.save();
    const electrodomesticos = [];

    // Iterar sobre los arreglos y crear objetos para cada electrodoméstico
    for (let i = 0; i < nombres.length; i++) {
      const electrodomestico = new Electrodomestico({
        nombre: nombres[i],
        consumo: consumos[i],
        horas: horas[i],
        cantidad: cantidades[i],
      });

      electrodomesticos.push(electrodomestico);
    }

    // Guardar los electrodomésticos en la base de datos
    await Electrodomestico.insertMany(electrodomesticos);
    // Calcular los resultados
    const consumoTotal = electrodomesticos.reduce((total, electrodomestico) => total + (electrodomestico.consumo * electrodomestico.horas * electrodomestico.cantidad), 0);
    const bateriasPot = (Autonomia * consumoTotal) / 0.5;
    const bateriasCorr = bateriasPot / Bateria;
    const numBaterias = Math.ceil(bateriasCorr / Capacidad); // Aproximar a número entero
    const numPaneles = Math.ceil(consumoTotal / (Panel * HorasPico * 0.797)); // Aproximar a número entero
    const inversor = (consumoTotal * 1.25)
    // Crear un nuevo objeto de Resultado con los resultados calculados
    const resultado = new Resultado({
      consumoTotal,
      bateriasPot,
      bateriasCorr,
      numBaterias,
      numPaneles,
      inversor
    });

    // Guardar el resultado en la base de datos
    await resultado.save();


    res.redirect('/resultados');
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:', error);
    res.status(500).json({ error: 'Error al guardar los datos.' });
  }
};

