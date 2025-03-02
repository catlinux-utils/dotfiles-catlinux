#!/bin/bash
ARCH_DEPENDENCIES="git github-cli"
if [ -f /etc/os-release ]; then  
    . /etc/os-release

    case "${ID_LIKE:-$ID}" in
        arch|manjaro)
            echo -e "${BLUE}Installing dependencies for Arch-based systems${RC}"
            sudo pacman -Sy --noconfirm --needed $ARCH_DEPENDENCIES
        ;;
    esac
else
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
fi

git config --global user.name "ThePolishCat"
git config --global user.email "damianadam000@gmail.com"
