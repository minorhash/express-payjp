// === db =============================
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid

var cnf=require("../../son/aid.json")
//var sec=cnf.sec;
var sec=cnf.skl;

// var gpid= require('./pid');
// var pid=gpid()
// console.log(pid)

var i18=require("../../../../i18n/shop/ja.json")
var sub=i18.buy

var senEma=function(pid){
age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {

var mnt=res.body.amount
var buy=res.body.buyer
var email=buy.email
var ite=res.body.order.items

console.log(buy);
//var sub=buy.name1+"さま"
var fin;

for (var i=0;i< ite.length;i++){
fin+="タイトル:"+ite[i].title+",sku:tms-"+ite[i].id
        +",price:"+ite[i].unit_price.toLocaleString()+" yen"
        +",unit:"+ite[i].quantity+"<br>"
}
var fin2=fin.replace(/undefined/,"")
//console.log(fin2);

//var mes=sub+"<br>amount:"+mnt.toLocaleString()+" yen<br>"+fin2

var pre=
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+buy.name1+"様<br><br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pid+pid+"<br><br>"

var mes=pre+fin2
console.log(mes)

if(pid){
snde.trEma(email,sub,mes);
}else{console.log("no pid")}

})//res
}

module.exports=senEma

