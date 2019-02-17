# payjp with express, sqlite and bootstrap4
## low-carb, fat free, and no nonsense shopping cart for express
### express, sqlite, bootstrap4

- no database server required(file based db)
- ultra lite and fast sqlite3 db
- simple boostrap3 ui

### required modules
- better-sqlite3
- nodemailer
- paypal-rest-sdk

### required other modules
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
``

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

- public/img/cd
merch images. 
```
you need to prepare your own.
```

