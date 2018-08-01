var express = require('express');
var router = express.Router();

/* GET home page. */
var rcb = function(req, res, next) {
  res.render('sig', {
    title: 'sign up',
  }); //rend
};

router.get('/sig', rcb);

module.exports = router;
