#!/bin/bash

#Source: https://github.com/ChrisTitusTech/neovim
#modified by catlinux

RC='\e[0m'
RED='\e[31m'
YELLOW='\e[33m'
GREEN='\e[32m'

DOTFILESDIR="$HOME/dotfiles-catlinux"

HYPR="hyprland hyprlock hypridle hyprshot xdg-desktop-portal-hyprland xdg-desktop-portal-gtk qt5-wayland qt6-wayland qt6ct kvantum"
UTILS="swww rofi-wayland wl-clipboard gnome-keyring polkit-gnome network-manager-applet xorg-xhost aylurs-gtk-shell"
APPS="kitty thorium-browser-bin vscode"
TERMINAL="ttf-meslo-nerd zsh oh-my-posh zsh-autosuggestions zsh-syntax-highlighting"

ARCH_DEPENDENCIES="${HYPR} ${UTILS} ${APPS} ${TERMINAL}" 



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
    echo -e "${RED}Unable to determine OS. Please install required packages manually.${RC}"
fi

cd $HOME

if [[ ! -d "$DOTFILESDIR" ]]; then
    echo -e "${YELLOW}Creating dotfiles directory: $DOTFILESDIR${RC}"
    mkdir -p "$DOTFILESDIR"
    echo -e "${GREEN}dotfiles directory created: $DOTFILESDIR${RC}"
fi

if [[ ! -d "$DOTFILESDIR/.git" ]]; then
    echo -e "${YELLOW}Cloning neovim repository into: $DOTFILESDIR${RC}"
    git clone https://github.com/catlinux-utils/dotfiles-catlinux "$DOTFILESDIR"
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}Successfully cloned dotfiles-catlinux repository${RC}"
    else
        echo -e "${RED}Failed to clone dotfiles-catlinux repository${RC}"
        exit 1
    fi
else
    git pull
fi


# Backup existing neovim config and install new one
mkdir -p "$DOTFILESDIR/backup/.config/"
[ -d ~/.config/hypr ] && cp -r ~/.config/hypr "$DOTFILESDIR/backup/.config/hypr"
[ -d ~/.config/kitty ] && cp -r ~/.config/kitty "$DOTFILESDIR/backup/.config/kitty"
[ -d ~/.config/rofi ] && cp -r ~/.config/rofi "$DOTFILESDIR/backup/.config/rofi"
[ -d ~/.config/waybar ] && cp -r ~/.config/waybar "$DOTFILESDIR/backup/.config/waybar"
[ -f ~/.zshrc ] && cp ~/.zshrc "$DOTFILESDIR/backup/.zshrc"
rm -rf ~/.config/hypr ~/.config/kitty ~/.config/rofi ~/.config/waybar

cd $DOTFILESDIR
bash install.sh

