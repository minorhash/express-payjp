var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'log in',
  });
});

router.post('/', function(req, res, next) {
  res.render('login', {
    title: 'log in',
  });
});
module.exports = router;
