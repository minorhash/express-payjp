sec="sk_test_qbmquibktb7s3n4dov1mdihod3"
pid="pay_WvLwQE4AAFQAfg46"

curl -X "GET" "https://api.paidy.com/payments/$pid"\
  -H "Content-Type: application/json" \
  -H "Paidy-Version: 2016-07-01" \
  -H "Authorization: Bearer $sec" \
