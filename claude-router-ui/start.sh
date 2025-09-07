#!/bin/bash
# Claude Financial Vessels Router Startup

set -euo pipefail

echo "🌐 Starting Claude Financial Vessels Router"
echo "📊 Bridging gap between technical routing and financial vessels vision"

# Ensure claude router script is executable
chmod +x ../.claude/claude_router.sh

# Check if babashka is available
if ! command -v bb &> /dev/null; then
    echo "❌ Babashka not found. Install with: bash < <(curl -s https://raw.githubusercontent.com/babashka/babashka/master/install)"
    exit 1
fi

echo "✅ Babashka found"

# Start the Babashka server
echo "🚀 Starting Babashka server on port 8889..."
echo "🔗 Web UI will be available at: http://localhost:8889"
echo "📈 Financial vessels alignment tracking enabled"
echo ""
echo "🎯 VISION GAP ANALYSIS:"
echo "  Current: Technical project routing"
echo "  Vision: Strategic financial optimization" 
echo "  Bridge: Attention flow & value stream mapping"
echo ""

exec bb main.clj