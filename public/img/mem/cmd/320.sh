cd $1
for i in *.png
do
convert -resize 320 $i $i.jpg
se1=$(echo $i.jpg|sed s/.jpg//g)
#echo $se1
mv $i.jpg $se1

done
