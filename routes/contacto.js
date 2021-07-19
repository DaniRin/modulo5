var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto');//contacto.hbs
});


router.post('/', async (req, res, next) => {
var nombreyapellido = req.body.nombreyapellido;
var mail = req.body.mail;
var mensaje = req.body.mensaje;
console.log(req.body);
  

var obj = {
  to: 'danieelarinaldi@gmail.com',
  subject: 'contacto desde la web',
  html: nombreyapellido + '' + 'se contactó a través de la web y dejó este mail' + mail + '.Además, mandó el siguiente mensaje: "' + mensaje + '"'
  }


var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }

});
var info = await transport.sendMail(obj);

res.render('contacto', {
  message: 'Mensaje enviado correctamente'
});

});

module.exports = router;