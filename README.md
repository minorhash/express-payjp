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
#### credential files
aid.json;
```json
{
    "pub":"pk_test_pvve8rdmjtcqbjejq4idolh8l9",
    "sec":"sk_test_qbmquibktb7s3n4dov1mdihod3",
    "loc":"http://localhost:3000",
    "axe":"https://3axe.tmsmusic.tokyo"
}
    ```
- public/img/cd
merch images. you need to prepare your own.
