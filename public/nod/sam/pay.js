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
 
var jsonfile = require('jsonfile');

//console.log(__dirname);
 
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
var file = 'json/pay1.json';
//console.log("Create Payment Response");
//console.log(payment);
jsonfile.writeFile(file, payment,{spaces:2}, function (err) {
if(err)
console.error(err)
});
    }
});
