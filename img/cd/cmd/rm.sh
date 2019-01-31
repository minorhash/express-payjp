for i in src/*png
do
    se1=$(echo $i|sed s/TMS-//g)
    #echo $se1
    mv $i $se1

done
