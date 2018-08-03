var cred = {
ema: function(req) {
if (req.session) {
//      email = req.session.email;
email="successful.payment@paidy.com"
return email;
} else {email = null;console.log('no sess');    }
},
usr: function(email) {
var adb = require('usrdb');
if (email) {
try {mailusr = adb.mailUsr(email);      } 
catch (err) {        console.log(err);      }
usr = mailusr.name;
return usr;
} else {      usr = null;      myerr = 'no mailusr';    }
}
};

module.exports = cred;
