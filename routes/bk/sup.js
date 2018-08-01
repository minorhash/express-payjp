var express = require('express');
var router = express.Router();
// == mail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(
  smtpTransport({
    host: 'smtp.muumuu-mail.com',
    port: 465,
    //    tls: true,
    auth: { user: 'info@tmsmusic.tokyo', pass: 'hash2010' },
  })
);
// === db
var db = require('aidb');

// === post ===
var pcb = function(req, res, next) {
  var name = req.body.name;
  var pss = req.body.pss;
  var email = req.body.email;
  var chk = req.body.chk;
  var myerr;

  if (name && pss && email && chk == 'yes') {
    try {
      db.insUsr(name, pss, email);
    } catch (err) {
      myerr = err;
    }
  } else {
    myerr = 'no input';
  }

  if (chk == 'no') {
    myerr = 'not agreed. ';
    res.redirect('shop');
  }
  // === insert
  if (email) {
    try {
      var mailusr = db.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no req.body.email');
  }

  if (mailusr.name == name && mailusr.pss == pss && mailusr.email == email) {
    try {
      var mes = 'message';
      transporter.sendMail({
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
      });
    } catch (err) {
      console.dir(err);
    }
  } //if

  res.render('sup', {
    title: 'sign up',
    name: name,
    email: email,
    chk: req.body.chk,
    err: myerr,
  }); //rend
};

router.post('/sup', pcb);

module.exports = router;
