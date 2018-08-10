# low-cart
## low-carb, fat free, and no nonsense shopping cart for express
### using express, sqlite, bootstrap3

- no database server required(file based db)
- ultra lite and fast using sqlite3 db
- using boostrap3


### required modules
- better-sqlite3
- nodemailer
- paypal-rest-sdk
- mypal
```
import paypal payment json template
```
- usrdb
```
sqlite db for merch and cart
```
- cardb
```
sqlite db for usr, paidy and paypal
```

### ignored files
- routes/shop/son
#### credential json files
aid.json
```js
{
    "pub":"pk_test_***",
    "sec":"sk_test_***",
    "loc":"http://localhost:3000",
    "axe":"https://mysite.com"
}
```

ema.json: email credentials
```js
{
"HOST": "smtp.mysite.com",
"USR": "info@mysite.com",
"PSS": "bighead",
"EMA1": "nelson@mysite.com",
"CC1": "bighetti@mysite.com"
}
```

pal.json:paypal client_ID,client_SECRET
```js
{
"MODE": "sandbox", 
"ID":"AcR***",
"SEC":"EL8***"
}
```

- public/img/cd
merch images. 
```
you need to prepare your own.
```

