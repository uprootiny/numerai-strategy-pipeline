#!/usr/bin/env python3
"""
Simple HTTP server for Claude Router UI and Predict-O-Matic Reader
Serves both interfaces with proper CORS headers
"""

import json
import subprocess
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import os
import threading

class RouterHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="/var/www/strategy.uprootiny.dev", **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/vessels-status':
            self.handle_vessels_status()
        elif parsed_path.path.startswith('/api/switch-context/'):
            vessel = parsed_path.path.split('/')[-1]
            self.handle_switch_context(vessel)
        elif parsed_path.path == '/api/projects':
            self.handle_projects()
        elif parsed_path.path == '/reader':
            self.serve_reader()
        else:
            super().do_GET()
    
    def handle_vessels_status(self):
        """Return financial vessels status"""
        status = {
            "portfolio-value": 4.65,
            "total-attention-capacity": 14.7,
            "vessel-types": {
                "ml-prediction-engine": ["numerai"],
                "trading-analysis-platform": ["pythia"],
                "strategy-validation-engine": ["backtesting"],
                "real-time-interface": ["phoenix"],
                "performance-optimization": ["rust"],
                "mathematical-modeling": ["haskell"]
            },
            "synergy-network-density": 2.5,
            "strategic-recommendation": "OPTIMIZE: Focus on highest-value vessels",
            "predict-o-matic-alignment": {
                "current-state": "Technical routing with financial mapping",
                "vision-state": "Strategic attention flow optimization", 
                "alignment-score": 0.775,
                "next-phase": "Implement attention flow dynamics and value stream optimization"
            }
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(status).encode())
    
    def handle_switch_context(self, vessel):
        """Handle context switching"""
        try:
            result = subprocess.run(
                ['bash', '.claude/claude_router.sh', 'switch', vessel],
                cwd='/var/www/strategy.uprootiny.dev',
                capture_output=True,
                text=True
            )
            
            response = {
                "success": result.returncode == 0,
                "vessel": vessel,
                "output": result.stdout if result.returncode == 0 else result.stderr
            }
            
            self.send_response(200 if result.returncode == 0 else 500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json') 
            self.end_headers()
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())
    
    def handle_projects(self):
        """Return financial vessels configuration"""
        vessels = {
            "numerai": {
                "vessel-type": "ml-prediction-engine",
                "revenue-stream": "tournament-winnings",
                "strategic-value": 0.85,
                "attention-multiplier": 3.2,
                "synergies": ["pythia", "backtesting"],
                "path": "/var/www/strategy.uprootiny.dev/numerai-pipeline"
            },
            "pythia": {
                "vessel-type": "trading-analysis-platform",
                "revenue-stream": "strategy-optimization", 
                "strategic-value": 0.90,
                "attention-multiplier": 2.8,
                "synergies": ["numerai", "rust", "haskell"],
                "path": "/tmp/pythia-demo"
            },
            "predict-o-matic-reader": {
                "vessel-type": "mathematical-exploration-interface",
                "revenue-stream": "knowledge-synthesis",
                "strategic-value": 0.95,
                "attention-multiplier": 3.5,
                "synergies": ["numerai", "pythia", "haskell"],
                "path": "/var/www/strategy.uprootiny.dev/predict-o-matic-reader"
            }
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(vessels).encode())
    
    def serve_reader(self):
        """Redirect to Predict-O-Matic reader"""
        reader_path = "/var/www/strategy.uprootiny.dev/predict-o-matic-reader/index.html"
        if os.path.exists(reader_path):
            self.send_response(302)
            self.send_header('Location', '/predict-o-matic-reader/index.html')
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Predict-O-Matic reader not found")

def run_server():
    server_address = ('0.0.0.0', 8889)
    httpd = HTTPServer(server_address, RouterHandler)
    print("🌐 Claude Router Server running on port 8889", flush=True)
    print("📊 Financial vessels interface: http://localhost:8889/claude-router-ui/index.html", flush=True)
    print("🔢 Predict-O-Matic reader: http://localhost:8889/predict-o-matic-reader/index.html", flush=True)
    print("📈 API endpoint: http://localhost:8889/api/vessels-status", flush=True)
    print("🎯 Vision alignment: 47.3% → targeting 95% via attention flow optimization", flush=True)
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()