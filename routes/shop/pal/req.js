var palGet= function(req, res, next) {

for (var i = 0; i < atok.length; i++) {

paypal.payment.get(atok[i], function (err, pay) {
if (err) {        console.log(err);        throw err;} 
else {
item=[]
palid=pay.id
//sid=JSON.stringify(palid)
sit=pay.transactions[0].item_list.items[0]
item.push(sit)
sitem=JSON.stringify(item)
adb.setIte(palid)
}
})//get
}//for

next()}

