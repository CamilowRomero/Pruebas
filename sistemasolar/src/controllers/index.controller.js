

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
}; 

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};
indexCtrl.renderHome = (req, res) => {
  res.render('home');
}; 
indexCtrl.renderCalculoSolar = (req, res) => {
  res.render('CalculoSolar');
};
indexCtrl.renderresultados = (req, res) => {
  res.render('resultados');
};
module.exports = indexCtrl;