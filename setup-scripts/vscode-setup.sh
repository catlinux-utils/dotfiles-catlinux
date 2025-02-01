#!/bin/bash


ARCH_DEPENDENCIES="code"
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

cp config/.config/Code/User/settings.json ~/.config/Code/User/settings.json
cp config/.config/Code - OSS/User/settings.json ~/.config/Code - OSS/User/settings.json
code --install-extension codeium.codeium 
code --install-extension esbenp.prettier-vscode
code --install-extension ms-ceintl.vscode-language-pack-pl
code --install-extension eamodio.gitlens