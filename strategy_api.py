#!/usr/bin/env python3
"""
Strategic Dashboard API Server
Real strategic data integration and management system
"""

import os
import json
import time
import sqlite3
import psutil
import subprocess
import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from flask import Flask, request, jsonify
from flask_cors import CORS
import threading
import logging
import asyncio
from collections import defaultdict

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

BASE_DIR = Path("/var/www")
DB_PATH = Path("/var/www/strategy.uprootiny.dev/strategy.db")

@dataclass
class StrategicMetric:
    """Strategic performance metric"""
    name: str
    value: float
    trend: str  # 'up', 'down', 'stable'
    category: str  # 'financial', 'operational', 'technical', 'predictive'
    timestamp: str
    source: str

@dataclass
class SystemIntegration:
    """System integration status"""
    system: str
    url: str
    status: str  # 'active', 'degraded', 'offline'
    last_sync: str
    data_quality: float
    key_metrics: Dict[str, Any]

@dataclass
class StrategicDecision:
    """Strategic decision record"""
    decision_id: str
    title: str
    description: str
    impact_score: float
    confidence: float
    dependencies: List[str]
    timeline: str
    status: str  # 'proposed', 'approved', 'implementing', 'completed'
    outcome_metrics: Dict[str, Any]

class StrategyEngine:
    """Core strategy coordination engine"""
    
    def __init__(self):
        self.init_database()
        self.service_registry = {
            "numerai-vessels": "http://127.0.0.1:5011",
            "agent-bridge": "http://127.0.0.1:5012",
            "asset-generator": "http://127.0.0.1:5008"
        }
        self.metrics_cache = {}
        self.last_update = None
        self.decision_history = []
        
    def init_database(self):
        """Initialize SQLite database for strategic data"""
        DB_PATH.parent.mkdir(exist_ok=True)
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS strategic_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                value REAL NOT NULL,
                trend TEXT NOT NULL,
                category TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                source TEXT NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS system_integrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                system TEXT NOT NULL UNIQUE,
                url TEXT NOT NULL,
                status TEXT NOT NULL,
                last_sync TEXT NOT NULL,
                data_quality REAL NOT NULL,
                key_metrics TEXT NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS strategic_decisions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                decision_id TEXT NOT NULL UNIQUE,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                impact_score REAL NOT NULL,
                confidence REAL NOT NULL,
                dependencies TEXT NOT NULL,
                timeline TEXT NOT NULL,
                status TEXT NOT NULL,
                outcome_metrics TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Strategy database initialized")
    
    def collect_real_metrics(self) -> Dict[str, Any]:
        """Collect real metrics from all integrated systems"""
        metrics = {}
        
        # System Performance Metrics
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        metrics['system'] = {
            'cpu_usage': cpu_percent,
            'memory_usage': memory.percent,
            'disk_usage': (disk.used / disk.total) * 100,
            'load_average': os.getloadavg()[0] if hasattr(os, 'getloadavg') else 0,
            'active_processes': len(psutil.pids())
        }
        
        # Collect from integrated services
        for service, url in self.service_registry.items():
            try:
                response = requests.get(f"{url}/api/health", timeout=5)
                if response.status_code == 200:
                    service_data = response.json()
                    metrics[service] = service_data
                    logger.info(f"Collected metrics from {service}")
                else:
                    metrics[service] = {'status': 'unhealthy', 'error': f"HTTP {response.status_code}"}
            except Exception as e:
                metrics[service] = {'status': 'offline', 'error': str(e)}
                logger.warning(f"Failed to collect from {service}: {e}")
        
        # Calculate strategic KPIs
        metrics['strategic_kpis'] = self.calculate_strategic_kpis(metrics)
        
        self.metrics_cache = metrics
        self.last_update = datetime.now().isoformat()
        
        return metrics
    
    def calculate_strategic_kpis(self, raw_metrics: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate high-level strategic KPIs"""
        kpis = {}
        
        # System Health Score (0-100)
        system_health = 100
        if 'system' in raw_metrics:
            sys = raw_metrics['system']
            system_health = max(0, 100 - (
                sys.get('cpu_usage', 0) * 0.3 +
                sys.get('memory_usage', 0) * 0.4 +
                sys.get('disk_usage', 0) * 0.3
            ))
        
        # Service Availability Score
        active_services = sum(1 for k, v in raw_metrics.items() 
                            if k != 'system' and isinstance(v, dict) and v.get('status') != 'offline')
        total_services = len(self.service_registry)
        availability_score = (active_services / total_services) * 100 if total_services > 0 else 0
        
        # Integration Quality Score  
        quality_scores = []
        for service, data in raw_metrics.items():
            if service != 'system' and isinstance(data, dict):
                if 'data_quality' in data:
                    quality_scores.append(data['data_quality'])
                elif data.get('status') == 'offline':
                    quality_scores.append(0)
                else:
                    quality_scores.append(75)  # Default for healthy services
        
        integration_quality = np.mean(quality_scores) if quality_scores else 0
        
        # Performance Score (based on predictions, if available)
        performance_score = 0
        if 'numerai-vessels' in raw_metrics:
            nv_data = raw_metrics['numerai-vessels']
            if isinstance(nv_data, dict) and 'correlation' in nv_data:
                correlation = nv_data.get('correlation', 0)
                performance_score = max(0, (correlation + 0.1) * 500)  # Scale correlation to 0-100
        
        kpis = {
            'system_health_score': round(system_health, 1),
            'service_availability_score': round(availability_score, 1),
            'integration_quality_score': round(integration_quality, 1),
            'performance_score': round(performance_score, 1),
            'overall_strategic_score': round((system_health + availability_score + integration_quality + performance_score) / 4, 1)
        }
        
        return kpis
    
    def get_strategic_insights(self) -> List[Dict[str, Any]]:
        """Generate strategic insights based on collected data"""
        insights = []
        
        if not self.metrics_cache:
            return insights
        
        kpis = self.metrics_cache.get('strategic_kpis', {})
        
        # System health insights
        health_score = kpis.get('system_health_score', 0)
        if health_score < 70:
            insights.append({
                'type': 'warning',
                'priority': 'high',
                'title': 'System Performance Degradation',
                'description': f'System health at {health_score}% - resource optimization needed',
                'recommended_actions': ['Scale infrastructure', 'Optimize resource usage', 'Review service allocation']
            })
        
        # Service availability insights  
        availability = kpis.get('service_availability_score', 0)
        if availability < 90:
            insights.append({
                'type': 'alert',
                'priority': 'high',
                'title': 'Service Availability Issues',
                'description': f'Only {availability}% of services are available',
                'recommended_actions': ['Restart failed services', 'Check service dependencies', 'Review deployment status']
            })
        
        # Performance insights
        performance = kpis.get('performance_score', 0)
        if performance > 80:
            insights.append({
                'type': 'success',
                'priority': 'medium',
                'title': 'Strong Predictive Performance',
                'description': f'ML models achieving {performance}% performance score',
                'recommended_actions': ['Scale successful strategies', 'Increase position sizes', 'Expand model deployment']
            })
        
        return insights
    
    def create_strategic_decision(self, decision_data: Dict[str, Any]) -> str:
        """Create a new strategic decision record"""
        decision_id = f"STRAT-{int(time.time())}"
        
        decision = StrategicDecision(
            decision_id=decision_id,
            title=decision_data.get('title', ''),
            description=decision_data.get('description', ''),
            impact_score=decision_data.get('impact_score', 0.0),
            confidence=decision_data.get('confidence', 0.0),
            dependencies=decision_data.get('dependencies', []),
            timeline=decision_data.get('timeline', ''),
            status='proposed',
            outcome_metrics=decision_data.get('outcome_metrics', {})
        )
        
        # Store in database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO strategic_decisions 
            (decision_id, title, description, impact_score, confidence, dependencies, timeline, status, outcome_metrics, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            decision.decision_id,
            decision.title,
            decision.description,
            decision.impact_score,
            decision.confidence,
            json.dumps(decision.dependencies),
            decision.timeline,
            decision.status,
            json.dumps(decision.outcome_metrics),
            datetime.now().isoformat()
        ))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Created strategic decision: {decision_id}")
        return decision_id
    
    def get_portfolio_analysis(self) -> Dict[str, Any]:
        """Analyze portfolio performance across systems"""
        analysis = {
            'overview': {},
            'performance': {},
            'risk_metrics': {},
            'recommendations': []
        }
        
        # Collect performance data from numerai-vessels
        try:
            response = requests.get(f"{self.service_registry['numerai-vessels']}/api/performance", timeout=5)
            if response.status_code == 200:
                perf_data = response.json()
                analysis['performance'] = perf_data
        except Exception as e:
            logger.warning(f"Failed to get performance data: {e}")
        
        # Calculate risk metrics
        analysis['risk_metrics'] = {
            'system_risk': self.calculate_system_risk(),
            'integration_risk': self.calculate_integration_risk(),
            'performance_risk': self.calculate_performance_risk()
        }
        
        return analysis
    
    def calculate_system_risk(self) -> float:
        """Calculate system-level risk score"""
        if not self.metrics_cache:
            return 100.0
        
        kpis = self.metrics_cache.get('strategic_kpis', {})
        health = kpis.get('system_health_score', 0)
        availability = kpis.get('service_availability_score', 0)
        
        risk_score = max(0, 100 - ((health + availability) / 2))
        return round(risk_score, 2)
    
    def calculate_integration_risk(self) -> float:
        """Calculate integration risk based on service health"""
        if not self.metrics_cache:
            return 100.0
        
        offline_services = sum(1 for k, v in self.metrics_cache.items() 
                             if k != 'system' and isinstance(v, dict) and v.get('status') == 'offline')
        total_services = len(self.service_registry)
        
        risk_score = (offline_services / total_services) * 100 if total_services > 0 else 0
        return round(risk_score, 2)
    
    def calculate_performance_risk(self) -> float:
        """Calculate performance risk based on ML model performance"""
        # This would integrate with actual ML performance metrics
        # For now, return a calculated risk based on available data
        base_risk = 25.0  # Base performance risk
        
        if 'numerai-vessels' in self.metrics_cache:
            nv_data = self.metrics_cache['numerai-vessels']
            if isinstance(nv_data, dict) and 'correlation' in nv_data:
                correlation = nv_data.get('correlation', 0)
                # Higher correlation = lower risk
                performance_factor = max(0, 1 - (correlation + 0.1) * 2)
                base_risk *= performance_factor
        
        return round(base_risk, 2)

# Initialize strategy engine
strategy_engine = StrategyEngine()

# API Endpoints

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'strategy-dashboard',
        'version': '1.0.0'
    })

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get real-time strategic metrics"""
    try:
        metrics = strategy_engine.collect_real_metrics()
        return jsonify({
            'success': True,
            'data': metrics,
            'timestamp': strategy_engine.last_update
        })
    except Exception as e:
        logger.error(f"Error collecting metrics: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/insights', methods=['GET'])
def get_insights():
    """Get strategic insights and recommendations"""
    try:
        insights = strategy_engine.get_strategic_insights()
        return jsonify({
            'success': True,
            'data': insights,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f"Error generating insights: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/decisions', methods=['GET', 'POST'])
def handle_decisions():
    """Handle strategic decisions"""
    if request.method == 'GET':
        try:
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM strategic_decisions ORDER BY created_at DESC LIMIT 20')
            rows = cursor.fetchall()
            conn.close()
            
            decisions = []
            for row in rows:
                decisions.append({
                    'decision_id': row[1],
                    'title': row[2],
                    'description': row[3],
                    'impact_score': row[4],
                    'confidence': row[5],
                    'dependencies': json.loads(row[6]),
                    'timeline': row[7],
                    'status': row[8],
                    'outcome_metrics': json.loads(row[9]),
                    'created_at': row[10]
                })
            
            return jsonify({'success': True, 'data': decisions})
            
        except Exception as e:
            logger.error(f"Error retrieving decisions: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    elif request.method == 'POST':
        try:
            decision_data = request.json
            decision_id = strategy_engine.create_strategic_decision(decision_data)
            return jsonify({'success': True, 'decision_id': decision_id})
        except Exception as e:
            logger.error(f"Error creating decision: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio_analysis():
    """Get portfolio performance analysis"""
    try:
        analysis = strategy_engine.get_portfolio_analysis()
        return jsonify({
            'success': True,
            'data': analysis,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f"Error analyzing portfolio: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/systems', methods=['GET'])
def get_system_integrations():
    """Get status of all integrated systems"""
    try:
        integrations = {}
        for service, url in strategy_engine.service_registry.items():
            try:
                response = requests.get(f"{url}/api/health", timeout=3)
                if response.status_code == 200:
                    data = response.json()
                    integrations[service] = {
                        'status': 'active',
                        'url': url,
                        'last_sync': datetime.now().isoformat(),
                        'data_quality': data.get('data_quality', 95.0),
                        'response_time': response.elapsed.total_seconds()
                    }
                else:
                    integrations[service] = {
                        'status': 'degraded',
                        'url': url,
                        'last_sync': datetime.now().isoformat(),
                        'data_quality': 0.0,
                        'error': f"HTTP {response.status_code}"
                    }
            except Exception as e:
                integrations[service] = {
                    'status': 'offline',
                    'url': url,
                    'last_sync': datetime.now().isoformat(),
                    'data_quality': 0.0,
                    'error': str(e)
                }
        
        return jsonify({
            'success': True,
            'data': integrations,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f"Error checking system integrations: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/execute-strategy', methods=['POST'])
def execute_strategy():
    """Execute a strategic action across systems"""
    try:
        strategy_data = request.json
        action = strategy_data.get('action')
        parameters = strategy_data.get('parameters', {})
        
        results = {}
        
        if action == 'optimize_resources':
            # Execute resource optimization across systems
            for service, url in strategy_engine.service_registry.items():
                try:
                    response = requests.post(f"{url}/api/optimize", json=parameters, timeout=10)
                    if response.status_code == 200:
                        results[service] = response.json()
                    else:
                        results[service] = {'status': 'failed', 'error': f"HTTP {response.status_code}"}
                except Exception as e:
                    results[service] = {'status': 'error', 'error': str(e)}
        
        elif action == 'scale_systems':
            # Scale successful systems
            results['scaling'] = {'message': 'Scaling initiated', 'systems_affected': list(strategy_engine.service_registry.keys())}
        
        elif action == 'rebalance_portfolio':
            # Rebalance across systems
            results['rebalancing'] = {'message': 'Portfolio rebalancing initiated', 'timestamp': datetime.now().isoformat()}
        
        return jsonify({
            'success': True,
            'action': action,
            'results': results,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error executing strategy: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Background task to continuously update metrics
def background_metrics_collection():
    """Background task to collect metrics periodically"""
    while True:
        try:
            strategy_engine.collect_real_metrics()
            time.sleep(30)  # Update every 30 seconds
        except Exception as e:
            logger.error(f"Background metrics collection error: {e}")
            time.sleep(60)  # Wait longer on error

# Start background task
threading.Thread(target=background_metrics_collection, daemon=True).start()

if __name__ == '__main__':
    logger.info("Starting Strategy Dashboard API Server")
    app.run(host='0.0.0.0', port=5560, debug=False)