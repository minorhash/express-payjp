var express = require('express');
var router = express.Router();
var pid = 'pay_WvLwQE4AAFQAfg46';
var url = 'https://api.paidy.com/payments/' + pid;
var sec = 'sk_test_qbmquibktb7s3n4dov1mdihod3';

var db = require('btdb');
var usr = 'やまだ たろう';

// === post ===
router.post('/add', function(req, res, next) {
  var sku = req.body.sku;
  var uni = req.body.uni;

  if (sku) {
    var skumer = db.skuMer(sku);
  }

  var seltmp = db.selTmp(usr);
  for (var i = 0; i < seltmp.length; i++) {
    console.log(seltmp[i].sku);
    if (uni !== 0) {
      if (!seltmp[i].sku) {
        db.insTmp(usr, sku, uni);
      } else {
        db.updTmp(uni, usr, sku);
      } //
    } //if uni!==0
  } //for

  var skutmp = db.skuTmp(sku);
  console.log(skutmp);
  var skumer = db.skuMer(skutmp.sku);
  console.log(skumer);

  res.render('add', {
    title: 'add',
    usr: usr,
    sku: sku,
    skutmp: skutmp,
    skumer: skumer,
  });
});

module.exports = router;
