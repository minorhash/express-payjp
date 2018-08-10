const paypal = require('paypal-rest-sdk');
var cnf=require("../son/pal.json")

paypal.configure({
  mode: cnf.MODE,
  client_id:cnf.ID,
  client_secret:cnf.SEC
});
