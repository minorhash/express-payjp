var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('aidb');
var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
console.log(str);

var email, usr, sku, skumer, myerr, mailusr, mailtmp;
// === post =============================

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    console.log('no cookie');
  }
  next();
}; //getEma

var getSku = function(req, res, next) {
  var sku = req.body.sku;
  if (sku) {
    try {
      skumer = db.skuMer(sku);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no sku');
  }
  next();
}; //getSku

var getUsr = function(req, res, next) {
  try {
    var mailusr = adb.mailUsr(email);
  } catch (err) {
    myerr = err;
    console.log(err);
  }
  usr = mailusr.name;
  next();
}; //getUsr

var chk = function(req, res, next) {
  console.log(sku);
};
// === rend
var rcb = function(req, res) {
  rob = { title: 'items', usr: usr, mer: skumer, err: myerr };
  res.render('item', rob);
}; //rcb

router.post('/item:id', [getEma, getUsr, getSku, rcb]);
module.exports = router;
