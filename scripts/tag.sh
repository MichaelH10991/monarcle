#!/bin/bash

git tag v$(node -p \"require('./package.json').version\") --force 

git push --tags --force