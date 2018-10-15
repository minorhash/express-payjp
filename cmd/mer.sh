dir=$(pwd)
str=${dir: -8}
echo $str

git merge git@github.com:minorhash/$str.git/master

