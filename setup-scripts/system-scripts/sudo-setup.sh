#!/bin/bash
set -e

sudo sh -c "echo 'Defaults passwd_timeout=0' > /etc/sudoers.d/disable-timeout.conf"

sudo sed -i '/^# %wheel ALL=(ALL:ALL) ALL/ s/# //' /etc/sudoers

