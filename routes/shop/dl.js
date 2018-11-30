const express = require('express');
const router = express.Router();
const url = require('url');

let email="";

const chk = function(req, res, next) {
email="jinjasaisen@gmailcom";
console.log(email);

  next()};

const rcb = function(req, res, next) {
const sku="341";
const fil=sku+".png";
const path="img/cd/"+fil;

const obj={email: email,fil:fil,path:path}
res.download(path)
res.render('shop/dl',obj ); //rend
};
const arr=[chk, rcb]
router.get('/shop/dl',arr ); //

module.exports = router;
