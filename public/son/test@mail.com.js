var config={"api_key":"pk_test_pvve8rdmjtcqbjejq4idolh8l9","closed":function(cb){var xhr = new XMLHttpRequest();xhr.open("PUT", "http://localhost:3023/shop/pid", true);xhr.setRequestHeader("Content-Type", "application/json");xhr.send(JSON.stringify(cb));}};var hand=Paidy.configure(config);function paidyPay(){var load={"amount":750,"currency":"JPY","store_name":"tmStore","buyer":{"email":"test@mail.com","name1":"test","phone":""},"buyer_data":{"age":2,"order_account":0,"ltv":750,"last_order_amount":750,"last_order_at":2},"order":{"items":[{"id":"3411","quantity":1,"title":"ass","unit_price":100}],"shipping":650},"shipping_address":{"line1":"","line2":"","city":"","state":"","zip":""}};hand.launch(load);};