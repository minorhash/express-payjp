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

router.post('/', function(req, res, next) {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3001/success',
      cancel_url: 'http://localhost:3001/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'ホームズ ost',
              sku: 'tms302',
              price: '250',
              currency: 'JPY',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'JPY',
          total: '250',
        },
        description: 'Hat for the best team ever',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

module.exports = router;
