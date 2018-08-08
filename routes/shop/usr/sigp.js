var express = require('express');
var router = express.Router();
// === db
var db = require('usrdb');
// == mail
var nodemailer = require('nodemailer');
var snem = require('snd-ema');
var cnf= require('../son/aid.json');
var ema= require('../son/ema.json');

var name, pss, email, chk, reg;
// === post ===

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  name = req.body.name;
  pss = req.body.pss;
  email = req.body.email;
  chk = req.body.chk;
  next();
};

// === insert
var chkIn = function(req, res, next) {
  console.log('=== chkIn ===');
  if (name && pss && email && chk == 'yes') {
    try {
      db.insUsr(name, pss, email);
      console.log('=== ins!!! ===');
      reg = 'ご登録ありがとうございます。';
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no input');
  }
  next();
};

var chkUsr = function(req, res, next) {
  if (email) {
    try {
mailusr = db.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no req.body.email');
  }
  next();
}; //chkUsr

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
snem.trEma(
cnf.HOST,cnf.USR,cnf.PSS,
ema.from,email,ema.cc,
ema.sub,ema.mes
);
next()};

var rcb = function(req, res) {
  res.render('shop/usr/sup', {
    title: 'sign up',
    name: name,
    email: email,
    chk: req.body.chk,
    reg: reg,
  }); //rend
};

router.post('/shop/usr/sup', [defIn, chkIn, chkUsr,senEma,rcb]);

module.exports = router;
