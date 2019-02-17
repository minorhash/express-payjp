// === db =============================
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite,gpid

var cnf=require("../../../son/aid.json")
//var sec=cnf.sec;
var sec=cnf.skl;

var i18=require("../../../../../i18n/shop/ja.json")
var sub=i18.buy

var putPid = function(pid) {

return pid+sub

//var utc = new Date().toJSON().slice(0,10);

//age
//.get('https://api.paidy.com/payments/'+pid)
//.set("Content-Type", "application/json")
//.set("Paidy-Version", "2018-04-10")
//.set("Authorization", "Bearer"+sec)
//.then(res => {
////console.log(res.body.buyer);
//adb.insPid(email,pid,res.body.amount,
//JSON.stringify(res.body.buyer),
//JSON.stringify(res.body.order.items),
//utc);
//})
    //
}

module.exports=putPid

