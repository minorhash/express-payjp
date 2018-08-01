var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
//console.log(str)

var email, usr, sku, skumer, myerr, mailusr, mailtmp, skuson, obj, len;
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
  sku = req.body.sku;
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
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    usr = mailusr.name;
  } else {
    usr = null;
    myerr = 'no mailusr';
  }
  next();
};

var getSon = function(req, res, next) {
  try {
    skuson = db.skuSon(sku);
  } catch (err) {
    console.log(err);
  }
  if (skuson.song) {
    obj = JSON.parse(skuson.song);
    len = Object.keys(obj).length;
  } else {
    console.log('no skuson');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(sku);
  console.log(skuson);
  console.log(obj);
  console.log(len);
  next();
};
// === rend
var rcb = function(req, res) {
  rob = { title: 'items', usr: usr, mer: skumer, song: obj, err: myerr };
  res.render('shop/item', rob);
}; //rcb

router.post('/shop/item:id', [getEma, getUsr, getSku, getSon, chk, rcb]);
module.exports = router;
