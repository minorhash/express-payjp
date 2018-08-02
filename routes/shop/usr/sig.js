var express = require('express');
var router = express.Router();

/* GET home page. */
var rcb = function(req, res, next) {
  res.render('shop/usr/sig', {
    title: 'sign up',
  }); //rend
};

router.get('/shop/usr/sig', rcb);

module.exports = router;
