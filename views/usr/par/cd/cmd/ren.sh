for i in *.js
do
    se=$(echo $i|sed s/disc//g)
    echo $se
    mv $i $se
done

