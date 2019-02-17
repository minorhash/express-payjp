const express = require('express');
const router = express.Router();
// == db =============================

const db = require('cardb');
const adb = require('usrdb');

// === glob ===
let email="", usr="", sku="", sum="";
let mailtmp=[], mailusr=[], mailadr=[];
let mer = [],  suma = [],  sku_a = [];
let pid;

// === cred ===

const cred = require('./js/cred');
const getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

const getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()}

 const getPid = function(req, res, next) {
// pid=gpid.getPid()
// const gpid=require("./aid/js/pid")
const mail=require("./aid/js/pid")

pid=     mail()
    //router.put("/shop/aid/mail");

next()};

const chk = function(req, res, next) {
console.log(email);
console.log(pid);

next()};

const rcb = function(req, res, next) {
res.render('shop/tmp', {    email: email,usr: usr,
mailusr: mailusr
}); //rend
};
router.get('/shop/tmp', [getEma, getUsr, getPid,chk, rcb]); //

module.exports = router;
