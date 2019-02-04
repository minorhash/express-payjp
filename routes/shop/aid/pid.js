var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid

var cnf=require("../son/aid.json")
//var sec=cnf.sec;
var sec=cnf.skl;

var cred = require('../js/cred');
// === fun =============================
var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}; //getEma

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()};

var putPid = function(req, res, next) {
console.log('=== putPid ===');
var utc = new Date().toJSON().slice(0,10);

if (req.body && email) {
pid = req.body.id;

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
 adb.insPid(email,pid,res.body.amount,
 JSON.stringify(res.body.buyer),
 JSON.stringify(res.body.order.items),
 utc);
})
} else {
console.log("no pid");  }
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
    var mail=require("./js/mail");
    try{mail(pid)}
    catch(err){console.log(err)}
next()};

var chk = function(req, res, next) {
  console.log('=== PID =======================================');
  console.log(email);
  console.log(pid);
};

var fun=
[getEma, getUsr,putPid,senEma,
chk]
router.put('/shop/aid/pid',fun);

module.exports = router;
