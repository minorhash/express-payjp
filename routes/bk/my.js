var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  var ses = req.session;
  //ses.usr=req.body.usr;
  var usr = ses.usr;
  //console.log("my:"+usr);

  res.render('mypage', {
    title: 'my page',
    usr: req.session.usr,
    uni: req.body.uni,
    item: req.body.item,
  });
});

router.post('/', function(req, res, next) {
  req.session.usr = req.body.usr;

  //console.log(req.session.usr);

  res.render('mypage', {
    title: 'my page',
    usr: req.session.usr,
    uni: req.body.uni,
    item: req.body.item,
  });
});

module.exports = router;
