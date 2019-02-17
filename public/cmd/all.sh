cd scss

for i in *.scss
do
    echo $i
    se=$(echo $i|sed s/scss/css/g)
    sass $i ../css/$se

done

