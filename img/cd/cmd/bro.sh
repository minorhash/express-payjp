for i in nod/*.js
do
    se1=$(echo $i|sed s/nod/bro/g)
    echo $se1
    browserify $i -o $se1
done
