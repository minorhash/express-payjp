/* Copyright 2015-2016 PayPal, Inc. */
var paypal = require('paypal-rest-sdk');

paypal.configure({
'mode': 'sandbox', //sandbox or live
'client_id': 'AcRzUqKVc52MjXwttJAq3-6rirhl0jqWE0j5rVmwlf_l1Nf8yoNvAaygL3b8znQcm9f63hFzPTqWtso-',
'client_secret': 'EL805GY8lIoLFzcG26ca149pqSegPzIy0F0vh4gqxq9GdxHe7Zb76FCyIdnwMNdoGKrhWSd_FwoqOPpo'
});

//console.log(__dirname);

var jsonfile = require('jsonfile');
var file = 'pay.json';
var payid=jsonfile.readFileSync(__dirname+'/'+file);
console.log(payid.id);

var create_payment_json = {
    "intent": "authorize",
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
                "name": "item",
                "sku": "item",
                "price": "3000",
                "currency": "JPY",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "JPY",
            "total": "3000"
        },
        "description": "This is the payment description."
    }]
};
var str="";
var jsonfile=require('jsonfile');
paypal.payment.create(create_payment_json, function (error, payment) {
if (error) {
console.log(error.response);
throw error;
} else {
console.log(payment.links[1].href);

str=(payment.links[1].href).substr(77,17);
//console.log(str);
var file = 'payer.json';
jsonfile.writeFile(__dirname+'/'+file, str,{spaces:2}, function (err) {
if(err)
console.error(err)
});

for (var index = 0; index < payment.links.length; index++) {
        //Redirect user to this endpoint for redirect url
if (payment.links[index].rel === 'approval_url') {
//                console.log(payment.links[index].href);
}}//console.log(payment);
}});

console.log(str);

//var file = 'payer.json';
//jsonfile.readFile(__dirname+'/'+file, str,{spaces:2}, function (err) {
//if(err)
//console.error(err)
//});

var execute_payment_json = {

"payer_id":  str,
"transactions": [{
"amount": {
"currency": "JPY",
"total": "3000"
}
}]
};

var paymentId = payid.id;
//
//paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
// if (error) {
//console.log(error.response);
//throw error;
// } else {
//console.log("Get Payment Response");
//console.log(JSON.stringify(payment));
// }
//});
