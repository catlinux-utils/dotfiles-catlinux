#!/bin/bash

# Loop over all directories in the current directory
for dir in */; do
    # Check if the directory is not the current directory or a hidden directory
    if [[ $dir != "./" && $dir != "./." && $dir != "../" && $dir != "./../" ]]; then
        # Remove all files with a .pkg.* extension
        find $dir -type f -name "*.pkg.*" -exec rm {} \;

        # Remove all subdirectories
        find $dir -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} \;
    fi
done

