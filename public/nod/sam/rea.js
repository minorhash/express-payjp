var paypal = require('paypal-rest-sdk');

paypal.configure({
'mode': 'sandbox', //sandbox or live
'client_id': 'AcRzUqKVc52MjXwttJAq3-6rirhl0jqWE0j5rVmwlf_l1Nf8yoNvAaygL3b8znQcm9f63hFzPTqWtso-',
'client_secret': 'EL805GY8lIoLFzcG26ca149pqSegPzIy0F0vh4gqxq9GdxHe7Zb76FCyIdnwMNdoGKrhWSd_FwoqOPpo'
});

var jsonfile = require('jsonfile');
var tmp= 'json/tmp.json';

var obj=jsonfile.readFileSync(tmp);
var trans=obj.transactions[0];
var ite=trans.item_list.items;
var mnt=trans.amount;

var obj1={};
obj1.name="panda";
obj1.sku="301";
obj1.price="300";
obj1.quantity="1";
obj1.currency="JPY";

var obj2={};
obj2.name="holmes";
obj2.sku="302";
obj2.price="3";
obj2.quantity="1";
obj2.currency="USD";

//console.dir(obj1);
ite.push(obj1);
ite.push(obj2);

var len=ite.length;
console.dir("items:"+len);
console.dir(ite);

paypal.payment.create(obj, function (error, payment) {
if (error) {
throw error;
} else {
var wri= 'json/wri.json';
//console.log("Create Payment Response");
console.log(payment);
jsonfile.writeFile(wri, payment,{spaces:2}, function (err) {
if(err)
console.error(err)
});
}
});
