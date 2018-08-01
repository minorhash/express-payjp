var express = require('express');
var router = express.Router();
// === db
var db = require('usrdb');
// === glob

var name, pss, email, reg, mailadr;
var phn, zip, pref, sta, city, ln1, ln2, chk;
// === post ===

var defIn = function(req, res, next) {
  console.log('=== defin ===');
  email = req.body.email;
  // === adr
  phn = req.body.phn;
  zip = req.body.zip;
  pref = req.body.pref;
  sta = req.body.sta;
  city = req.body.city;
  ln1 = req.body.ln1;
  ln2 = req.body.ln2;
  chk = req.body.chk;
  // === cons
  console.log(req.body);
  console.log(phn, zip, pref, sta, city, ln1, ln2, chk);
  next();
};

var emaAdr = function(req, res, next) {
  if (email) {
    mailadr = db.emaAdr(email);
    console.log(mailadr);
  } else {
    console.log('no ema adr');
  }

  next();
};
// === insert
var insAdr = function(req, res, next) {
  console.log('=== chkIn ===');
  if (mailadr) {
    console.log('adr already');
  } else {
    if (phn && zip && pref && sta && city && ln1 && ln2 && chk == 'yes') {
      try {
        db.insAdr(email, phn, zip, pref, sta, city, ln1, ln2);
        console.log('=== ins!!! ===');
        reg = 'ご登録ありがとうございます。';
      } catch (err) {
        console.log(err);
        reg = 'err';
      }
    } else {
      console.log('no input');
    }
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

var senEma = function(req, res, next) {
  console.log('=== senEma =======================================');
  var snem = require('snd-ema');
  var sub = 'sub:' + usr;
  mes = [];
  arr = [];
  for (var i = 0; i < oite.length; i++) {
    arr[i] =
      'thank you for shopping.<br>' +
      oite[i].id +
      '<br>' +
      oite[i].title +
      '<br>' +
      "<img src='https://3axe.tmsmusic.tokyo/img/cd/" +
      oite[i].id +
      ".png'><br>";
    //mes=oite[i].id+":"+oite[i].title
  }
  mes = JSON.stringify(arr)
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/\"/g, '')
    .replace(/\,/g, '');
  console.log(arr);

  snem.trEma(
    'smtp.muumuu-mail.com',
    'info@tmsmusic.tokyo',
    'hash2010',
    email,
    'matsuo@tms-e.co.jp',
    sub,
    mes
  );
  next();
};

var rcb = function(req, res) {
  res.render('shop/adr_reg', {
    title: 'address registered',
    name: name,
    email: email,
    chk: req.body.chk,
    reg: reg,
  }); //rend
};

router.post('/shop/adr_reg', [defIn, emaAdr, insAdr, senEma, rcb]);

module.exports = router;
