#!/bin/bash

if [[ $EUID -ne 0 ]]; then
    echo "$0 is not running as root. Running sudo"
    if ! sudo -v; then
        echo "Failed to run sudo. Exiting."
        exit 1
    fi
fi

sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf

sudo mkdir -p /etc/systemd/resolved.conf.d/
sudo sh -c "echo '[Resolve]\nDNS=1.1.1.1#cloudflare-dns.com 1.0.0.1#cloudflare-dns.com 2606:4700:4700::1111#cloudflare-dns.com 2606:4700:4700::1001#cloudflare-dns.com' > /etc/systemd/resolved.conf.d/dns-over-tls.conf"
sudo sh -c "echo 'FallbackDNS=1.1.1.1#cloudflare-dns.com 9.9.9.9#dns.quad9.net 8.8.8.8#dns.google 2606:4700:4700::1111#cloudflare-dns.com 2620:fe::9#dns.quad9.net 2001:4860:4860::8888#dns.google' >> /etc/systemd/resolved.conf.d/dns-over-tls.conf"
sudo sh -c "echo 'DNSOverTLS=yes' >> /etc/systemd/resolved.conf.d/dns-over-tls.conf"

sudo systemctl enable --now systemd-resolved.service