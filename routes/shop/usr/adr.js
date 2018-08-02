var express = require('express');
var router = express.Router();
var adb = require('usrdb');

var getEma = function(req, res, next) {
  var cred = require('../js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('../js/cred');
  usr = cred.usr(email);
  next();
};

var red = function(req, res, next) {
  if (usr) {
    res.redirect('/shop');
  }
  next();
};

var chk = function(req, res, next) {
  console.log('=== adr ===');
  next();
};

var rcb = function(req, res) {
  res.render('shop/usr/adr', {
    title: 'address',
    email: email,
    usr: usr,
  }); //rend
};

router.get('/shop/usr/adr', [getEma, getUsr,  chk, rcb]);

// === post
var pcb = function(req, res) {
  res.render('shop/usr/adr', {
    title: 'address',
    email: email,
    usr: usr,
  }); //rend
};

module.exports = router;
