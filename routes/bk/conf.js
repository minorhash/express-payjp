var express = require('express');
var router = express.Router();
var session = require('express-session');

var Database = require('better-sqlite3');
var db = new Database('public/pay1.db');

/* post  */
router.post('/', function(req, res, next) {
  var jsn = JSON.stringify(req.body);

  try {
    stmt.run(req.body.usr, req.body.pss, '');
  } catch (err) {
    var myerr = err.message;
    var pat = /unique/i;
    var reg = myerr.match(pat);
    console.log(reg[0]);
    //var myerr=reg[0];
    if (reg[0] == 'UNIQUE') {
      var myerr = 'name is already taken';
      console.log('yea');
    }
  }
  console.log(req.body.usr);

  //var stmt = db.prepare('select * from pal').get();
  if (typeof stmt !== null) {
    console.log('usr:' + req.body.usr);
    var title = req.body.usr;
    var pss = req.body.pss;
    var err = res;
  } else {
    var title = 'err';
    var pss = 'no pss';
    var err = myerr;
  }

  res.render('conf', {
    title: title,
    pss: pss,
    err: myerr,
  });
});

//router.get('/', function(req, res, next) {
//console.log(req.session);
//});

module.exports = router;
