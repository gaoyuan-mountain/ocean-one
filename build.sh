#!/bin/sh

source /etc/profile
rm -rf ./dist/ && mkdir -p ./dist/dll
cp -R ./public/dist/* ./dist/
cp ./public/favicon.ico ./dist/
cp -R ./public/dll/* ./dist/dll/
chmod -R 755 ./dist
