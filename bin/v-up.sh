#!/bin/bash

USER=admin
PSSD=bulk2010
FTPSITE=tmsm.mydns.jp

di2=/mnt/dat/exp/aid/3bs
di1=/home/admin/exp/aid/3bs

lftp \
-u $USER,$PSSD $FTPSITE \
-e "
set ftp:list-options -a
cd $di1
echo "================"
echo "remote:"
pwd
echo "================"
lcd $di2
echo "================"
echo "local:"
lpwd
echo "================"
mirror -R views
bye
" 
