dir=$(pwd)
str=${dir: -13}
echo $str

git remote set-url origin git@github.com:minorhash/$str.git

