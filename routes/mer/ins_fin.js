var express = require('express');
var router = express.Router();

var email, usr, tit, sku, pri, img, bool, myerr, mailusr;
// === db ===
var db = require('cardb');
var adb = require('usrdb');

/* === post === */
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

var getBod = function(req, res, next) {
  if (req.body) {
    tit = req.body.tit;
    sku = req.body.sku;
    pri = req.body.pri;
    img = 'img/cd/' + sku + '.png';
    rel = req.body.rel;
    cat = req.body.cat;
    des = req.body.des;
    song = null;
  } else {
    console.log('no body');
  }
  next();
};

var putMer = function(req, res, next) {
  try {
    db.insMer(tit, sku, pri, img, rel, cat, des, song);
  } catch (err) {
    console.log(err);
  }
  next();
};

var chk = function(req, res, next) {
  console.log(sku);
  next();
};

var rcb = function(req, res, next) {
  res.render('mer/ins_fin', {
    title: 'fin',
    tit: tit,
    sku: sku,
    img: img,
  });
};

router.post('/mer/ins_fin', [getEma, getUsr, getBod, putMer, chk, rcb]);

module.exports = router;
