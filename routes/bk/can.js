var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cancel', {
    title: 'キャンセルされました',
    tok: req.body.token,
  });
});

module.exports = router;
