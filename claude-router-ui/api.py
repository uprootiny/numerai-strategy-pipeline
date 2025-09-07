#!/usr/bin/env python3
"""
Claude Router API - Lightweight backend for context switching
Bridging the gap between UI and financial vessels vision
"""

from flask import Flask, jsonify, request, send_from_directory
import subprocess
import json
import os
from pathlib import Path
from datetime import datetime

app = Flask(__name__)

# Configuration
CLAUDE_ROUTER_SCRIPT = "../.claude/claude_router.sh"
PROJECTS_CONFIG = {
    "numerai": {
        "name": "Numerai Pipeline", 
        "path": "/var/www/strategy.uprootiny.dev/numerai-pipeline",
        "financial_vessel": "ML_PREDICTION_ENGINE",
        "revenue_stream": "tournament_winnings",
        "strategic_value": "high"
    },
    "pythia": {
        "name": "Pythia TDA Core",
        "path": "/tmp/pythia-demo", 
        "financial_vessel": "TRADING_ANALYSIS_PLATFORM",
        "revenue_stream": "strategy_optimization",
        "strategic_value": "high"
    },
    "backtesting": {
        "name": "Backtesting Engine",
        "path": "/var/www/elixir-backtesting-engine.uprootiny.dev",
        "financial_vessel": "STRATEGY_VALIDATION_ENGINE", 
        "revenue_stream": "risk_assessment",
        "strategic_value": "medium"
    },
    "phoenix": {
        "name": "Phoenix Live",
        "path": "/var/www/phoenix-live",
        "financial_vessel": "REAL_TIME_INTERFACE",
        "revenue_stream": "user_engagement", 
        "strategic_value": "medium"
    },
    "rust": {
        "name": "Performance Monitor",
        "path": "/var/www/performance-monitor-rs", 
        "financial_vessel": "PERFORMANCE_OPTIMIZATION",
        "revenue_stream": "efficiency_gains",
        "strategic_value": "medium"
    },
    "haskell": {
        "name": "Haskell Tournament",
        "path": "/var/www/repositories/numerai-haskell-tournament",
        "financial_vessel": "MATHEMATICAL_MODELING",
        "revenue_stream": "advanced_algorithms", 
        "strategic_value": "medium"
    },
    "substance": {
        "name": "Substance",
        "path": "/var/www/substance",
        "financial_vessel": "INFRASTRUCTURE_FOUNDATION",
        "revenue_stream": "operational_efficiency",
        "strategic_value": "low"
    },
    "docs": {
        "name": "Enhanced Docs", 
        "path": "/var/www/enhanced-docs-browser",
        "financial_vessel": "KNOWLEDGE_MANAGEMENT",
        "revenue_stream": "intellectual_property",
        "strategic_value": "low"
    },
    "wedding": {
        "name": "Wedding Site",
        "path": "/var/www/eliot-wedding.hyperstitious.art", 
        "financial_vessel": "BRAND_SHOWCASE",
        "revenue_stream": "reputation_building",
        "strategic_value": "low"
    }
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/projects')
def get_projects():
    """Get all projects with financial vessel context"""
    return jsonify(PROJECTS_CONFIG)

@app.route('/api/current-context')
def get_current_context():
    """Get current active context"""
    try:
        result = subprocess.run(
            ['bash', CLAUDE_ROUTER_SCRIPT, 'context'], 
            capture_output=True, text=True, check=True
        )
        
        # Parse the shell output
        lines = result.stdout.strip().split('\n')
        context = {}
        
        for line in lines:
            if 'Current context:' in line:
                parts = line.split(':')[1].strip().split('(')
                context['project'] = parts[0].strip()
                if len(parts) > 1:
                    priority_part = parts[1].replace('priority:', '').replace(')', '').strip()
                    context['priority'] = priority_part
            elif 'Path:' in line:
                context['path'] = line.split(':', 1)[1].strip()
            elif 'Tools:' in line:
                context['tools'] = line.split(':', 1)[1].strip()
        
        # Add financial vessel context
        project_key = context.get('project', 'numerai')
        if project_key in PROJECTS_CONFIG:
            context.update(PROJECTS_CONFIG[project_key])
        
        return jsonify(context)
        
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Failed to get context", "details": e.stderr}), 500

@app.route('/api/switch-context/<project>', methods=['POST'])
def switch_context(project):
    """Switch to specified project context"""
    if project not in PROJECTS_CONFIG:
        return jsonify({"error": f"Unknown project: {project}"}), 400
    
    try:
        result = subprocess.run(
            ['bash', CLAUDE_ROUTER_SCRIPT, 'switch', project],
            capture_output=True, text=True, check=True
        )
        
        return jsonify({
            "success": True,
            "project": project,
            "message": result.stdout.strip(),
            "financial_vessel": PROJECTS_CONFIG[project]["financial_vessel"],
            "strategic_value": PROJECTS_CONFIG[project]["strategic_value"]
        })
        
    except subprocess.CalledProcessError as e:
        return jsonify({
            "error": "Context switch failed", 
            "details": e.stderr
        }), 500

@app.route('/api/detect-project')
def detect_project():
    """Detect project from file path or content"""
    file_path = request.args.get('path', '')
    content_hint = request.args.get('content', '')
    
    try:
        result = subprocess.run(
            ['bash', CLAUDE_ROUTER_SCRIPT, 'detect', file_path, content_hint],
            capture_output=True, text=True, check=True
        )
        
        detected_project = result.stdout.strip()
        
        return jsonify({
            "detected_project": detected_project,
            "file_path": file_path,
            "project_config": PROJECTS_CONFIG.get(detected_project, {}),
            "financial_vessel": PROJECTS_CONFIG.get(detected_project, {}).get("financial_vessel", "UNKNOWN")
        })
        
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Detection failed", "details": e.stderr}), 500

@app.route('/api/routing-log')
def get_routing_log():
    """Get recent routing log entries"""
    try:
        result = subprocess.run(
            ['bash', CLAUDE_ROUTER_SCRIPT, 'log'],
            capture_output=True, text=True, check=True
        )
        
        log_entries = []
        for line in result.stdout.strip().split('\n'):
            if line.strip():
                log_entries.append(line)
        
        return jsonify({"log_entries": log_entries})
        
    except subprocess.CalledProcessError as e:
        return jsonify({"error": "Failed to get log", "details": e.stderr}), 500

@app.route('/api/financial-vessels-status')
def financial_vessels_status():
    """Get financial vessels strategic overview"""
    vessels = {}
    
    for project_key, project_config in PROJECTS_CONFIG.items():
        vessel_type = project_config["financial_vessel"]
        
        if vessel_type not in vessels:
            vessels[vessel_type] = {
                "projects": [],
                "combined_strategic_value": 0,
                "revenue_streams": [],
                "operational_status": "active"
            }
        
        vessels[vessel_type]["projects"].append({
            "name": project_config["name"],
            "key": project_key,
            "path": project_config["path"],
            "strategic_value": project_config["strategic_value"]
        })
        
        vessels[vessel_type]["revenue_streams"].append(project_config["revenue_stream"])
        
        # Calculate combined strategic value
        value_weights = {"high": 3, "medium": 2, "low": 1}
        vessels[vessel_type]["combined_strategic_value"] += value_weights.get(
            project_config["strategic_value"], 1
        )
    
    # Calculate overall financial vessels health
    total_strategic_value = sum(v["combined_strategic_value"] for v in vessels.values())
    high_value_vessels = sum(1 for v in vessels.values() if v["combined_strategic_value"] >= 3)
    
    return jsonify({
        "financial_vessels": vessels,
        "strategic_overview": {
            "total_vessels": len(vessels),
            "high_value_vessels": high_value_vessels,
            "total_strategic_value": total_strategic_value,
            "diversification_score": len(set(
                stream for vessel in vessels.values() 
                for stream in vessel["revenue_streams"]
            )),
            "vision_alignment": "PARTIAL" if total_strategic_value > 10 else "DEVELOPING"
        }
    })

@app.route('/api/vision-gap-analysis')
def vision_gap_analysis():
    """Analyze gap between current state and financial vessels vision"""
    
    # Current capabilities
    implemented = {
        "ml_prediction_system": True,  # numerai pipeline
        "distributed_processing": True,  # mesh network
        "polyglot_integration": True,  # rust/haskell/elixir
        "production_deployment": True,  # robust pipeline
        "context_switching": True,  # claude router
    }
    
    # Financial vessels vision requirements
    vision_requirements = {
        "live_tournament_participation": False,  # Phase 1 goal
        "automated_strategy_optimization": False,  # pythia integration needed
        "real_time_risk_management": False,  # backtesting engine integration needed  
        "multi_asset_trading": False,  # expansion beyond numerai needed
        "performance_attribution": False,  # advanced analytics needed
        "client_facing_interfaces": False,  # phoenix integration needed
        "intellectual_property_monetization": False,  # docs/knowledge system needed
        "scalable_infrastructure": True,  # mesh network provides this
        "cross_language_optimization": True,  # polyglot features provide this
        "defensive_programming": True,  # robust pipeline provides this
    }
    
    # Calculate gaps
    total_requirements = len(vision_requirements)
    implemented_requirements = sum(vision_requirements.values())
    gap_percentage = (total_requirements - implemented_requirements) / total_requirements * 100
    
    critical_gaps = [
        key for key, implemented in vision_requirements.items() 
        if not implemented
    ]
    
    return jsonify({
        "vision_alignment_percentage": 100 - gap_percentage,
        "implemented_capabilities": sum(implemented.values()),
        "total_capabilities": len(implemented),
        "vision_requirements_met": implemented_requirements,
        "total_vision_requirements": total_requirements,
        "critical_gaps": critical_gaps,
        "next_phase_priorities": [
            "live_tournament_participation",
            "automated_strategy_optimization", 
            "real_time_risk_management"
        ],
        "strategic_recommendation": "Focus on Phase 1 tournament integration to bridge largest vision gap"
    })

if __name__ == '__main__':
    # Make router script executable
    os.chmod(CLAUDE_ROUTER_SCRIPT, 0o755)
    
    print("🌐 Claude Router API starting...")
    print(f"🔧 Router script: {CLAUDE_ROUTER_SCRIPT}")
    print(f"📊 Financial vessels configured: {len(PROJECTS_CONFIG)}")
    
    app.run(host='0.0.0.0', port=8888, debug=True)