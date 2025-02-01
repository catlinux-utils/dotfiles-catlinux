#!/bin/bash

RC='\e[0m'
RED='\e[31m'
YELLOW='\e[33m'
GREEN='\e[32m'

DOTFILESDIR="$HOME/github/dotfiles-catlinux"

ARCH_DEPENDENCIES="git" 


if [ -f /etc/os-release ]; then  
    . /etc/os-release
    
    case "${ID_LIKE:-$ID}" in
        arch|manjaro)
            echo "Installing "
            sudo pacman -S --noconfirm --needed $ARCH_DEPENDENCIES
        ;;
    esac
else
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
fi

cd $HOME

if [[ ! -d "$DOTFILESDIR" ]]; then
    echo -e "${YELLOW}Creating dotfiles directory: $DOTFILESDIR${RC}"
    mkdir -p "$DOTFILESDIR"
    echo -e "${GREEN}dotfiles directory created: $DOTFILESDIR${RC}"
fi

if [[ ! -d "$DOTFILESDIR/.git" ]]; then
    echo -e "${YELLOW}Cloning dotfiles-catlinux repository into: $DOTFILESDIR${RC}"
    git clone https://github.com/catlinux-utils/dotfiles-catlinux "$DOTFILESDIR"
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}Successfully cloned dotfiles-catlinux repository${RC}"
    else
        echo -e "${RED}Failed to clone dotfiles-catlinux repository${RC}"
        exit 1
    fi
else
    cd "$DOTFILESDIR"
    git pull
fi
