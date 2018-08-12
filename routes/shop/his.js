var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('usrdb');

var paypal = require('paypal-rest-sdk');

// === glob ============================
var email, usr, myerr;
var mailusr, selpid, allpid,allpal;
var ite, oite,tok,atok,sid,palid,sit,sitem
var hea
var item=[],aite=[];
// === get ============================
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

//  aid
var allPid = function(req, res, next) {
if(!email){    allpid=[]; oite=[]
console.log('=== no all pid ==================');
}else{

allpid = adb.allPid(email);
for (var i = 0; i < allpid.length; i++) {
ite = allpid[i].ite;
oite = JSON.parse(ite);
}
}
next()}

// === pal
var allPal= function(req, res, next) {
allpal=adb.allPal(email)
atok=[]
for (var i = 0; i < allpal.length; i++) {
atok[i]=allpal[i].tok;
console.log(atok[i])
}
next()}

var getPal= function(req, res, next) {
for(var i=0;i<atok.length;i++){
paypal.payment.get(atok[i],function(err,pay){
console.log(pay.transactions[0].amount)
item.push(pay.transactions[0].amount)
    })
    }
next()}

var chk = function(req, res, next) {

  console.log('=== chk =====================');
  console.log(email);
  console.log(usr);
  console.log(atok);
  console.log(item);
  next();
}; //chkEma

var gcb = function(req, res) {
res.render('shop/history', {
title: 'history',
usr: usr,
selpid: selpid,
allpid: allpid,
allpal: allpal,
oite: oite,
aite:aite,
    atok:atok

});
};
router.get('/shop/history', [getEma, getUsr, allPid, allPal,getPal,chk, gcb]);

module.exports = router;
