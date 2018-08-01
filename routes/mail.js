var express = require('express');
var router = express.Router();

router.get('/mail', function(req, res, next) {
  res.render('mail', {
    title: 'お問い合わせ',
  });
});

// post =================================
var sub, name, email, mes, opt;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: 'smtp.muumuu-mail.com',
  port: 465,
  tls: true,
  auth: {
    user: 'info@tmsmusic.tokyo',
    pass: 'hash2010',
  },
});

var getReq = function(req, res, next) {
  var mik = require('mikanjs');
  sub = req.body.sub;
  name = req.body.name;
  email = req.body.mail;
  mes = req.body.message;
  //mes2=mik(mes)
  mes2 = mes.replace(/。/g, '。<br>');

  next();
};

var putOpt = function(req, res, next) {
  opt = {
    from: email,
    to: 'matsuo@tms-e.co.jp',
    cc: 'matsuo@tms-e.co.jp,matsuo.tms@gmail.com',
    subject: 'タイトル:' + sub,
    html:
      '名前:' +
      name +
      '<br>' +
      'email:' +
      email +
      '<br>' +
      'メッセージ:' +
      '<br>' +
      mes2,
  };
  next();
};

var sndEma = function(req, res, next) {
  try {
    transporter.sendMail(opt, function(err) {
      if (err) return next(err);
      res.redirect('/done');
    });
  } catch (err) {
    console.dir(err);
  }
};

router.post('/mail', [getReq, putOpt, sndEma]); //post

// get done =================================
router.get('/done', function(req, res, next) {
  res.render('done', {
    title:
      'お問い合わせを受け付けました。後ほど担当の者よりご連絡させて頂きます。',
  });
});

/* GET home page. */

module.exports = router;
