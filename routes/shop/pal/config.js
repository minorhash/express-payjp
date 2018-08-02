const paypal = require('paypal-rest-sdk');
var cnf=require("./cnf.json")

console.log(cnf.MODE)

paypal.configure({
  mode: cnf.MODE,
  client_id:cnf.ID,
  client_secret:cnf.SEC
});
