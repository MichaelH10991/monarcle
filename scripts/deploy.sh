#!/bin/bash

game_name=$1
timestamp=$(date)
version=$(cat package.json | jq -r .version)
BUCKET="s3://archdom/"

export REACT_APP_VERSION=$version
export REACT_APP_TIMESTAMP=$timestamp


if [ -f src/config.js ]; then
  rm src/config.js
fi

if [ -d src/images ]; then
  rm -r src/images/
fi

cp config/$game_name/config.js src/config.js
cp -r config/$game_name/assets/images/ src/images

# build the app
npm install
npm run build

# deploy
aws --profile mike s3 cp build/ $BUCKET --recursive