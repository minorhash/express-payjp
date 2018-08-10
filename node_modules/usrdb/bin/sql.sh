#!/bin/bash

dir=$(pwd)
echo $dir

sqlite3 $dir/db/aid.db
