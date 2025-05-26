#!/bin/bash
set -e

ARCH_DEPENDENCIES="thorium-browser-bin" 

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

if [ -f /etc/os-release ]; then  
    . /etc/os-release
    
    case "${ID_LIKE:-$ID}" in
        arch|manjaro)
            if ! command_exists yay && ! command_exists paru; then
                echo "Installing yay as AUR helper..."
                sudo pacman --noconfirm -S base-devel git
                cd /tmp && git clone https://aur.archlinux.org/yay-bin.git
                cd yay-bin && makepkg --noconfirm -si
            else
                echo "AUR helper already installed"
            fi
            if command_exists yay; then
                AUR_HELPER="yay"
                elif command_exists paru; then
                AUR_HELPER="paru"
            else
                echo "No AUR helper found. Please install yay or paru."
                exit 1
            fi
            echo "Installing "
            $AUR_HELPER -S --noconfirm --needed $ARCH_DEPENDENCIES
        ;;
    esac
else
    echo -e "Unable to determine OS. Please install required packages manually."
fi


xdg-mime default thorium-browser.desktop x-scheme-handler/http x-scheme-handler/https