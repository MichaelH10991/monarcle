#!/bin/bash

tag="v$(node -p "require('./package.json').version")"

git tag $tag --force 

git push --tags --force