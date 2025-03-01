#!/bin/bash

RC='\e[0m'
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
BLUE='\e[34m'

ARCH_DEPENDENCIES="reflector sed base-devel git"

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

if [ -f /etc/os-release ]; then  
    . /etc/os-release

    case "${ID_LIKE:-$ID}" in
        arch|manjaro)
            echo -e "${BLUE}Installing dependencies for Arch-based systems${RC}"
            sudo pacman -Sy --noconfirm --needed $ARCH_DEPENDENCIES

             if ! command_exists yay && ! command_exists paru; then
                echo -e "${YELLOW}Installing yay as AUR helper...${RC}"
                sudo pacman --noconfirm -S base-devel git
                cd /tmp && git clone https://aur.archlinux.org/yay-bin.git
                cd yay-bin && makepkg --noconfirm -si
            else
                echo -e "${GREEN}AUR helper already installed${RC}"
            fi
        ;;
    esac
else
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
    exit 0
fi

echo -e "${GREEN}Configuring pacman...${RC}"
echo -e "${YELLOW}Adding parallel downloading...${RC}"
sudo sed -i 's/^#ParallelDownloads/ParallelDownloads/' /etc/pacman.conf

echo -e "${YELLOW}Enabling colors and the easter egg...${RC}"
sudo sed -i 's/^#Color/Color\nILoveCandy/' /etc/pacman.conf

echo -e "${YELLOW}Enabling multilib...${RC}"
sudo sed -i "/\[multilib\]/,/Include/"'s/^#//' /etc/pacman.conf

echo -e "${GREEN}Fetching the fastest mirrors...${RC}"
sudo reflector -l 25 --country Germany,Poland,Czechia --protocol https --sort rate --save /etc/pacman.d/mirrorlist --verbose

nc=$(grep -c ^processor /proc/cpuinfo)
echo -e "${BLUE}
-------------------------------------------------------------------------
                    You have ${nc} cores. And
            changing the makeflags for ${nc} cores. As well as
                changing the compression settings.
-------------------------------------------------------------------------
${RC}"
TOTAL_MEM=$(cat /proc/meminfo | grep -i 'memtotal' | grep -o '[[:digit:]]*')
if [[  $TOTAL_MEM -gt 8000000 ]]; then
    sudo sed -i "s/#MAKEFLAGS=\"-j2\"/MAKEFLAGS=\"-j$nc\"/g" /etc/makepkg.conf
    sudo sed -i "s/COMPRESSXZ=(xz -c -z -)/COMPRESSXZ=(xz -c -T $nc -z -)/g" /etc/makepkg.conf
fi

echo -e "${YELLOW}Disable options in makepkg.conf...${RC}"
sudo sed -i '/^OPTIONS=/s/\b lto\b/ !lto/g' /etc/makepkg.conf
sudo sed -i '/^OPTIONS=/s/\b debug\b/ !debug/g' /etc/makepkg.conf
