#!/bin/bash
# Numerai Pipeline Startup Script
cd "$(dirname "$0")"

echo "Starting Numerai Pipeline on strategy.uprootiny.dev..."

# Activate UV environment
export PATH="$(pwd)/.venv/bin:$PATH"

# Run analytics
echo "Running analytics..."
uv run python -m analytics.analyze_uprootiny

# Run model if available
if [ -f "model_uprootiny.py" ]; then
    echo "Model file available for execution"
fi

echo "Numerai Pipeline startup complete"
