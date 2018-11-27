var express = require('express');
var router = express.Router();
var process = require('process');

// === db ===
var db = require('cardb');

// glob
var bod,
  sku,
  img,
  len,
  jso,
  song_a = [],
  skuson,
  obj;
/* === post === */

var putSon = function(req, res, next) {
  bod = req.body;
  sku = bod.sku;

  delete bod.sku;

  jso = JSON.stringify(bod);

  try {
    db.updSon(jso, sku);
  } catch (err) {
    console.log(err);
  }
  len = Object.keys(bod).length;

  next();
};
var getSon = function(req, res, next) {
  try {
    skuson = db.skuSon(sku);
  } catch (err) {
    console.log(err);
  }
  if (skuson) {
    obj = JSON.parse(skuson.song);
  } else {
    console.log('no skuson');
  }
  next();
};

var chk = function(req, res, next) {
  console.log(bod);
  console.log(skuson.song);
  console.log(obj);
  console.log(len);
  for (var key in obj) {
    console.log(obj[key]);
  }
  next();
};

var rcb = function(req, res, next) {
  res.render('mer/song_fin', {
    title: 'song fin',
    sku: sku,
    song: obj,
    len: len,
    img: img,
  });
};

router.post('/mer/song_fin', [putSon, getSon, chk, rcb]);
module.exports = router;
