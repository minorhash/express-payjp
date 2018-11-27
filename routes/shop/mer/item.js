var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');

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
    console.log('no email');
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
    obj = null;
    console.log('no skuson');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(sku);
  console.log(skuson);
  next();
};

// === rend
var rcb = function(req, res) {
  rob = { title: 'items', usr: usr, mer: skumer, err: myerr, song: obj };
  res.render('mer/item', rob);
}; //rcb

router.post('/mer/item:id', [getEma, getUsr, getSku, getSon, chk, rcb]);
module.exports = router;
