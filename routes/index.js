var express = require('express');
var router = express.Router();

// === get
var cb = function(req, res, next) {
  var robj = {
    title: 'top',
  };
  res.render('index', robj);
};

router.get('/', cb);

module.exports = router;
