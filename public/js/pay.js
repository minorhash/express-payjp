var config = {
"api_key": "pk_test_pvve8rdmjtcqbjejq4idolh8l9",
"closed": function(cb) {
//Data returned in the callback:
cb.id
//callbackData.amount,
//callbackData.currency,
//callbackData.created_at,
//callbackData.status 
}
};
var paidyHandler = Paidy.configure(config); 
function paidyPay() {
 var payload = {
"amount": 100,
"currency" : "JPY",
"store_name": "axell store",
"buyer": {
"email": "successful.payment@paidy.com",
"name1": "山田　太郎",
"name2": "ヤマダ　タロウ",
"phone" : "08000000001",
"dob": "1990-10-25"
},
"buyer_data": {
"age": 29,
"order_count": 1000,
"ltv": 250000,
"last_order_amount": 20000,
"last_order_at": 20
},
"order": {
"items": [
{
"id":"tms341",
"quantity":1,
"title":"shooting star",
"unit_price":100,
"description":" "
}
]
},
"shipping_address": {
     "line1": "AXISビル 10F",
     "line2": "六本木4-22-1",
     "city": "港区",
     "state": "東京都",
     "zip": "106-2004"
}
   };
   paidyHandler.launch(payload);
     };
