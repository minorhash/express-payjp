exports.tmpAid=function(){
try{
var tmp=require("./tmp.json");
}catch(err){console.log(err);}
return tmp;
};

