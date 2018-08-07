var express = require('express');
var router = express.Router();
var db = require('cardb');
var allmer = db.allMer();

// === get

var url=["","news","info","profile","disc","schedule","video","mail","notation"]

for(let i=0;i<url.length;i++){
router.get("/"+url[i],function(req,res,next) {
res.render(url[i], {
title:url[i],
mer:allmer
});
});
}
//

module.exports = router;
