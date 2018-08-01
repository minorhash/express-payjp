var config={"api_key":"pk_test_pvve8rdmjtcqbjejq4idolh8l9",
"closed": function(cb) {
//var xhr = new XMLHttpRequest();
//xhr.open("PUT", "http://localhost:3002/aid", true);xhr.setRequestHeader('Content-Type', 'application/json');
//var str = JSON.stringify(cb);
//console.log(str);
//xhr.send();
}};
 var hand=Paidy.configure(config);
function paidyPay(){var load={
   "amount":2000, 
    "currency":"JPY",
"store_name":"tmStore",
"buyer":{"email":"yamada@mail.com",
"name1":"やまだ たろう",
"name2":"ヤマダ タロウ",
"phone":"0801234567"},
"buyer_data":{"age":1526607192913,
"order_count":0,
"ltv":0,
"last_order_amount":0,
"last_order_at":1526607192913},
"order":{"items":[{"id":328,
"quantity":1,
"title":"アクセルどらま!「青春のSHOOTING STAR」",
"unit_price":2000}]},
"shipping_address":{"line1":"AXISΝ 10",
"line2":"ろっぽんぎ4-22-1",
"city":"みなとく",
"state":"とうきょうと",
"zip":"1062004"}};
hand.launch(load);
};

