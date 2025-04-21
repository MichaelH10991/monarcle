#!/bin/bash

game_name=$1

cp config/$game_name/config.json src/config.json
cp config/$game_name/assets/images/* src/images/

npm start