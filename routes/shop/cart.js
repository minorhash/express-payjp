var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var idy = require('aidy');
var taid = idy.tmpAid();

var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
// === get ============================
var email, usr, sku, uni, sum,tsum, num, myerr;
var mailtmp, mailusr;
var mer = [],
  suma = [],
  sku_a = [];

var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next();
};

var getTmp = function(req, res, next) {
  mailtmp = [];
  if (email) {
    try {
      mailtmp = db.mailTmp(email);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no mail');
  }
  next();
};

var putMer = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      console.log(mailtmp[i].sku);
      mer[i] = db.skuMer(mailtmp[i].sku);
    }
  } else {
    console.log('no mailtmp');
  }
  console.log('=== putMer ===');
  next();
};

var putSum = function(req, res, next) {
  suma = [];
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {
    console.log('no mailtmp');
  }
  console.log('=== putSum ===');
  next();
};

var redSum = function(req, res, next) {
  sum = '',tsum="";
  function getSum(total, num) {
    return total + num;
  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);
    tsum=sum+650
    console.log('tsum:' + tsum);
  } else {
    console.log('no sum');
  }
  next();
};

// ====== post ===============================

// === add item ===

var getIte = function(req, res, next) {
  if (req.body) {
    uni = req.body.uni;
    sku = req.body.sku;
  } else {
    console.log('no bod');
  }
  next();
};

var putSku = function(req, res, next) {
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      sku_a[i] = mailtmp[i].sku;
    } //for
  } else {
    console.log('no mailtmp');
  }
  next();
};

var insUpd = function(req, res, next) {
  if (req.body.sku) {
    num = parseInt(sku);
    var ind = sku_a.indexOf(num);
    console.log(ind);
    if (ind == -1) {
      db.insTmp(email, sku, uni);
      res.redirect('cart');
    } else {
      db.updTmp(uni, email, sku);
      res.redirect('cart');
    } //ind
  } else {
    console.log('no body.sku');
  }

  next();
}; //insUpd

// === clr ===============================
var clrEma = function(req, res, next) {
  if (req.body.clr == 'yes') {
    db.delEma(email);
    console.log('=== CLR! ==================');
    //res.redirect("cart")
  } else {
    console.log('no clr');
  }
  next();
};

// === chk ===============================
var chk = function(req, res, next) {
  console.log('=== cart ===================');
  console.log(email);
  console.log(mailtmp);
  ////console.log(sku_a)
  next();
};
// === aid ===============================

var putAid = function(req, res, next) {
  router.put('/shop/aid');
  next();
};

// === rend
var gcb = function(req, res) {
  res.render('shop/cart', {
    seltmp: mailtmp,
    mer: mer,
    sum: sum,
    usr: usr,
    email: email,
  });
};

var pcb = function(req, res, next) {
  res.render('shop/cart', {
    seltmp: mailtmp,
    sum: sum,
    mer: mer,
    usr: usr,
    email: email,
  }); //rend
};

router.get('/shop/cart', [
  getEma,
  getUsr,
  getTmp,
  putMer,
  putSum,
  redSum,
  chk,
  gcb,
]);
router.post('/shop/cart', [
  getEma,
  getUsr,
  getTmp,
  getIte,
  putSku,
  insUpd,
  clrEma,
  chk,
  pcb,
]);

module.exports = router;
