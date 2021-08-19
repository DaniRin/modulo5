var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config();
var pool = require('./models/bd');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quienessomosRouter = require('./routes/quienessomos');
var novedadesRouter = require('./routes/novedades');
var derechosRouter = require('./routes/derechos');
var materialesRouter = require('./routes/materiales');
var contactoRouter = require('./routes/contacto');
const { getMaxListeners } = require('./models/bd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quienessomos', quienessomosRouter);
app.use('/novedades', novedadesRouter);
app.use('/derechos', derechosRouter);
app.use('/materiales', materialesRouter);
app.use('/contacto', contactoRouter);

// select
// pool.query("select * from `alumnos rinaldi`").then(function (resultados) {
//   console.log(resultados)
// });

// insert
// var obj = {
//   nombre: 'daniela',
//   apellido: 'rinaldi',
//   trabajo: 'comunicadora',
//   edad: 33,
//   salario: 10000,
//   mail: 'xxx@gmail.com'
// }

// pool.query('insert into `alumnos rinaldi` set ?', [obj]).then(function (resultados)
// {
//   console.log(resultados)
// });

// update
// var id = 1;
// var obj = {
//   nombre: 'pablo',
//   apellido: 'gómez'
// }

// pool.query('update `alumnos rinaldi` set ? where id_empleado=?', [obj, id]).then(function (resultados) {
//   console.log(resultados);
// });

// delete
var pool = require('./models/bd');

var id = 1;

pool.query('delete from `alumnos rinaldi` where id_empleado= ?', [id]).then(function (resultados) {
  console.log(resultados);
});


app.get('/quienessomos', function(req,res){
  res.send('hola, soy la seción "¿Quiénes somos"?')
})
app.get('/novedades', function(req,res){
  res.send('hola, soy la sección de novedades')
})
app.get('/derechos', function(req,res){
  res.send('hola, soy la sección de derechos')
})
app.get('/materiales', function(req,res){
  res.send('hola, soy la sección de materiales')
})
app.get('/contacto', function(req,res){
  res.send('hola, soy la seccción de contacto')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
