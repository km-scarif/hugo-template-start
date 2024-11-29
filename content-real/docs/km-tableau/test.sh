#!/bin/bash

for file in $(find . -name "*.png"); do
  d=$(dirname -- $file)
  echo ""
  echo "found image $file in $d"
  for f in $(find $d -maxdepth 1 -name "*.md"); do
    echo "moving file: $f"
    echo "mv -n $f $d/index.md"
    mv -n $f $d/index.md
  done
done
