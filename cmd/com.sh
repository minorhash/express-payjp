if [ -z $1 ];then
    echo "usage arg1=comment"
else
    git commit -m $(date + "%D")
fi
