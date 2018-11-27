var express = require('express');
var router = express.Router();
// glob
var par

var getPar=function(req, res, next) {

par=req.params.id
next()}


var chk=function(req, res, next) {

console.log(par)
next()}

// get
var gcb= function(req, res, next) {

res.render("page", {
title: par,
par:par,

});
}

router.get('/page-:id', [getPar,chk,gcb])
// post


module.exports = router;
