cd scss

for i in *.sass
do
    echo $i
    se=$(echo $i|sed s/sass/css/g)
    sass $i ../css/$se

done

