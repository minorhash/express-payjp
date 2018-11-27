var express = require('express');
var router = express.Router();
// == post =============================

var email, usr, mailusr, myerr;

var clrEma = function(req, res, next) {
  req.session = null;
  next();
};

var chk = function(req, res, next) {
  console.log('=== cookies');
  console.log(req.session);
  next();
};

var rcb = function(req, res) {
  res.render('mer/out', {
    title: 'logged out',
    email: email,
    usr: usr,
    err: myerr,
  });
};

router.post('/mer/out', [clrEma, chk, rcb]);
module.exports = router;
