#!/bin/bash

# Navigate to the 'native' directory
cd native

# Build the Zig project
echo "Running Zig build...."
zig build
echo "Finished"

# Return to the previous directory
cd ..

# Run the Python build script
python3 build.py
