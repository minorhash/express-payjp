pid="pay_W5Yu41UAAF0AaW4E"
sec="sk_test_qbmquibktb7s3n4dov1mdihod3"

curl -X "GET" "https://api.paidy.com/payments/$pid" \
  -H "Content-Type: application/json" \
  -H "Paidy-Version: 2018-04-10" \
  -H "Authorization: Bearer $sec" \
  -d "{}"
