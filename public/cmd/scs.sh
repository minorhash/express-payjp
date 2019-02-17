if [ -z $1 ];then
    echo "usage"
else
    se=$(echo $1|sed s/scss/css/g)
    echo $se
    sass --no-source-map $1 $se

fi
