var express = require('express');
var router = express.Router();
// == sess =============================

var db = require('cardb');
var adb = require('usrdb');
var allmer = db.allMer();

var email, allmer, usr, myerr, mailusr;
// === get ============================

var chk = function(req, res, next) {
  console.log('===email');
  console.log(email);
  console.log(usr);
  next();
}; //chkEma

var rcb = function(req, res) {
  res.render('shop/note/notation', {
    title: 'noteation',
  });
};
router.get('/shop/note/notation', [rcb]);

module.exports = router;
