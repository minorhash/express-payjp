var tai=require("./tai")
var mnt=1000
var getai=tai()
getai.buyer.email="adm@mail.com"
getai.amount=mnt
console.log(getai.amount)
console.log(getai.buyer.email)
console.log(getai.order.items)
