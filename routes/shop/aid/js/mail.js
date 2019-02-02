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

var cnf=require("../../son/aid.json")
//var sec=cnf.sec;
var sec=cnf.skl;

var gpid= require('./pid');
var pid=gpid.getPid()
console.log(pid)

var i18=require("../../../../i18n/shop/ja.json")
var sub=i18.buy

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

    //console.log(res);
console.log(ite);
var sub="sub"
var fin;

for (var i=0;i< ite.length;i++){
fin+="タイトル:"+ite[i].title+",sku:tms-"+ite[i].id
        +",price:"+ite[i].unit_price.toLocaleString()+" yen"
        +",unit:"+ite[i].quantity+"<br>"
}
var sum=fin.replace(/undefined/,"")
console.log(sum);

if(pid){
snde.trEma(email,sub,mnt+sum);
}else{console.log("no pid")}

})

// var mes=
// i18.lin1
// +i18.cau1
// +i18.lin1+"<br>"
// +usr+"様<br><br>"
// +i18.cau2+"<br><br>"
// +i18.cau3
// +i18.cau4+"<br>"

// +i18.cont+"<br>"
// +i18.pid+pid+"<br><br>"

// var loo="";
// oite=res.body.order.items

// for(var i=0;i<oite.length;i++){
// loo+=
// i18.sku+oite[i].id+"<br>"
// +i18.title+oite[i].title+"<br>"
// +i18.price+(oite[i].unit_price).toLocaleString()+i18.yen+"<br>"
// +i18.unit+oite[i].quantity+"<br>"
// +i18.lin1
// }

// var msum=i18.sub+(res.body.amount-650).toLocaleString()+i18.yen+"<br>"
// +i18.cour+650+i18.yen+"<br>"
// +i18.sum+(res.body.amount).toLocaleString()+"<br>"
// +i18.pay+"paidy"+"<br><br>"
// var ship=
// i18.ship1+i18.ship2+i18.ship3
// +i18.ship4+i18.ship5
// +i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
// +i18.adr1+i18.adr2+i18.adr3

// var fin=mes+loo+msum+ship



