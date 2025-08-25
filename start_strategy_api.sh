#!/bin/bash

# Strategic Dashboard API Startup Script
# Starts the strategic data integration and management system

echo "🚀 Starting Strategic Dashboard API Server..."

# Set working directory
cd /var/www/strategy.uprootiny.dev

# Create logs directory
mkdir -p logs

# Install required Python packages if needed
if ! python3 -c "import flask, pandas, numpy, psutil, requests" 2>/dev/null; then
    echo "📦 Installing required Python packages..."
    pip3 install flask flask-cors pandas numpy psutil requests sqlite3 python-dateutil
fi

# Set environment variables
export FLASK_APP=strategy_api.py
export FLASK_ENV=production
export PYTHONPATH=/var/www/strategy.uprootiny.dev:$PYTHONPATH

# Check if port 5560 is available
if lsof -Pi :5560 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5560 is already in use, attempting to kill existing process..."
    pkill -f "strategy_api.py" || true
    sleep 2
fi

# Start the API server in background
nohup python3 strategy_api.py > logs/strategy_api.log 2>&1 &
API_PID=$!

# Wait a moment for startup
sleep 3

# Check if the service started successfully
if kill -0 $API_PID 2>/dev/null; then
    echo "✅ Strategic Dashboard API Server started successfully on port 5560"
    echo "📊 Dashboard available at: http://localhost:5560"
    echo "🔍 API documentation at: http://localhost:5560/api/health"
    echo "📝 Logs available at: logs/strategy_api.log"
    echo "🆔 Process ID: $API_PID"
    
    # Register with nginx if proxy config exists
    if [ -f "/etc/nginx/sites-available/strategy.uprootiny.dev" ]; then
        echo "🔄 Reloading nginx configuration..."
        sudo nginx -t && sudo systemctl reload nginx
    fi
    
    # Test the API health endpoint
    sleep 2
    if curl -s http://localhost:5560/api/health > /dev/null; then
        echo "✅ API health check passed"
    else
        echo "⚠️  API health check failed, checking logs..."
        tail -n 10 logs/strategy_api.log
    fi
else
    echo "❌ Failed to start Strategic Dashboard API Server"
    echo "📝 Check logs for details:"
    cat logs/strategy_api.log
    exit 1
fi

echo "🎯 Strategic Command Center operational!"
echo "📊 Real-time strategic data integration active"
echo "⚡ Strategic actions and insights available"