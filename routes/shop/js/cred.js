var adb = require('usrdb');
var cred = {
  ema: function(req) {
if (req.session) {
<<<<<<< HEAD
    //email = req.session.email;
=======
//email = req.session.email;
>>>>>>> 171ec9f35d6047e6bf1d11e6f217558dad09e070
email="successful.payment@paidy.com"
      return email;
    } else {
      email = null;
      console.log('no sess');
    }
  },
  usr: function(email) {
    if (email) {
      try {        mailusr = adb.mailUsr(email);      } 
      catch (err) {        console.log(err);      }
      usr = mailusr.name;
      return usr;
    } else {      usr = null;        console.log("no usr")    }
  },
  pss: function(email) {
    if (email) {
      try {        mailusr = adb.mailUsr(email);      } 
      catch (err) {        console.log(err);      }
      pss= mailusr.pss;
      return usr;
    } else {      pss= null;        console.log("no pss")    }
  }

};

module.exports = cred;
