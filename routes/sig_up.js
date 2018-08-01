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

var name, pss, email, chk, myerr;
// === post ===

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  var name = req.body.name;
  var pss = req.body.pss;
  var email = req.body.email;
  var chk = req.body.chk;
  next();
};

// === insert
var chkIn = function(req, res, next) {
  console.log('=== chkIn ===');
  if (name && pss && email && chk == 'yes') {
    try {
      db.insUsr(name, pss, email);
      console.log('=== ins!!! ===');
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no input');
  }
  next();
};

var chkChk = function(req, res, next) {
  if (!chk) {
    console.log('=== not agreed. ===');
    res.redirect('shop');
  } else {
    console.log('agreed');
  }
  next();
};

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
  if (mailusr.name == name && mailusr.pss == pss && mailusr.email == email) {
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
  } //if
  next();
}; //sndEma

var rcb = function(req, res) {
  res.render('sig_up', {
    title: 'sign up',
    name: name,
    email: email,
    chk: req.body.chk,
    err: myerr,
  }); //rend
};

router.post('/sig_up', [defIn, chkIn, chkChk, chkUsr, sndEma, rcb]);

// === get
//var pcb=function(req,res){res.render('shop/sig_up', {
//title: 'sign up',
//name:name,email:email,chk:req.body.chk,err:myerr
//});//rend
//}

//router.get('/shop/sig_up', pcb);

module.exports = router;
