const express = require('express');
const router = express.Router();
const url = require('url');
const formidable = require('formidable');

const db = require("cardb");
const adb = require("usrdb");

let email="",usr="";
let mailuser="";

// === login ============================
const cred = require("./js/cred");

// === get ============================

const getEma = (req, res, next)=> {
  email = cred.ema(req);
  mailusr = adb.mailUsr(email);
  next()};

const getUsr = function(req, res, next) {
  if (mailusr) {
    usr = mailusr.name;
  } else {
    usr = null;
    console.log("no usr");
  }
  next()};

const chk = function(req, res, next) {
//email="jinjasaisen@gmailcom";
console.log(usr);
console.log(email);
console.log(mailusr);

next()};

const upForm=function(req,res,next){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) throw err
        console.log(files)
    });

// var form = new formidable.IncomingForm();
//     form.parse(req);
//     form.on('fileBegin', function (name, file){
//         file.path = '/' + file.name;
//     });
//     form.on('file', function (name, file){
//     console.log('Uploaded ' + file.name);
//     });

next()};

const rcb = function(req, res, next) {

const sku="341";
const fil=sku+".png";
const path="img/cd/"+fil;

const obj={email: email,usr:usr,fil:fil,path:path}
res.download(path)
res.render('shop/dl',obj ); //rend
};

const arr=[getEma,getUsr,chk,upForm,
rcb]
router.get('/shop/dl',arr ); //

module.exports = router;
