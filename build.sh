#!/bin/bash

# Generic build script template for uprootiny.dev subprojects
# Copy this file to each project directory as build.sh

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="$(basename "$PROJECT_DIR")"

echo "🔨 Building $PROJECT_NAME..."
echo "📁 Project directory: $PROJECT_DIR"

# Load manifest configuration
if [ -f "$PROJECT_DIR/manifest.json" ]; then
    echo "📋 Found manifest.json"
    # You can parse manifest.json here for build configuration
else
    echo "⚠️  No manifest.json found - using defaults"
fi

# Default build steps (customize per project)
if [ -d "$PROJECT_DIR/src" ]; then
    echo "📦 Processing source files..."
    
    # Example: Copy HTML/CSS/JS files
    mkdir -p "$PROJECT_DIR/public"
    cp -r "$PROJECT_DIR/src/"* "$PROJECT_DIR/public/"
    
    # Example: Process SCSS if needed
    if command -v sass &> /dev/null && find "$PROJECT_DIR/src" -name "*.scss" | grep -q .; then
        echo "🎨 Compiling SCSS..."
        sass "$PROJECT_DIR/src/styles.scss" "$PROJECT_DIR/public/styles.css"
    fi
    
    # Example: Bundle JavaScript if needed
    if [ -f "$PROJECT_DIR/src/main.js" ] && command -v esbuild &> /dev/null; then
        echo "📦 Bundling JavaScript..."
        esbuild "$PROJECT_DIR/src/main.js" --bundle --outfile="$PROJECT_DIR/public/bundle.js"
    fi
    
else
    echo "ℹ️  No src/ directory found - assuming static files are already in place"
fi

# Update manifest timestamp
if [ -f "$PROJECT_DIR/manifest.json" ]; then
    # Update last_updated timestamp (requires jq)
    if command -v jq &> /dev/null; then
        tmp=$(mktemp)
        jq '.last_updated = now | strftime("%Y-%m-%dT%H:%M:%SZ")' "$PROJECT_DIR/manifest.json" > "$tmp"
        mv "$tmp" "$PROJECT_DIR/manifest.json"
    fi
fi

echo "✅ Build completed for $PROJECT_NAME"
echo "🌐 Available at: http://$PROJECT_NAME.uprootiny.dev"