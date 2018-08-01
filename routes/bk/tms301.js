var express = require('express');
var router = express.Router();

const crjson = {
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
            name: 'パンダコパンダ ost',
            sku: 'tms301',
            price: '300',
            currency: 'JPY',
            quantity: 1,
          },
        ],
      },
      amount: {
        currency: 'JPY',
        total: '300',
      },
    },
  ],
};

var jsonfile = require('jsonfile');
var non = Math.random()
  .toString(36)
  .substr(2);
var cwd = process.cwd();
var fil = cwd + '/public/log/' + non + '.json';

router.post('/', function(req, res, next) {
  var str = crjson.transactions[0].amount.total;
  res.render('tms301', {
    title: 'tms301',
    trans: str,
  });
  console.log(cwd + '/public/log');
  console.log(non);
  console.log(str);
  //jsonfile.writeFile(fil, crjson, function (err) { console.error(err) });
});

module.exports = router;
