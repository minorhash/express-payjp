var express = require('express');
var router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', //sandbox or live
  client_id:
    'AcRzUqKVc52MjXwttJAq3-6rirhl0jqWE0j5rVmwlf_l1Nf8yoNvAaygL3b8znQcm9f63hFzPTqWtso-',
  client_secret:
    'EL805GY8lIoLFzcG26ca149pqSegPzIy0F0vh4gqxq9GdxHe7Zb76FCyIdnwMNdoGKrhWSd_FwoqOPpo',
});

// === db
var db = require('cardb');

// === get
router.get('/success', function(req, res, next) {
  var email = req.cookies.cmail;
  if (email) {
    var mailtmp = db.mailTmp(email);
    // === sum
    var suma = [];
    var mer = [];
    if (mailtmp) {
      for (var i = 0; i < mailtmp.length; i++) {
        mer.push(db.skuMer(mailtmp[i].sku));
        suma.push(mailtmp[i].uni * mer[i].pri);
      } //for
    } //if

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
      res.redirect('/');
      //console.log(error.response);
      throw error;
    } else {
      var str = JSON.stringify(payment);
      //console.log(JSON.stringify(payment));
      res.render('success', {
        title: 'ご購入ありがとうございました。',
        pid: payerId,
        payid: pid,
      });
    }
  });
});

module.exports = router;
