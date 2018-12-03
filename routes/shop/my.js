const express = require('express');
const router = express.Router();
// == db =============================

const db = require('cardb');
const adb = require('usrdb');

// === glob ===
let email="", usr="", sku="", sum="";
let mailtmp=[], mailusr=[], mailadr=[];
let mer = [],  suma = [],  sku_a = [];

// === cred ===

const cred = require('./js/cred');
const getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
console.log(email)
next()}

const getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()}

const getAdr = function(req, res, next) {
    mailadr = adb.mailAdr(email);
  next()};

const chk = function(req, res, next) {
  console.log(email);

if (mailadr) {    console.log(mailadr)
  }else{    console.log("no adr")}
  console.log(mailusr);
  next()};

const rcb = function(req, res, next) {
res.render('shop/my', {    email: email,    usr: usr,    mailusr: mailusr,
mailadr: mailadr
}); //rend
};
router.get('/shop/my', [getEma, getUsr, getAdr, chk, rcb]); //

module.exports = router;
