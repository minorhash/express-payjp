var express = require('express');
var router = express.Router();
// == post =============================

var email, usr, mailusr, myerr;

var clrEma = function(req, res, next) {
  req.session = null;
  next();
};

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    console.log('no sess');
  }
  next();
}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    myerr = 'no';
  }
  if (mailusr) {
    usr = mailusr.name;
  } else {
    usr = null;
    myerr = 'no mailusr';
  }
  next();
};

var chk = function(req, res, next) {
  console.log('=== cookies');
  console.log(req.session);
  console.log(usr);
  next();
};

var rcb = function(req, res) {
  res.render('out', {
    title: 'logged out',
    email: email,
    usr: usr,
    err: myerr,
  });
};

router.post('/out', [clrEma, getEma, getUsr, chk, rcb]);
module.exports = router;
