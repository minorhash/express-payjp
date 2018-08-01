var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('aidb');
var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
console.log(str);

// === post =============================

var usr, skumer, email, myerr, rob;
var pcb = function(req, res, next) {
  var sku = req.body.sku;
  if (sku) {
    try {
      skumer = db.skuMer(sku);
      //    console.log(skumer);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('no sku');
  }
  // === usr
  if (req.cookies.cmail) {
    email = req.cookies.cmail;
  } else {
    console.log('no cookie');
  }

  if (email) {
    try {
      var mailusr = adb.mailUsr(email);
      usr = mailusr.name;
    } catch (err) {
      myerr = err;
      console.log(err);
    }
  } else {
    console.log('no email');
  }

  console.log(myerr);
  rob = { title: 'items', usr: usr, mer: skumer, err: myerr };
  next();
}; //pcb
// === rend
var rcb = function(req, res) {
  res.render('item', rob);
};

router.post('/item:id', [pcb, rcb]);
module.exports = router;
