var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var idy = require('aidy');
var taid = idy.tmpAid();

// === post ============================
var email, usr, sku, uni, sum, tsum;
var mailtmp, mailusr, mailadr;
var mer = [],
  suma = [],
  skua = [],
  unia = [],
  numa = [];
var emp, ind;

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
    console.log('no cook');
  }
  next();
};

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    usr = mailusr.name;
  } else {
    usr = null;
    console.log('no usr');
  }
  next();
};

var getTmp = function(req, res, next) {
  if (email) {
    try {
      mailtmp = db.mailTmp(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no mail');
  }
  db.delUni();
  next();
};

var getAdr = function(req, res, next) {
  if (email) {
    try {
      mailadr = adb.mailAdr(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no mail');
  }
  if (mailadr == undefined) {
    res.redirect('adr');
  }
  next();
};

// === sum
var putSum = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer[i] = db.skuMer(mailtmp[i].sku);
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {
    console.log('no mailtmp');
  }
  console.log('=== putSum ===');
  next();
};

var redSum = function(req, res, next) {
  function getSum(total, num) {
    return total + num;
  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);
    console.log('sum:' + sum);
  } else {
    console.log('no sum');
  }
  next();
};

// === add item ===
var putSku = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      skua[i] = mailtmp[i].sku;
      unia[i] = mailtmp[i].uni;
    } //for
    console.log('=== put sku ===');
    console.log(unia);
  } else {
    console.log('no mailtmp');
  }

  next();
};

var empCar = function(req, res, next) {
  if (req.body) {
    emp = req.body.emp;
  } else {
    console.log('no body');
  }

  next();
};

var chk = function(req, res, next) {
  console.log('=== paidy ===');
  console.log(mailtmp);
  //console.log(mailadr)
  //console.log(mailusr)
  next();
};

// === rend

var pcb = function(req, res, next) {
  res.render('shop/paidy', {
    seltmp: mailtmp,
    sum: sum,
    tsum: tsum,
    mer: mer,
    email: email,
    usr: usr,
  }); //rend
};

router.post('/shop/paidy', [
  getEma,
  getUsr,
  getTmp,
  getAdr,
  putSum,
  redSum,
  putSku,
  chk,
  pcb,
]);
//router.post('/shop/paidy', [getEma,getUsr,getTmp,getAdr,putSum,redSum,putSku,chk,pcb])

module.exports = router;
