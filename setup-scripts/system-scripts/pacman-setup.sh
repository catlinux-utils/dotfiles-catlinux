#!/bin/bash

ARCH_DEPENDENCIES="reflector sed base-devel git"
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


echo "Configuring pacman..."
echo "Adding parallel downloading..."
sudo sed -i 's/^#ParallelDownloads/ParallelDownloads/' /etc/pacman.conf

echo "Enabling colors and the easter egg..."
sudo sed -i 's/^#Color/Color\nILoveCandy/' /etc/pacman.conf

echo "Enabling multilib..."
sudo sed -i "/\[multilib\]/,/Include/"'s/^#//' /etc/pacman.conf

echo "Fetching the fastest mirrors..."
sudo reflector --country Germany,Poland,Czechia --protocol https --sort rate --save /etc/pacman.d/mirrorlist --verbose

nc=$(grep -c ^processor /proc/cpuinfo)
echo -ne "
-------------------------------------------------------------------------
                    You have " $nc" cores. And
            changing the makeflags for " $nc" cores. Aswell as
                changing the compression settings.
-------------------------------------------------------------------------
"
TOTAL_MEM=$(cat /proc/meminfo | grep -i 'memtotal' | grep -o '[[:digit:]]*')
if [[  $TOTAL_MEM -gt 8000000 ]]; then
sudo sed -i "s/#MAKEFLAGS=\"-j2\"/MAKEFLAGS=\"-j$nc\"/g" /etc/makepkg.conf
sudo sed -i "s/COMPRESSXZ=(xz -c -z -)/COMPRESSXZ=(xz -c -T $nc -z -)/g" /etc/makepkg.conf
fi
