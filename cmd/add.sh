#if [ -z $1 ];then
    #echo "usage"
#else
dir=$(pwd)
str=${dir: -4}
echo $str
git add .
#git remote add origin git@github.com:minorhash/$str.git
#fi
