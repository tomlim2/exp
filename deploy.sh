#!/usr/bin/env sh

set -e 

yarn run build

cd dist

git init
git add -A
git commit -m "Depoly: New depolyment"

# git push -f git@github.com:tomlim2/exp.git main:gh-pages

cd -