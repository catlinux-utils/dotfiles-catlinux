#!/bin/bash
set -e

ARCH_DEPENDENCIES="code ttf-meslo-nerd"
DOTFILESDIR="$HOME/github/dotfiles-catlinux"

if [ -f /etc/os-release ]; then
    . /etc/os-release

    case "${ID_LIKE:-$ID}" in
    arch | manjaro)
        echo "Installing dependencies for Arch-based systems"
        sudo pacman -Sy --noconfirm --needed $ARCH_DEPENDENCIES
        ;;
    esac
else
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
fi
mkdir -p "$HOME/.config/Code/User" "$HOME/.config/Code - OSS/User/"
cp "$DOTFILESDIR/config/.config/Code/User/settings.json" "$HOME/.config/Code/User/settings.json"
cp "$DOTFILESDIR/config/.config/Code - OSS/User/settings.json" "$HOME/.config/Code - OSS/User/settings.json"

code --install-extension mhutchie.git-graph

code --install-extension esbenp.prettier-vscode
code --install-extension ms-ceintl.vscode-language-pack-pl
code --install-extension sourcegraph.cody-ai
code --install-extension mhutchie.git-graph
code --install-extension donjayamanne.githistory

mkdir -p "$HOME/.vscode" "$HOME/.vscode-oss"
cp "$DOTFILESDIR/config/.vscode/argv.json" "$HOME/.vscode/argv.json"
cp "$DOTFILESDIR/config/.vscode-oss/argv.json" "$HOME/.vscode-oss/argv.json"
