dir=$(pwd)
str=${dir: -4}
echo $str

git remote set-url origin git@github.com:minorhash/$str.git

