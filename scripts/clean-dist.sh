#!/bin/bash

if [ -d "dist" ]; then
    rm -rf dist
else
    echo "No 'dist' folder found to delete."
fi