var adb = require('usrdb');
// === cnf ===
var cnf=require("../../son/cnf.json")
var sec=cnf.sec
//var sec=cnf.skl
//var email="successful.payment@paidy.com"
var email="minorhash@gmail.com"
console.log(sec)
var allpid=adb.allPid(email)
var pid=allpid[0].pid

var url="https://api.paidy.com/payments/"
var agePid={

getp: function(url){
return url
}
};

module.exports=agePid

var age=require("superagent")
// age
// .get(url+pid)
// .set("Content-Type", "application/json")
// .set("Paidy-Version", "2018-04-10")
// .set("Authorization", "Bearer"+sec)
// .then(res => {
// if(res.body.status=="closed"){
// console.log("already closed")
// console.log(res.body.order.items)
// }else{
// console.log("auth")
// console.log(res.body.id)
// // closed

// }//else

// })//then


