var db=require('cardb')

var sku=3411
var skumer=db.skuMer(sku)
    var song=skumer.song
    var jso=JSON.parse(song)
    console.log(jso.s1)

