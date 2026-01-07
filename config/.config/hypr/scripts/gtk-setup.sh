#!/bin/bash
set -e
gsettings set org.gnome.desktop.interface font-name "Cantarell 10"
gsettings set org.gnome.desktop.interface cursor-theme Adwaita
gsettings set org.gnome.desktop.interface gtk-theme Materia-dark-compact
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
gsettings set org.cinnamon.desktop.default-applications.terminal exec kitty