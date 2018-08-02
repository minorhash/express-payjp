var express = require('express');
var router = express.Router();

var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, myerr, mailusr;
/*=== get === */

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
      var mailusr = adb.mailUsr(email);
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
  console.log(usr);

  next();
};

var rcb = function(req, res, body) {
  res.render('mer/del', {
    title: 'delete',
    mer: allmer,
    usr: usr,
  });
};

router.get('/mer/del', [getEma, getUsr, rcb]);

module.exports = router;
