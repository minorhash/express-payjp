var express = require('express');
var router = express.Router();
// == mail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var trans = smtpTransport({
  host: 'smtp.muumuu-mail.com',
  port: 465,
  //    tls: true,
  auth: { user: 'info@tmsmusic.tokyo', pass: 'hash2010' },
});
var transporter = nodemailer.createTransport(trans);
// === db
var db = require('usrdb');

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
    reg = '情報がありません。登録をおねがいします。';

    console.log('no input');
  }
  next();
};

//var chkChk=function(req,res,next){
//if(!chk){
//console.log("=== not agreed. ===")
//res.redirect("shop");
//}else{console.log("agreed")}
//next()}

var chkUsr = function(req, res, next) {
  if (email) {
    try {
      var mailusr = db.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no req.body.email');
  }
  next();
}; //chkUsr

var sndEma = function(req, res, next) {
  try {
    var mes = 'message';
    var sob = {
      from: 'info@tmsmusic.tokyo',
      to: email,
      subject: 'title:',
      html:
        'name:' +
        name +
        '<br>' +
        'email:' +
        email +
        '<br>' +
        'mes:' +
        '<br>' +
        mes,
    };
    transporter.sendMail(sob);
  } catch (err) {
    console.dir(err);
  }
  next();
}; //sndEma

var rcb = function(req, res) {
  res.render('shop/sup', {
    title: 'sign up',
    name: name,
    email: email,
    chk: req.body.chk,
    err: myerr,
  }); //rend
};

router.post('/shop/sup', [defIn, chkIn, sndEma, rcb]);

// === get
//var pcb=function(req,res){res.render('shop/sup', {
//title: 'sign up',
//name:name,email:email,chk:req.body.chk,err:myerr
//});//rend
//}
//router.get('/shop/sup', pcb);

module.exports = router;
