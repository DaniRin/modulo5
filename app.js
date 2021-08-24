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
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'b8cf246177beb2',
  resave: false,
  saveUninitialized: true
}))

secured = async(req,res,next) => {
  try{
      // console.log(req.session.id_usuario);
      if(req.session.id_usuario){
          next();
      } else {
          res.redirect('/admin/login');
      }
    }catch(error){
        console.log(error);
    }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quienessomos', quienessomosRouter);
app.use('/novedades', novedadesRouter);
app.use('/derechos', derechosRouter);
app.use('/materiales', materialesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);


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
