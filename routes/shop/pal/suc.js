var express = require('express');
var router = express.Router();
const paypal = require('paypal-rest-sdk');
var email,mailtmp

var conf=require("./cnf.json")


paypal.configure({
  mode: conf.MODE,
  client_id:conf.ID,
  client_secret:conf.SEC
});

// === db
var db = require('cardb');

// === get
router.get('/shop/paypal/success', function(req, res, next) {
email = req.cookies.cmail;
  if (email) {
mailtmp = db.mailTmp(email);
    // === sum
    var suma = [];
    var mer = [];
    if (mailtmp) {
      for (var i = 0; i < mailtmp.length; i++) {
        mer.push(db.skuMer(mailtmp[i].sku));
        suma.push(mailtmp[i].uni * mer[i].pri);
      } //for
    }else{console.log("no mailtmp")} 

    function getSum(total, num) {
      return total + num;
    }
    if (suma.length !== 0) {
      var sum = suma.reduce(getSum);
      console.log('sum:' + sum);
    } else {
      console.log('no sum');
    }
  } else {
    console.log('no mailtmp');
  }

  //var pid=req.cookies.pid;
  const pid = req.query.paymentId;
  const payerId = req.query.PayerID;

  var execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'JPY',
          total: sum,
        },
      },
    ],
  };

  paypal.payment.execute(pid, execute_payment_json, function(error, payment) {
    if (error) {
      ////console.log(typeof error.response.name);
      res.redirect('/shop');
      //console.log(error.response);
      throw error;
    } else {
      var str = JSON.stringify(payment);

adb.insPal(email,payment.pid)
      //console.log(JSON.stringify(payment));
      res.render('shop/paypal/success', {
        title: 'ご購入ありがとうございました。',
        pid: payerId,
        payid: pid,
      });
    }
  });
});

module.exports = router;
