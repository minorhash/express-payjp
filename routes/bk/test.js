var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('test', {
    title: 'test',
  });
});

module.exports = router;
