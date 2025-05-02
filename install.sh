#!/bin/bash

cp -r config/. $HOME/

gsettings set org.gnome.desktop.interface font-name "Noto Sans 10"
gsettings set org.gnome.desktop.interface cursor-theme Adwaita
gsettings set org.gnome.desktop.interface gtk-theme adw-gtk3-dark
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
