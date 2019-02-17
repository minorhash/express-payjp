#br=$(git rev-parse --abbrev-ref HEAD)

br=$(cmd/git/br.sh)
echo $br

git push -u origin $br

