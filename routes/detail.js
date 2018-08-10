var express = require('express');
var router = express.Router();
// == db =============================
var db = require('cardb');

// ====== get ===============================
router.get('/detail', function(req, res, next) {
  var allmer = db.allMer();
  res.render('detail', {
    title: 'rel',
    arr: allmer,
  }); //rend
}); //get
// ====== post ===============================
router.post('/detail', function(req, res, next) {
  res.render('detail', {
    title: 'rel',
    arr: allmer,
  }); //rend
}); //get

module.exports = router;
