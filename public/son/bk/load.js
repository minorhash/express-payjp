var config={"api_key":"pk_test_pvve8rdmjtcqbjejq4idolh8l9",
"closed":function(cb) {var xhr = new XMLHttpRequest();
xhr.open("POST",
 "http://localhost:3022/cart",
 true);
xhr.setRequestHeader('Content-Type',
 'application/json');
xhr.send()}};
var hand=Paidy.configure(config);
{var load={"amount":3000,
"currency":"JPY",
"store_name":"tmStore",
"buyer":{"email":"successful.payment@paidy.com",
"name1":"さくせす たろう",
"phone":"08000000001"},
"buyer_data":{"age":1527592615044,
"order":"0",
"ltv":3000,
"last_order_amount":3000,
"last_order_at":1527592615044},
"order":{"items":[{"id":"328",
"quantity":1,
"title":"アクセルどらま!「青春のSHOOTING STAR」",
"unit_price":2000},
{"id":"333",
"quantity":1,
"title":"「スペシャルアドベンチャー／With You」（通常盤TypeA）",
"unit_price":1000}],
"shipping":""},
"shipping_address":{"line1":"AXISビル 10F",
"line2":"六本木4-22-1",
"city":"みなとく",
"state":"とうきょうと",
"zip":"103-0001"}};
hand.launch(load);
};

