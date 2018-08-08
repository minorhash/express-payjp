var express = require('express');
var router = express.Router();

// glob =================================
var sub, name, email, mes, opt;
var ema=require("./shop/son/ema.json")

var getReq = function(req, res, next) {
  sub = req.body.sub;
  name = req.body.name;
  email = req.body.mail;
  mes = req.body.message;
  //mes2=mik(mes)
//  mes2 = mes.replace(/。/g, '。<br>');

  next();
};

var senEma = function(req, res, next) {
  console.log('=== senEma =======================================');
  var snem = require('snd-ema');
  var sub = 'sub:' + usr;

snem.trEma(   ema.HOST,    ema.USR,   ema.PSS,    email,   ema.EMA1,    sub,    mes  );
      res.redirect('/done');
  next()};

var sndEma = function(req, res, next) {
  try {
    transporter.sendMail(opt, function(err) {
      if (err) return next(err);
      res.redirect('/done');
    });
  } catch (err) {    console.dir(err);  }
};

router.post('/mail', [getReq, senEma]); //post

// get done =================================
router.get('/done', function(req, res, next) {
  res.render('/done', {
    title:
      'お問い合わせを受け付けました。後ほど担当の者よりご連絡させて頂きます。',
  });
});

/* GET home page. */

module.exports = router;
