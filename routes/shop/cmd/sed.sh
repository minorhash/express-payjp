for i in *.js
do
    $(sed -i "s/var/const/g" $i)
done
