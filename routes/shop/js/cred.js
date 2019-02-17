var adb = require('usrdb');
var cred = {

ema: function(req) {
if (req.session) {
email = req.session.email;
return email;
//mailusr = adb.mailUsr(email)
} else {
    email = null;
    //email="successful.payment@paidy.com"
    return email
    console.log('no sess');    }
}
};

module.exports = cred;
