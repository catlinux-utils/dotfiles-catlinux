#!/bin/bash

sudo sh -c "echo 'Defaults passwd_timeout=0' > /etc/sudoers.d/disable-timeout.conf"
sudo sh -c "echo '%wheel      ALL=(ALL:ALL) ALL' > /etc/sudoers.d/enable-wheel.conf"


