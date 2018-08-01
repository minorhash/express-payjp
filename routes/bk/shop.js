var express = require('express');
var router = express.Router();
// == sess =============================

var db = require('cardb');
var adb = require('aidb');
var allmer = db.allMer();

// === get ============================
var email, allmer, usr, myerr, mailusr;

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    req.session = null;
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
  } else {
    req.session = null;
    console.log('no email');
  }
  if (mailusr) {
    usr = mailusr.name;
  } else {
    req.session = null;
    usr = null;
    myerr = 'no mailusr';
  }
  next();
};

var chk = function(req, res, next) {
  console.log('===email');
  console.log(email);
  console.log(usr);
  next();
}; //chkEma

var rcb = function(req, res) {
  res.render('shop', {
    title: 'shop',
    mer: allmer,
    usr: usr,
    err: myerr,
  });
};
router.get('/shop', [getEma, getUsr, chk, rcb]);

// == post =============================

var usr, email, allmer, myerr;
var getCok = function(req, res, next) {
  if (req.body) {
    req.session.email = req.body.email;
    email = req.session.email;
  } else {
    console.log('no req.body');
  } //req.body

  next();
}; //getCok

var getUsr = function(req, res, next) {
  if (email) {
    try {
      var mailusr = adb.mailUsr(email);
    } catch (err) {
      myerr = err;
      console.log(err);
    }
    if (mailusr) {
      usr = mailusr.name;
    } else {
      console.log('no usr');
    }
  } else {
    console.log('no email');
  }
  next();
}; //getUsr

var chk = function(req, res, next) {
  console.log(email);
  next();
};

var rcb = function(req, res) {
  var rob = { usr: usr, mer: allmer, err: myerr };
  res.render('shop', rob);
};

router.post('/shop', [getCok, getUsr, chk, rcb]);

module.exports = router;
