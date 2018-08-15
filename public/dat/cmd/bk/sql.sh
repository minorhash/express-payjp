#!/bin/bash

dir1=/mnt/data/Public/nod/data/db

if [ -z "$1" ];then
echo "usage"
else
sqlite3 $dir1/node.db < $1
fi
