var express = require('express');
var router = express.Router();
// == db =============================

var db = require('cardb');
var adb = require('usrdb');

const paypal = require('paypal-rest-sdk');

var email, usr, myerr;
var mailusr, selpid, allpid,allpal;
var ite, oite,tok,atok,item,aite=[];
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

var allPid = function(req, res, next) {
    if(!email){    allpid=[]; oite=[]
  console.log('=== no all pid ==================');
    }else{

  allpid = adb.allPid(email);
  for (var i = 0; i < allpid.length; i++) {
    ite = allpid[i].ite;
    oite = JSON.parse(ite);
  }

  //console.log(oite)
        //  console.log(allpid);
  console.log(allpid.length);
    }
  next()}

var allTok= function(req, res, next) {
allpal=adb.allPal(email)
atok=[]
for (var i = 0; i < allpal.length; i++) {
      //console.log(allpal[i].tok)
    atok[i]=allpal[i].tok;

//    otok= JSON.parse(atok);
  }
next()}

var getPay= function(req, res, next) {
for (var i = 0; i < atok.length; i++) {
paypal.payment.get(atok[i], function (err, pay) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        //        console.log("=== Get Payment Response");
aite=[]
        palid=pay.id
        console.log(palid)
item=pay.transactions[0].item_list.items[0]
site=JSON.stringify(item)
        console.log(site)
        aite.push(site)
}
})//get
}//for
next()}

var chk = function(req, res, next) {
  console.log('=== chk =====================');
  console.log(email);
  console.log(usr);
  console.log(aite);
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
      aite:aite

  });
};
router.get('/shop/history', [getEma, getUsr, allPid, allTok,getPay,chk, gcb]);

module.exports = router;
