var express = require('express');
var router = express.Router();

// === db
var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, sku, song, allmer, usr, bool, myerr, mailusr;
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
    (usr = null), console.log('no mail');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(email);
  console.log(usr);
  console.log(req.body);
  next();
};

var cb = function(req, res, next) {
  var robj = {
    title: 'add songs',
    usr: usr,
    mer: allmer,
  };
  res.render('mer/song', robj);
};

router.get('/mer/song', getEma, getUsr, chk, cb);

module.exports = router;
