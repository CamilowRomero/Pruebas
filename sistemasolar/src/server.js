
//requerimientos a instalar con NPM
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
var body_parser = require('body-parser');

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const electrodomesticosRoutes = require('./routes/electrodomesticos');
// Initializations
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 4000); //puerto para el servidor localhost:5000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false}));
app.use(body_parser.urlencoded({extended:true}));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
// Utiliza las rutas de los electrodomésticos
app.use('/electrodomesticos', electrodomesticosRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended:true}));
module.exports = app;