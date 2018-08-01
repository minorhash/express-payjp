var express = require('express');
var router = express.Router();

var chk = function(req, res, next) {
  console.log('=== agmt ===');
  next();
};

var gcb = function(req, res) {
  res.render('shop/agmt', {
    title: 'agmt',
  });
};

router.get('/shop/agmt', [chk, gcb]);

module.exports = router;
