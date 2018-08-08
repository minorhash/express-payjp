var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');
var rdb = require('req-aid');

var ema=require("../son/ema.json")
var aid=require("../son/aid.json")
// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy,
  ite,
  itea,
  oite,
  mes,
  arr = [],
  str;

// === fun =============================

var getEma = function(req, res, next) {
  if (req.session) {
    email = req.session.email;
  } else {
    email = null;
    console.log('no cook');
  }
  next();
};

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    usr = mailusr.name;
  } else {
    usr = null;
    console.log('no usr');
  }
  next();
};

var putPid = function(req, res, next) {
  if (req.body.id) {
    pid = req.body.id;
    console.log('=== putPid ===');
    console.log(pid);
  } else {
    console.log('=== no body ===');
    pid = 'pay_Wz8zdysAAF0AirLI';
    console.log(pid);
    //pid="pay_Wz8uOSsAAC8Aiq_w"
  }
  next();
};

var selPid = function(req, res, next) {
  console.log('=== selPid items ===');
  selpid = rdb.selPid(pid);
  var obj = JSON.parse(selpid.obj);
  oite = obj.order.items;
  console.log(oite);
  next();
};

var reqPid = function(req, res, next) {
  console.log('=== reqPid ===');
  //    console.log(cget.getPid(email,pid,sec))
  if (!selpid) {
    try {
      rdb.insPid(pid, aid.sec);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('selpid exists');
  }

  next();
};

var getIte = function(req, res, next) {
  console.log('=== get ite ===');
  if (oite) {
    for (var i = 0; i < oite.length; i++) {
      console.log(oite[i].id);
    }
  } else {
    console.log('no selpid');
  }
  next();
};

var senEma = function(req, res, next) {
  console.log('=== senEma =======================================');
  var snem = require('snd-ema');
  var sub = 'sub:' + usr;
  //mes = [];
  //arr = [];
  //for (var i = 0; i < oite.length; i++) {
    //arr[i] =
      //'thank you for shopping.<br>' +
      //oite[i].id +
      //'<br>' +
      //oite[i].title +
      //'<br>' +
      //"<img src='https://3axe.tmsmusic.tokyo/img/cd/" +
      //oite[i].id +
      //".png'><br>";
    ////mes=oite[i].id+":"+oite[i].title
//}
  //mes = JSON.stringify(arr)
//.replace(/\[/g, '').replace(/\]/g, '').replace(/\"/g, '').replace(/\,/g, '');
  //console.log(arr);
var mes="mes"

snem.trEma(   ema.HOST,    ema.USR,   ema.PSS,    email,   ema.EMA1,    sub,    mes  );
  next()};

var chk = function(req, res, next) {
  console.log('=== cli =======================================');
  console.log(pid);
  //console.log(ite[0].id)
  //console.log(itea)
};

router.put('/shop/aid/cli', [  getEma,  getUsr,  putPid,  selPid,  reqPid,  getIte,  senEma,  chk]);
module.exports = router;
