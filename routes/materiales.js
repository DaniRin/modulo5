var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('materiales', { title: 'MATERIALES' });//materiales.hbs
});

module.exports = router;