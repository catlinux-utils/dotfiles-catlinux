#!/bin/bash

# Get the current battery percentage
if [ -f "/sys/class/power_supply/BAT1/capacity" ]; then
    battery_percentage=$(cat /sys/class/power_supply/BAT1/capacity)
    battery_status=$(cat /sys/class/power_supply/BAT1/status)

    # Define the battery icons for each 10% segment
    battery_icons=("󰂃" "󰁺" "󰁻" "󰁼" "󰁽" "󰁾" "󰁿" "󰂀" "󰂁" "󰁹")

    # Define the charging icon
    charging_icon="󰂄"

    if [ "$battery_percentage" -eq 100 ]; then
        icon_index=9 # Set icon_index to 9 when battery_percentage is 100%
    else
        icon_index=$((battery_percentage / 10))
    fi

    # Get the corresponding icon
    battery_icon=${battery_icons[icon_index]}

    # Check if the battery is charging
    if [ "$battery_status" = "Charging" ]; then
        battery_icon="$charging_icon"
    fi

    # Output the battery percentage and icon
    echo "$battery_percentage% $battery_icon"
else
    echo ""
fi
