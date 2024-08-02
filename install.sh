#!/bin/bash

cp .config $HOME/ -r
cp .local $HOME/ -r

bash reload-waybar.sh