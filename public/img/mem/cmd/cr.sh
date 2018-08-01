cd $1
for i in *.png
do
echo $i
pngcrush -rem alla -nofilecheck -reduce -m 7 $i  $i.png
done
