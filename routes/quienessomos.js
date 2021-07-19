var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quienessomos', { title: 'QUIÉNES SOMOS' });//quienessomos.hbs
});

module.exports = router;