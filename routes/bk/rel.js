var express = require('express');
var router = express.Router();
/* GET home page. */
usr = 'fog';
var myusr;
var mer = require('mer');
var arr = [];
var obj;

for (var i = 0; i < 3; i++) {
  var num = '30'.concat(i + 1);

  arr[i] = mer.myMer(num);
  //console.log(i+1);
  //console.log(arr);
}

//console.log(arr);
for (var i = 0; i < arr.length; i++) {
  var it = arr[i];
  //console.log(arr);
}

//== get =================================
router.get('/', function(req, res, next) {
  if (typeof usr !== 'undefined') {
    myusr = usr;
  } else {
    // ses
    myusr = 'no usr';
  }

  // rend
  res.render('release', {
    title: 'release',
    usr: myusr,
    arr: arr,
  }); //rend
}); //get

module.exports = router;
