var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reg', {
    title: 'sign up',
  }); //rend
}); //get

var Database = require('better-sqlite3');
var db = new Database('public/db/pal1.db');

// ==== POST ====
router.post('/', function(req, res, next) {
  var stm = db.prepare('insert into pal values(?,?,?)');
  stm.run(req.body.usr, req.body.pss, '');

  res.render('reg', {
    title: 'registered',
    usr: req.body.usr,
    pss: req.body.pss,
  }); //rend
}); //post
module.exports = router;
