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
mnt.total="550";

var obj1={};
obj1.name="panda";
obj1.sku="301";
obj1.price="300";
obj1.quantity="1";
obj1.currency="JPY";

var obj2={};
obj2.name="holmes";
obj2.sku="302";
obj2.price="250";
obj2.quantity="1";
obj2.currency="JPY";

//console.dir(obj1);
ite.push(obj1);
ite.push(obj2);

var len=ite.length;
console.dir("items:"+len);
console.dir(ite);

paypal.payment.create(obj, function (error, payment) {
if (error) {
console.log(error.response);
throw error;
} else {
for (var index = 0; index < payment.links.length; index++) {
////Redirect user to this endpoint for redirect url
if (payment.links[index].rel === 'approval_url') {
console.dir("link:");
console.log(payment.links[index].href);
}
}
var wri= 'json/wri.json';
//console.log("Create Payment Response");
console.log(payment);
jsonfile.writeFile(wri, payment,{spaces:2}, function (err) {
if(err)
console.error(err)
});
}
});
