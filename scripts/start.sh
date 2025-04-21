#!/bin/bash

game_name=$1

cp config/$game_name/config.js src/config.js
cp -r config/$game_name/assets/images/ src/images

npm start