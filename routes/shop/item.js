var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var str = crypto
  .createHash('md5')
  .update(Math.random().toString())
  .digest('hex');
//console.log(str)

var email, usr, sku, skumer, myerr, mailusr, mailtmp, skuson, obj, len;
var pic="";
// === post =============================
var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next();
};


var getSku = function(req, res, next) {
sku = req.body.sku;
//sku=3411
  if (sku) {
    try {      skumer = db.skuMer(sku);
    } catch (err) {      console.log(err);    }
  } else {    console.log('no sku');  }
console.log(skumer);
//console.log(__dirname+"/public/img/cd/"+sku+".png");
  next()}; //getSku

var chkImg= function(req, res, next) {

var fs=require("fs");
var path="public/img/cd/"+sku+".png";
fs.exists(path, function(exists){
if(exists){
pic=sku+".png"
console.log(pic)
}else{

pic="no.png";
console.log(pic)
}
});

  next()}; //chkImg

var getSon = function(req, res, next) {
  try {    skuson = db.skuSon(sku);
  } catch (err) {    console.log(err);  }
  if (skuson) {
    obj = JSON.parse(skuson.song);
    len = Object.keys(obj).length;
  } else {    console.log('no skuson');
  }
  next()};

var chk = function(req, res, next) {
  console.log(sku);
  console.log(skuson);
  console.log(obj);
  console.log(len);
  next();
};
// === rend
var rcb = function(req, res) {
  rob = { title: 'items', usr: usr, mer: skumer, song: obj, pic:pic,err: myerr };
  res.render('shop/item', rob);
}; //rcb

router.post('/shop/item:id', [getEma, getUsr, getSku, getSon, chkImg,chk, rcb]);
module.exports = router;
