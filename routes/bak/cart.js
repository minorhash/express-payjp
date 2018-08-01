var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('aidb');
var idy = require('aidy');
var taid = idy.tmpAid();

// === get ============================
db.delTmp();
var myerr,
  email,
  usr,
  sum,
  suma,
  mailusr,
  mailtmp,
  suma = [],
  mer = [];

var getEma = function(req, res, next) {
  if (req.cookies.cmail) {
    email = req.cookies.cmail;
  } else {
    console.log('no cook');
  }
  next();
}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
      if (mailusr) {
        mailusr = adb.mailUsr(email);
        usr = mailusr.name;
      } else {
        var err = 'no such usr';
      }
    } catch (err) {
      myerr = err;
      console.log(err);
    }
  } else {
    console.log('no email');
  }
  next();
}; //getUsr

var getTmp = function(req, res, next) {
  try {
    mailtmp = db.mailTmp(email);
  } catch {
    myerr = err;
  }
}; //getTmp

var pusSum = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer.push(db.skuMer(mailtmp[i].sku));
      suma.push(mailtmp[i].uni * mer[i].pri);
    }
    console.log(suma);
  } else {
    console.log('no mailtmp');
  }
  next();
}; //pus

var getSum = function(req, res, next) {
  var red = (tot, num) => tot + num;
  if (suma.length !== 0) {
    sum = suma.reduce(red);
  } else {
    console.log('no sum');
  }
  next();
}; //getSum

var chkSum = function(req, res, next) {
  console.log('=== sum');
  console.log(sum);
  next();
}; //chkSum

var rcb = function(req, res) {
  res.render('cart', {
    seltmp: mailtmp,
    mer: mer,
    sum: sum,
    usr: usr,
    email: email,
    err: myerr,
  });
}; //rend

router.get('/cart', [getEma, getUsr, getTmp, getSum, chkSum, rcb]); //end get

// ====== post ===============================
var sku,
  uni,
  usr,
  email,
  mailusr,
  mailtmp,
  suma = [],
  mer = [],
  sku_a = [];

db.delTmp();
// === email
var getEma = function(req, res, next) {
  if (req.cookies.cmail) {
    email = req.cookies.cmail;
  } else {
    console.log('no cookie');
  }
  next();
}; //getEma 1

var getUsr = function(req, res, next) {
  if (email) {
    mailusr = adb.mailUsr(email);
    usr = mailusr.name;
    console.log('usr:' + usr);
  } else {
    console.log('no email');
  } //email
  next();
}; //getUsr 2

// === add item ===
var chkIte = function(req, res, next) {
  if (req.body) {
    (uni = req.body.uni),
      (sku = req.body.sku),
      console.log(uni),
      console.log(sku);
  } else {
    console.log('no req body');
  }
  next();
}; //chkIte 3

var getTmp = function(res, req, next) {
  try {
    mailtmp = db.mailTmp(email);
  } catch (err) {
    console.log(err);
  }
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      sku_a[i] = mailtmp[i].sku;
    } //for
  } else {
    console.log('no mailtmp');
  } //mailtmp
  next();
}; //getTmp

var insUp = function(req, res, next) {
  var num = parseInt(sku);
  var ind = sku_a.indexOf(num);
  console.log(ind);
  // === ins or upd
  if (ind == -1) {
    try {
      db.insTmp(email, sku, uni);
    } catch (err) {
      console.log(err);
    }
    //res.redirect("cart")
  } else {
    try {
      db.updTmp(uni, email, sku);
    } catch (err) {
      console.log(err);
    }
    //res.redirect("cart")
  } //ind
  next();
}; //insUp

var pusSum = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer.push(db.skuMer(mailtmp[i].sku));
      suma.push(mailtmp[i].uni * mer[i].pri);
    }
    console.log(suma);
  } else {
    console.log('no mailtmp');
  }
  next();
}; //pus

var redSum = function(req, res, next) {
  var red = (tot, num) => tot + num;
  if (suma.length !== 0) {
    sum = suma.reduce(red);
    console.log(sum);
  } else {
    console.log('no sum');
  }
}; //redSum

var rcb = function(req, res) {
  var rob = { seltmp: mailtmp, sum: sum, mer: mer, usr: usr, email: email };
  res.render('cart', rob); //rend
}; //rcb

router.post('/cart', [
  getEma,
  getUsr,
  chkIte,
  getTmp,
  insUp,
  pusSum,
  redSum,
  rcb,
]); //post

module.exports = router;
