var express = require('express');
var router = express.Router();

/* GET home page. */
var rcb = function(req, res, next) {
  res.render('shop/sig', {
    title: 'sign up',
  }); //rend
};

router.get('/shop/sig', rcb);

module.exports = router;
