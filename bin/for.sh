sta=$(netstat -lpn |grep 3023)

echo $sta
str=$(echo $sta|awk '{print $7}')

echo $str
str2=${str:0:4}
echo $str2

pwd=$(pwd)

if [ -z $str2 ]; then
forever start -l $pwd/log/for.log -o $pwd/log/out.log -e  -a $pwd/log/err.log $pwd/bin/www
else
forever restart -l $pwd/log/for.log -o $pwd/log/out.log -e -a $pwd/log/err.log $pwd/bin/www
fi
