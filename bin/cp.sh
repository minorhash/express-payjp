dir1=$(pwd)

echo $dir1
if [ -z $1 ];then
    echo "usage $0"
else
echo $1

rm -r $dir1/public
mkdir $dir1/public

cp   $1app.js $dir1
cp -r  $1/routes $dir1
cp -r  $1/views $dir1
cp -r  $1/public $dir1
cp -r  $1/i18n $dir1

fi
