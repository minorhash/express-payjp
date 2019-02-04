const express = require("express")
const router = express.Router()
const url=require("url")
// == db =============================
const adb = require("usrdb")

const age=require("superagent")
const cnf=require("./son/aid.json")
// === glob ============================
let email="", usr=""
let selpid=[], allpid=[],allnow=[],allpal=[]
let ite=[], oite=[],opal=[],jpal=[]
let ship=""

const cred = require("./js/cred")
// === get ============================
const getEma = function(req, res, next) {
email = cred.ema(req)
mailusr=  adb.mailUsr(email)
next()}

const getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

// === pal
const allPal= function(req, res, next) {
opal=[]
allpal=adb.allPal(email)

if(!allpal.length==0){
for(let i=0;i<allpal.length;i++){
opal.push(JSON.parse(allpal[i].ite))
}
}else{console.log("no allpal")}
next()}

//  aid
const allPid = function(req, res, next) {

if(!email){    allpid=[],        oite=[]
console.log("=== no all pid ==================")
}else{

allpid= adb.allPid(email)
oite=[]
for (let i = 0; i < allpid.length; i++) {
oite.push(JSON.parse(allpid[i].ite))
}//for

}//else
next()}

const chkCap= function(req, res, next) {

for (let i = 0; i < allpid.length; i++) {
age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.skl)
.then(function(res){

//console.log(res.body)
if(res.body.status=="closed"){

if(res.body.captures.length!==0){
console.log("cap!!!")
}else{
console.log(res.body.id)
}

}else{console.log("not closed")}

})
}//for

next()}

const chk = function(req, res, next) {
const host = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
});
console.log("=== chk =====================")
next()}

const gcb = function(req, res) {
res.render("shop/history", {
title: "history", usr: usr, selpid: selpid,
allpid: allpid, allnow: allnow, oite: oite,opal:opal,
allpal:allpal
})
}

router.get("/shop/history", [getEma, getUsr, allPid, allPal,chkCap,
chk, gcb])

module.exports = router
