#!/bin/bash

cp .env.dev .env
yarn mockoon-cli stop "all"
yarn mockoon-cli start --data ./server/mocks/mockoon-deezer.json -i 0
yarn mockoon-cli start --data ./server/mocks/mockoon-deezer-proxy.json -i 0
yarn mockoon-cli start --data ./server/mocks/mockoon-spotify.json -i 0
node ./server/index.js &
yarn start