var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, sku;
var mailusr, skumer, skuson, obj;
// === post

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
};

var getSku = function(req, res, next) {
  if (req.body) {
    sku = req.body.sku;
    try {
      skumer = db.skuMer(sku);
    } catch (err) {
      console.log(err);
    }
  }
  next();
};

var getSon = function(req, res, next) {
  if (sku) {
    try {
      skuson = db.skuSon(sku);
    } catch (err) {
      console.log(err);
    }
    obj = JSON.parse(skuson.song);
  } else {
    console.log('no sku');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(sku);
  console.log(skumer);

  next();
};

var cb = function(req, res, next) {
  var robj = {
    title: 'upate admin',
    usr: usr,
    sku: sku,
    song: obj,
    skumer: skumer,
  };
  res.render('mer/up2', robj);
};

router.post('/mer/up2', getEma, getUsr, getSku, chk, cb);

module.exports = router;
