dir=$(pwd)
str=${dir: -8}
echo $str

git pull git@github.com:minorhash/$str.git

