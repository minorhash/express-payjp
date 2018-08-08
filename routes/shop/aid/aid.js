var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var aid = require('aidy');
var taid = aid.tmpAid();

// === put ===

var email, usr, sku, sum,tsum,adr,sson
var mailtmp, mailusr, mailadr,mailson;
var mer = [],  suma = [],  sku_a = []

var getEma = function(req, res, next) {
  email = req.session.email;
  next()};

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next()};

var getAdr = function(req, res, next) {
if(email){    mailadr = adb.mailAdr(email);}
else{console.log(err)}

  if (mailadr == null) {
    console.log('=== adr null ===');
  }
  next();
};

var getTmp = function(req, res, next) {
  try {
    mailtmp = db.mailTmp(email);
  } catch (err) {
    console.log(err);
  }
  next();
};

var putMer = function(req, res, next) {
  for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuMer(mailtmp[i].sku);
    suma[i] = mailtmp[i].uni * mer[i].pri;
  }
  next();
};

var putSum = function(req, res, next) {
  for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuMer(mailtmp[i].sku);
    suma[i] = mailtmp[i].uni * mer[i].pri;
  }
  next();
};

var redSum = function(req, res, next) {
//  for (var i = 0; i < mailtmp.length; i++) {
    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      sum = suma.reduce(getSum);
      tsum=sum+650
    } else {
      console.log('no sum');
    }
//  }
  next();
};

var getTai = function(req, res, next) {
//  console.log('=== getTai ====================================');
  taid.amount = tsum;
  // buyer
  taid.buyer.email = email;
  taid.buyer.name1 = mailusr.name;

  if (!mailadr == null) {
    taid.buyer.phone = mailadr.phn;
  } else {
    console.log('=== mailadr null ===');
  }

  // === buyer_data ===
  var d = new Date();
  taid.buyer_data.age = d.getDate();
  taid.buyer_data.ltv = tsum;
  taid.buyer_data.last_order_amount = tsum;
  taid.buyer_data.last_order_at = d.getDate();
  next();
};

//=============================================== putTai
var putTai = function(req, res, next) {
//  console.log('=== putTai ====================================');

  //
  for (var i = 0; i < mer.length; i++) {
    //
    taid.order.items[i] = {
      id: mer[i].sku.toString(),
      quantity: mailtmp[i].uni,
      title: mer[i].name,
      unit_price: mer[i].pri,
      //
    };
  } //for
  taid.order.shipping = 650;
  if (mailadr) {
    taid.shipping_address.line1 = mailadr.ln1;
    taid.shipping_address.line2 = mailadr.ln2;
    taid.shipping_address.city = mailadr.city;
    taid.shipping_address.state = mailadr.sta;
    taid.shipping_address.zip = mailadr.zip;
  } else {
    console.log('=== mailadr null ===');
  }
  next()};

var fsSon = function(req, res, next) {
//  console.log('=== fsSon ====================================');
  var fs = require('fs');
  var cnf = require('./cnf.json');
  var str = JSON.stringify(taid);

sson=    'var config={"api_key":"' +
    cnf.pub +
    '",' +
    '"closed":function(cb){var xhr = new XMLHttpRequest();' +
    'xhr.open("PUT", "http://localhost:3023/shop/aid/pid", true);' +
    'xhr.setRequestHeader("Content-Type", "application/json");' +
    'xhr.send(JSON.stringify(cb));}};' +
    'var hand=Paidy.configure(config);' +
    'function paidyPay(){' +
    'var load=' +
    str +
    ';' +
    'hand.launch(load);};';

  db.insSon(email, sson);

  fs.stat('public/son/' + email + '.js', function(err,stat) {
console.log(stat.birthtime)
if (err) {return console.log(err);    } 

  fs.unlink('public/son/' + email + '.js',function(err) {
if (err) {return console.log(err);    } 
else {console.log('no err');    }
    console.log('The file was saved!');
  });

  fs.writeFile('public/son/' + email + '.js', sson, function(err) {
if (err) {return console.log(err);    } 
else {console.log('no err');    }
    console.log('The file was saved!');
  });});

  next()};

var chk = function(req, res, next) {
  console.log('=== aid ====================================');
  console.log(email);
//console.log(sson);
//console.log(mailson);
};

router.put('/shop/aid/aid', [
  getEma,
  getUsr,
  getAdr,
  getTmp,
  putMer,
  putSum,
  redSum,
  getTai,
  putTai,
  fsSon,
  chk
]); //put

module.exports = router;
