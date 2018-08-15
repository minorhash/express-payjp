#!/bin/bash

dir1=/mnt/data/Public/lin1/data/db

if [ -z "$1" ];then
echo "usage"
else
h1=$(head -n 1 $1 |tail -n 1)
h2=$(head -n 2 $1 |tail -n 1)
h3=$(head -n 3 $1 |tail -n 1)
h4=$(head -n 4 $1 |tail -n 1)
h5=$(head -n 5 $1 |tail -n 1)

#echo $h1
printf "\n"

cat1=$(cat <<EOF
insert into linux(type,term,title,link,body) 
values("$h1",
"$h2",
"$h3",
"$h4",
"$h5"
);
EOF
)

echo $cat1 > res/out1.sql

cat res/out1.sql

sqlite3 $dir1/2linux.db < res/out1.sql
fi
