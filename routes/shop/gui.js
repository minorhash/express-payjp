var express = require('express');
var router = express.Router();
// == sess =============================

// === get ============================

var chk = function(req, res, next) {
  console.log('===email');
  console.log(email);
  console.log(usr);
  next();
}; //chkEma

var rcb = function(req, res) {
  res.render('shop/guide', {
    title: 'guide',
  });
};
router.get('/shop/guide', [rcb]);

module.exports = router;
