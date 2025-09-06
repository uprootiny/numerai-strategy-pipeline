#!/bin/bash
# Numerai Pipeline Test Runner
cd "$(dirname "$0")"

echo "Running Numerai Pipeline Tests..."

# Activate UV environment and run tests
uv run python -m pytest tests/ -v --cov=. --cov-report=term-missing

echo "Tests complete"
