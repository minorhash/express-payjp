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
//res.redirect("pid")

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
    //console.log(res.body.buyer);
adb.insPid(email,pid,res.body.amount,
JSON.stringify(res.body.buyer),
JSON.stringify(res.body.order.items),
utc);

})

} else {
//var    pid = 'pay_Wz8zdysAAF0AirLI'
console.log("no pid");  }
next()};

var getPid= function(req, res, next) {
//gpid=adb.pidPid(pid)

console.log(pid)
console.log(ite)
//ite=gpid.ite
//oite=JSON.parse(ite)
next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
    //console.log(res.body.buyer);
//var email="jinjasaisen@gmail.com"

var i18=require("../../../i18n/shop/ja.json")
var sub=i18.buy

var mes=
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+usr+"様<br><br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pid+pid+"<br><br>"

var loo="";
oite=res.body.order.items

for(var i=0;i<oite.length;i++){
loo+=
i18.sku+oite[i].id+"<br>"
+i18.title+oite[i].title+"<br>"
+i18.price+(oite[i].unit_price).toLocaleString()+i18.yen+"<br>"
+i18.unit+oite[i].quantity+"<br>"
+i18.lin1
}

var msum=i18.sub+(res.body.amount-650).toLocaleString()+i18.yen+"<br>"
+i18.cour+650+i18.yen+"<br>"
+i18.sum+(res.body.amount).toLocaleString()+"<br>"
+i18.pay+"paidy"+"<br><br>"
var ship=
i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

var fin=mes+loo+msum+ship


if(pid){
snde.trEma(email,sub,fin);
}else{console.log("no pid")}

})


next()};

var chk = function(req, res, next) {
  console.log('=== PID =======================================');
  console.log(email);
  console.log(pid);
  console.log('=== PID =======================================');
};

var fun=
[getEma, getUsr,putPid,senEma,
chk]
router.put('/shop/aid/pid',fun);

module.exports = router;
