var express = require('express');
var router = express.Router();
// === glob
var pid, str;
// === cli
var Client = require('node-rest-client').Client;
var client = new Client();
var sec = 'sk_test_qbmquibktb7s3n4dov1mdihod3';
var args = {
  headers: { 'Content-Type': 'application/json' },
  headers: { 'Paidy-Version': '2016-07-01' },
  headers: { Authorization: 'Bearer ' + sec },
};

var putPid = function(req, res, next) {
  //pid=req.body.id;
  pid = 'pay_Wz8zdysAAF0AirLI';
  next();
};

var getCli = function(req, res, next) {
  client.get('https://api.paidy.com/payments/' + pid, args, function(dat, res) {
    str = JSON.stringify(dat);
    console.log(dat.amount);
  });
  next();
};

var chk = function(req, res, next) {
  console.log('=== pid');
  console.log(pid);
};

router.put('/shop/pid', [putPid, getCli, chk]);
module.exports = router;
