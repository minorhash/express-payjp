#!/bin/bash

if [ -z $1 ];then
echo "$0 rowid"
else
cat <<EOF > sql/del.sql
delete from node where rowid=$1;
EOF

cmd/sql.sh sql/del.sql 2> log/del.log

fi
