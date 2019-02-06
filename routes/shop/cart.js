const express = require("express");
const router = express.Router();
const crypto = require("crypto");
// == db =============================
const db = require("cardb");
const adb = require("usrdb");
const idy = require("aidy");
let taid = idy.tmpAid();
// === glob ============================
let email="", pss="", usr="";
let sku="", uni="", sum="", tsum="",stax=""
let num=""
let mer = [],  suma = [],  skua = [],boa=[];
let mailtmp=[], mailusr=[],mailadr=[]
let cla="";
const cnf= require('./son/cnf.json');

const cred = require("./js/cred");
// === get ============================

const getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

const getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()}

const getAdr= function(req, res, next) {
mailadr=adb.mailAdr(email)
next()};

const getTmp = function(req, res, next) {
mailtmp = [];
//      db.delUni()
  if (email) {
  mailtmp = db.mailTmp(email);
  } else {    console.log("no mail");  }
  next()};

const getSku= function(req, res, next) {
skua=[]
if (mailtmp) {
for(let i=0;i<mailtmp.length;i++){
skua.push(mailtmp[i].sku)
}
} else {    console.log("mailtmp");  }
next()};

const putMer = function(req, res, next) {
mer = [];
if (mailtmp) {
for (let i = 0; i < mailtmp.length; i++) {
mer[i] = db.skuMer(mailtmp[i].sku);
}
}else {    console.log("no mailtmp");  }
next()};

const putSum = function(req, res, next) {
  suma = [];
  if (mailtmp) {
    for (let i = 0; i < mailtmp.length; i++) {
      suma[i] = mailtmp[i].uni * mer[i].pri;
    }
  } else {    console.log("no mailtmp");  }
  next()};

// === chk dl ===
// check for dl mer. if sku is 4 digit, then its dl.
const chkSh = function(req, res, next) {
    boa=[]
  for (let i = 0; i < skua.length; i++) {
    const pat = /^\d{3}$/;
    boa.push(pat.test(skua[i]));
    }

next()};

const redSum = function(req, res, next) {
  sum = null, tsum = null
  function getSum(total, num) {    return total + num;  }
  if (suma.length !== 0) {
    sum = suma.reduce(getSum);

    tsum = sum + 650;

} else {    console.log("no sum");  }
next()};

const getHea= function(req, res, next) {
cla=req.header("accept-language");
console.log(cla);

next()};

// === chk ===============================
const chk = function(req, res, next) {
  console.log("=== cart ===================");
  console.log(email);
  console.log("=== mailtmp ===");
  console.log(mailtmp);
  console.log(cla);
    next()};

// === rend
const gcb = function(req, res) {
let obj={
seltmp: mailtmp,mailadr:mailadr,
mer: mer,    sum: sum,tsum:tsum,
usr: usr,    email: email
}
res.render("shop/cart",obj );
};
let arr=[  getEma,  getUsr, getAdr, getTmp, getSku, putMer,  putSum,chkSh,  redSum,getHea,
chk,  gcb]
router.get("/shop/cart",arr );
// ====== post ===============================

// === add item ===

const getIte = function(req, res, next) {
  if (req.body) {
    uni = req.body.uni;
    sku = req.body.sku;
  } else {
    console.log("no bod");
  }
  next()};

const insUpd = function(req, res, next) {
    console.log("=== ins upd")
  if (req.body.sku) {
    num = parseInt(sku);
    const ind = skua.indexOf(num);
    console.log(ind);
    if (ind == -1) {
      db.insTmp(email, sku, uni);
      const hea = res.headersSent;
      console.log("=== head ==================");
      console.log(hea);
    } else {
mailtmp=[]
        skua=[],boa=[]
      db.updTmp(uni, email, sku);
      db.delUni()
      const hea = res.headersSent;
      console.log(hea);
      res.redirect("cart");
    } //ind
  } else {
    console.log("no body.sku");
  }
  next()}; //insUpd

// === clr ===============================
const clrEma = function(req, res, next) {
  if (req.body.clr == "yes") {
    db.delEma(email);
    //    sku=null
    mailtmp = null;
    //console.log(mailtmp)
    console.log("=== CLR! ==================");
    //res.redirect("cart")
  } else {    console.log("no clr");  }
  next()};

// === aid ===============================

const putAid = function(req, res, next) {
  router.put("/shop/aid/aid");
  next()};

const pcb = function(req, res, next) {
obj={
seltmp: mailtmp,    sum: sum,    mer: mer,    usr: usr,cnf:cnf,
email: email
}
  res.render("shop/cart",obj ); //rend
};

arr=[
  getEma,  getUsr,  getTmp,  getIte,  getSku, chkSh, insUpd,  clrEma,
  chk,  pcb
]
router.post("/shop/cart",arr );

module.exports = router;
