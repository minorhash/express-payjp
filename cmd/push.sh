#br=$(git rev-parse --abbrev-ref HEAD)

br=$(cmd/br.sh)
echo $br

git push -u origin $br

