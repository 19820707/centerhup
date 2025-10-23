#!/bin/bash
echo "Starting build process..."

# Clean previous builds
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
npm ci

# Build the project
npm run build

echo "Build completed successfully!"
