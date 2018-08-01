var express = require('express');
var router = express.Router();

var session = require('express-session');
var key = {
  secret: 'keyboard cat',
  resave: false,
  unset: 'destroy',
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 },
};
router.use(session(key));

/* get */
router.get('/', function(req, res, next) {
  if (typeof ses !== 'undefined') {
    usr = ses.usr;

    //console.log("usr:"+usr);
  } else {
    usr = 'no usr';
  }
  //console.log("my page");

  res.render('mypage', {
    title: 'mypage',
    usr: usr,
  });
});

// ==== POST ====
router.post('/', function(req, res, next) {
  var myerr = err.message;

  res.render('mypage', {
    title: usr,
    usr: usr,
  }); //rend
}); //post

module.exports = router;
