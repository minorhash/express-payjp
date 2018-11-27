var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, bool, myerr, mailusr;
// === get

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

var putMer = function(req, res, next) {
  if (req.body) {
    tit = req.body.tit;
    sku = req.body.sku;
    pri = req.body.pri;
    img = 'img/cd/' + sku + '.png';
    rel = req.body.rel;
    cat = req.body.cat;
    des = req.body.des;
    try {
      db.insMer(tit, sku, pri, img, rel, cat, des);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no body');
  }

  next();
};

var chk = function(req, res, next) {
  console.log(usr);
  next();
};

var cb = function(req, res, next) {
  var robj = {
    title: 'insert merch',
    usr: usr,
  };
  res.render('mer/ins', robj);
};

router.get('/mer/ins', getEma, getUsr, chk, cb);

module.exports = router;
