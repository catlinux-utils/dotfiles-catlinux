#!/bin/bash

ARCH_DEPENDENCIES="sddm plasma-desktop"
DOTFILESDIR="$HOME/github/dotfiles-catlinux"

if [ -f /etc/os-release ]; then  
    . /etc/os-release

    case "${ID_LIKE:-$ID}" in
        arch|manjaro)
            echo "Installing dependencies for Arch-based systems"
            sudo pacman -S --noconfirm --needed $ARCH_DEPENDENCIES
        ;;
    esac
else
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
fi

echo "Installing sddm.conf"
sudo install -Dm644 $DOTFILESDIR/root/etc/sddm.conf.d/sddm.conf /etc/sddm.conf.d/sddm.conf

echo "Installing theme.conf.user"
sudo install -Dm644 $DOTFILESDIR/root/usr/share/sddm/themes/breeze/theme.conf.user /usr/share/sddm/themes/breeze/theme.conf.user

echo "Installing arch-windows.png"
sudo install -Dm644 $DOTFILESDIR/root/usr/share/backgrounds/catlinux/arch-windows.png /usr/share/backgrounds/catlinux/arch-windows.png
