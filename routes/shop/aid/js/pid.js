var adb = require('usrdb');
// === cnf ===
var cnf=require("../../son/cnf.json")
var sec=cnf.sec
//var sec=cnf.skl
//var email="successful.payment@paidy.com"
var email="minorhash@gmail.com"
//console.log(sec)
var allpid=adb.allPid(email)
var pid=allpid[0].pid

var url="https://api.paidy.com/payments/"

// var age={
// getPid: function(){
// return pid
// }
// };
//
// var age=function(){
// return pid
// };

// module.exports=age

var mail=require("./mail")
try{mail(pid)}
catch(err){console.log(err)}
