#!/bin/bash

USER=admin
PSSD=bulk2010
FTPSITE=tmsm.bulks.jp

di1=/media/koji/dat/exp/pal/pay2
di2=/home/admin/exp/pal/pay2

lftp \
-u $USER,$PSSD $FTPSITE \
-e "
set ftp:list-options -a
lcd $di1
echo "================"
echo "local:"
lpwd
echo "================"
cd $di2
echo "================"
echo "remote:"
pwd
echo "================"
mirror -R views
mirror -R routes
put app.js


" 
