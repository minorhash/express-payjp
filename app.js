var express = require('express');
var router = express.Router();
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookie = require('cookie');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');
var sess = require('cookie-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
//app.use(cookieParser());

app.use(
  sess({
    name: 'sess',
    keys: ['key1'],
    maxAge: 24 * 60 * 1000, // 1 hour
  })
);

//app.use('/', shop);
// i18n ======================================
var nat=["","mail","shop","gis","usr"]

for(let i=0;i<nat.length;i++){
app.use(  i18n({    translationsPath: path.join(__dirname, 'i18n/'+nat[i]),
    siteLangs: ['en', 'ja'],    textsVarName: nat[i]  })
);
}

// route =================================
var index= require('./routes/index');
var page= require('./routes/page');
var mail= require('./routes/mail');

app.use('/', index);
app.use('/', page);
app.use('/', mail);

// shop =================================

var shop = require('./routes/shop/index');
app.use('/', shop);

var top=["index","cart","item","his","my","dl","up","tmp"]

top.forEach(function(ite){
ite=require('./routes/shop/'+ite)
app.use('/', ite)
})

// === not ===
var anot=["agmt","gui","not"]

for(var i=0;i<anot.length;i++){
anot[i]=require('./routes/shop/not/'+anot[i]);
app.use('/', anot[i]);
}

// === paidy ===

var aaid=["pay","pid"]
for(var i=0;i<aaid.length;i++){
aaid[i]=require('./routes/shop/aid/'+aaid[i]);
app.use('/', aaid[i]);
}

// === pal ===
var apal=["pay","suc","can"]
apal.forEach(function(ite){
ite=require('./routes/shop/pal/'+ite)
app.use('/', ite)
})
// === mer ===
var mer = require('./routes/mer/index');
app.use('/', mer);

var amer=["out","item","ins","ins_fin","song","song2","song3","del","del_fin",
"up","up2","up3"]
amer.forEach(function(ite){
ite=require('./routes/mer/'+ite)
app.use('/', ite)
})
//app.use('/', con);
// === login ===
ausr=["sig","sigp","out","adr","adrp","forg"]
ausr.forEach(function(ite){
ite=require('./routes/shop/usr/'+ite)
app.use('/', ite)
})

app.use(function(req, res, next){
res.status(404);

res.format({
html: function () {
res.render('404', { url: req.url })
}
})
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//var ses,usr,title,sku,nam,pri,uni,sum,myerr;

module.exports = app;
