var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('aidb');
var aid = require('aidy');
var taid = aid.tmpAid();

// === get ===
router.get('/aid', function(req, res, next) {
  var fs = require('fs');

  var email = req.cookies.cmail;
  var madr = adb.mailAdr(mail);

  res.render('aid', {
    title: 'aid',
  });
}); //get

// === put ===
router.put('/aid', function(req, res, next) {
  var email = req.cookies.cmail;
  var musr = adb.mailUsr(email);
  var madr = adb.mailAdr(email);
  var usr = musr.name;

  var mailtmp = db.mailTmp(email);

  var suma = [];
  var mer = [];
  // sum
  if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
      mer.push(db.skuMer(mailtmp[i].sku));
      suma.push(mailtmp[i].uni * mer[i].pri);
    }

    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      var sum = suma.reduce(getSum);
    } else {
      console.log('no sum');
    }
  } else {
    console.log('no mailtmp');
  }

  // taid
  var pub = 'pk_test_pvve8rdmjtcqbjejq4idolh8l9';
  // === amount ===
  taid.amount = sum;

  // === buyer ===
  taid.buyer.email = email;
  taid.buyer.name1 = musr.name;
  taid.buyer.phone = musr.phn;
  // === buyer_data ===
  var d = new Date();
  taid.buyer_data.age = d.getDate();
  taid.buyer_data.ltv = sum;
  taid.buyer_data.last_order_amount = sum;
  taid.buyer_data.last_order_at = d.getDate();
  //// === items ===

  //console.log(taid);
  for (var i = 0; i < mer.length; i++) {
    taid.order.items.push({
      id: mer[i].sku.toString(),
      quantity: mailtmp[i].uni,
      title: mer[i].name,
      unit_price: mer[i].pri,
    });
  } //for
  //taid.order.shipping=500;
  taid.shipping_address.line1 = 'nakano';
  taid.shipping_address.line2 = '3-1-3';
  taid.shipping_address.city = 'nakano-ku';
  taid.shipping_address.state = 'tokyo';
  taid.shipping_address.zip = '106-0001';

  var fs = require('fs');
  var str = JSON.stringify(taid);
  console.log(str);
  var st2 =
    'var config={"api_key":"' +
    pub +
    '",' +
    '"closed":function(cb){var xhr = new XMLHttpRequest();' +
    'xhr.open("PUT", "http://localhost:3022/pid", true);' +
    'xhr.setRequestHeader("Content-Type", "application/json");' +
    'xhr.send(JSON.stringify(cb));}};' +
    'var hand=Paidy.configure(config);' +
    'function paidyPay(){' +
    'var load=' +
    str +
    ';' +
    'hand.launch(load);};';

  fs.writeFile('public/son/' + email + '.js', st2, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
  //console.log(taid);
}); //put

module.exports = router;
