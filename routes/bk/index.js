var express = require('express');
var router = express.Router();
//var session = require('express-session');

/* GET home page. */
//var ses;

router.get('/', function(req, res, next) {
  //var ses=req.session;
  if (typeof ses !== 'undefined') {
    var usr = ses.usr;
    console.log('usr:' + usr);
  } else {
    var usr = 'no usr';
    console.log(usr);
  }
  res.render('index', {
    title: 'top',
    usr: usr,
  });
});

//router.post('/', function(req, res, next) {
//
//if(req.session){
//var usr=ses.usr;
//}else{
//usr="no ses";
//}
//
//res.render('index', {
//title:"top",
//ses:usr
//});
//});

module.exports = router;
