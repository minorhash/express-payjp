cd $1
for i in *.png
do
    echo $i
    identify -units PixelsPerCentimeter -verbose $i
done
