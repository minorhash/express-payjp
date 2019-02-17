if [ -z $1 ];then
    echo "usage"
else
    se=$(echo $1|sed s/scss/css/g)
    sass --sourcemap=none $1 $se

fi
