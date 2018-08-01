var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.ses:' + req.session);

  res.render('out', {
    title: 'logout',
  });
  //    delete this.ses;
  res.redirect('/');
});

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log(req.body.out);
  console.log('ses:' + ses.usr);

  if (typeof ses !== 'undefined') {
    delete this.ses;
    res.redirect('/');
  }
});

module.exports = router;
