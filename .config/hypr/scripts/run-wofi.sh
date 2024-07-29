#!/bin/bash


if ! pgrep -x wofi >/dev/null; then
    wofi &
fi
