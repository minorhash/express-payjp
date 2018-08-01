var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('aidb');
var idy = require('aidy');
var taid = idy.tmpAid();

// === get ============================
var email,
  usr,
  sku,
  uni,
  sum,
  mailtmp,
  mailusr,
  mer = [],
  suma = [];

var pcb = function(req, res, next) {
  db.delTmp();
  email = req.cookies.cmail;
  console.log('=== cart email');
  console.log(email);
  // usr
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    if (mailusr) {
      mailusr = adb.mailUsr(email);
      usr = mailusr.name;
    } else {
      var err = 'no such usr';
    }

    mailtmp = db.mailTmp(email);
  } else {
    console.log('no email');
  }

  uni = req.body.uni;

  // === sum
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer[i] = db.skuMer(mailtmp[i].sku);
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }

    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      sum = suma.reduce(getSum);
      console.log('sum:' + sum);
    } else {
      console.log('no sum');
    }
  } else {
    console.log('no mailtmp');
  }
  next();
};
// rend
var rcb = function(req, res) {
  res.render('cart', {
    seltmp: mailtmp,
    mer: mer,
    sum: sum,
    usr: usr,
    email: email,
  });
};

router.get('/cart', [pcb, rcb]);

// ====== post ===============================
router.post('/cart', function(req, res, next) {
  var suma = [];
  var mer = [];

  db.delTmp();
  // === email
  var email = req.cookies.cmail;
  if (typeof email !== 'undefined') {
    console.log('email:' + email);

    // === usr
    var mailusr = adb.mailUsr(email);
    var usr = mailusr.name;
    console.log('usr:' + usr);
  } else {
    console.log('no email');
  } //email
  // === tmp
  try {
    var mailtmp = db.mailTmp(email);
  } catch (err) {
    console.log(err);
  }

  // === add item ===
  var uni = req.body.uni;
  var sku = req.body.sku;
  console.log(sku);
  console.log(uni);
  var sku_a = [];

  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      sku_a[i] = mailtmp[i].sku;
    } //for
  }

  console.log(sku_a);
  var num = parseInt(sku);
  var ind = sku_a.indexOf(num);

  if (ind == -1) {
    db.insTmp(email, sku, uni);
    res.redirect('cart');
  } else {
    db.updTmp(uni, email, sku);
    res.redirect('cart');
  } //ind

  // === sum
  function getSum(total, num) {
    return total + num;
  }

  if (typeof mailtmp !== 'undefined') {
    for (var i = 0; i < mailtmp.length; i++) {
      mer[i] = db.skuMer(mailtmp[i].sku);
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
    if (suma.length !== 0) {
      var sum = suma.reduce(getSum);
      console.log(sum);
    } else {
      console.log('no sum');
    }
  } else {
    console.log('no mailtmp');
  }

  // === rend
  res.render('cart', {
    seltmp: mailtmp,
    sum: sum,
    mer: mer,
    usr: usr,
    email: email,
  }); //rend
}); //post

module.exports = router;
