var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sig', {
    title: 'sign up',
  }); //rend
}); //get

var ses;

// ==== POST ====
router.post('/', function(req, res, next) {
  var Database = require('better-sqlite3');
  var db = new Database('public/db/pal1.db');

  var row = db.prepare('insert into pal values(?,?,?)');
  stmt.run(req.body.usr, req.body.pss, '');

  res.render('sig', {
    title: 'sign up',
    usr: req.body.usr,
    pss: req.body.pss,
  }); //rend
}); //post
module.exports = router;
