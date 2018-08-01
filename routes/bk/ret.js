var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ret', {
    title: 'Exps',
    tit: '音楽',
  });
});

module.exports = router;
