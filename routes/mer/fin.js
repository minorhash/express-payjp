var express = require('express');
var router = express.Router();

// === db === 
var db=require('cardb');

/* === post === */
var putMer= function(req, res, next) {

var bod=req.body;
console.log(req.body);
var img="img/cd/"+bod.sku+".png";

try{db.insMer(bod.tit,bod.sku,bod.pri,img,bod.rel,bod.cat,bod.des);}
catch(err){console.log(err);}

var allmer=db.allMer();
}

var rcb=function(req,res,body){res.render('mer/fin', { 
title:"fin",
tit:bod.tit,
sku:bod.sku,
img:bod.img
}

router.post('/mer/fin',[putMer,rcb] )

module.exports = router;
