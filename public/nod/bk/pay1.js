var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcRzUqKVc52MjXwttJAq3-6rirhl0jqWE0j5rVmwlf_l1Nf8yoNvAaygL3b8znQcm9f63hFzPTqWtso-',
  'client_secret': 'EL805GY8lIoLFzcG26ca149pqSegPzIy0F0vh4gqxq9GdxHe7Zb76FCyIdnwMNdoGKrhWSd_FwoqOPpo'
});

var create_payment_json = {
 "intent": "sale",
 "payer": {
  "payment_method": "paypal"
 },
 "redirect_urls": {
  "return_url": "http://localhost:3001/success",
  "cancel_url": "http://localhost:3001/cancelled"
 },
"transactions": [{
"item_list": {
"items": [{
"name": "pand ost",
"sku": "tms328",
"price": "3000.00",
"currency": "JPY",
"quantity": 100
}]
  },
"amount": {
"currency": "JPY",
"total": "3000.00"
  },
  "description": "This is the payment description."
 }]
};
 
//var jsonfile = require('jsonfile')

//var file = 'data.json'
//var obj = {name: 'JP'}
//
//jsonfile.writeFile(file, obj, function (err) {
//  console.error(err)
//});

//console.log(__dirname);

paypal.payment.create(create_payment_json, function (error, payment) {
if (error) {
throw error;
} else {
//console.log("Create Payment Response");
//console.log(payment.transactions[0].item_list.items[0].name);
console.log(payment);     

}
});
