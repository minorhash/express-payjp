var express = require('express');
var router = express.Router();

var email;

var chk = function(req, res, next) {
    email="jinjasaisen@gmailcom";
console.log(email);

  next()};

var rcb = function(req, res, next) {
    var sku="341";
var fil=sku+".png";
var path="img/cd/"+fil;

var obj={email: email,fil:fil,path:path}
res.download(path)
res.render('shop/dl',obj ); //rend
};
var arr=[chk, rcb]
router.get('/shop/dl',arr ); //

module.exports = router;
