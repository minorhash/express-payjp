#in1=$(date + "%D")

if [ -z $1 ];then
    echo "usage"
else
git commit -m $1
fi

