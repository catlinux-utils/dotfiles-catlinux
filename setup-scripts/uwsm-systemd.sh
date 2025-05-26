#!/bin/bash
set -e

systemctl --user enable hypridle.service
systemctl --user enable hyprpaper.service
systemctl --user enable hyprpolkitagent.service
systemctl --user enable gnome-keyring-daemon.service
