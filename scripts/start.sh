#!/bin/bash

game_name=$1
version=$(cat package.json | jq -r .version)
export REACT_APP_VERSION=$version

if [ -f src/config.js ]; then
  rm src/config.js
fi

if [ -d src/images ]; then
  rm -r src/images/
fi

cp config/$game_name/config.js src/config.js
cp -r config/$game_name/assets/images/ src/images

npm start