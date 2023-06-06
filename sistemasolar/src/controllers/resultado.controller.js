const Resultado = require('../models/Resultado');

exports.mostrarResultados = async (req, res) => {
  try {
    // Obtener los resultados almacenados en la base de datos
    const resultados = await Resultado.find();

    // Asignar un identificador o número de referencia a cada conjunto de resultados
    const resultadosConReferencia = resultados.map((resultado, index) => {
      return {
        _id: resultado._id,
        referencia: `Consulta ${index + 1}`,
        consumoTotal: resultado.consumoTotal,
        bateriasPot: resultado.bateriasPot,
        bateriasCorr: resultado.bateriasCorr,
        numBaterias: resultado.numBaterias,
        numPaneles: resultado.numPaneles,
        inversor: resultado.inversor
      };
    });

    // Renderizar la plantilla 'resultados.hbs' y pasar los resultados con referencias como datos
    res.render('resultados', { resultados: resultadosConReferencia });
  } catch (error) {
    console.error('Error al obtener los resultados:', error);
    res.status(500).json({ error: 'Error al obtener los resultados.' });
  }
};
exports.eliminarConsulta = async (req, res) => {
  try {
    const consultaId = req.params.id;
    console.log('Eliminando consulta con ID:', consultaId);
    await Resultado.findByIdAndRemove(consultaId);
    res.redirect('/resultados');
  } catch (error) {
    console.error('Error al eliminar la consulta:', error);
    res.status(500).json({ error: 'Error al eliminar la consulta.' });
  }
};


