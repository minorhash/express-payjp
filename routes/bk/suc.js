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

router.get('/', function(req, res, next) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'JPY',
          total: '300',
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      var str = JSON.stringify(payment);
      console.log(JSON.stringify(payment));
      //        res.send('Success');
      res.render('success', {
        title: 'ご購入ありがとうございました。',
        name: payment.payer.payer_info.shipping_address.recipient_name,
        mail: payment.payer.payer_info.email,
        line1: payment.payer.payer_info.shipping_address.line1,
        post: payment.payer.payer_info.shipping_address.postal_code,
        state: payment.payer.payer_info.shipping_address.state,
        //
        mnt: payment.transactions[0].amount.total,
        item_name: payment.transactions[0].item_list.items[0].name,
      });
    }
  });
});

module.exports = router;
