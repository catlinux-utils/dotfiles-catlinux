#!/bin/bash
main=$(pwd)
if [ -z "$1" ]; then
    echo "Please enter the directory"
    exit 1
fi

if [ ! -d "$main/$1" ]; then
    echo "Directory $1 does not exist"
    exit 1
fi

cd "$main/$1"
echo "Building $1"
GPGKEY="E40E7EDDF0FF9143" PACKAGER="ThePolishCat <damianadam000@gmail.com>" makepkg --clean --sign 
cd "$main"

