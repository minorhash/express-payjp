/* Copyright 2015-2016 PayPal, Inc. */
var paypal = require('paypal-rest-sdk');

paypal.configure({
'mode': 'sandbox', //sandbox or live
'client_id': 'AcRzUqKVc52MjXwttJAq3-6rirhl0jqWE0j5rVmwlf_l1Nf8yoNvAaygL3b8znQcm9f63hFzPTqWtso-',
'client_secret': 'EL805GY8lIoLFzcG26ca149pqSegPzIy0F0vh4gqxq9GdxHe7Zb76FCyIdnwMNdoGKrhWSd_FwoqOPpo'
});

var jsonfile = require('jsonfile');
var rea="json/rea.json";
var cre=jsonfile.readFileSync(rea);

console.log(cre);
//var execute_payment_json = {
//
//"payer_id":  str,
//"transactions": [{
//"amount": {
//"currency": "JPY",
//"total": "3000"
//}
//}]
//};
//
//
//var pid = payid.id;
//
//paypal.payment.execute(pid, execute_payment_json, function (error, payment) {
//if (error) {
//console.log(error.response);
//throw error;
//} else {
//console.log("Get Payment Response");
//console.log(JSON.stringify(payment));
//}
//});
