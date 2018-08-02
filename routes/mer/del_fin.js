var express = require('express');
var router = express.Router();

var email, sku, usr, bod, myerr, mailusr;
// === db ===
var db = require('cardb');
var adb = require('usrdb');

/* === post === */

var delMer = function(req, res, next) {
  bod = req.body;
  sku = bod.sku;
  try {
    db.delMer(sku);
  } catch (err) {
    console.log(err);
  }
  next();
};

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
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
    usr = mailusr.name;
  } else {
    usr = null;
    console.log('no email');
  }
  next();
}; //getUsr

var chk = function(req, res, next) {
  console.log(sku);

  next();
};

var rcb = function(req, res, next) {
  res.render('mer/del_fin', {
    title: 'del_fin',
    sku: sku,
    usr: usr,
  });
};

router.post('/mer/del_fin', [getEma, getUsr, delMer, rcb]);

module.exports = router;
