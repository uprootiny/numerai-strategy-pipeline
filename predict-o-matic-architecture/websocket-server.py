#!/usr/bin/env python3
"""
WebSocket server for Predict-O-Matic live architecture visualization
Provides real-time signal flow data and component state updates
"""

import asyncio
import json
import random
import time
import websockets
from datetime import datetime

class PredictOMaticSimulator:
    def __init__(self):
        self.components = {
            'market-feeds': {'active': True, 'throughput': 0, 'health': 1.0},
            'sentiment': {'active': True, 'throughput': 0, 'health': 1.0},
            'numerai-data': {'active': True, 'throughput': 0, 'health': 1.0},
            'rust-engine': {'active': True, 'throughput': 0, 'health': 1.0},
            'haskell-math': {'active': True, 'throughput': 0, 'health': 1.0},
            'ensemble': {'active': True, 'throughput': 0, 'health': 1.0},
            'bayesian': {'active': True, 'throughput': 0, 'health': 1.0},
            'tournament': {'active': True, 'throughput': 0, 'health': 1.0},
            'token-launch': {'active': True, 'throughput': 0, 'health': 1.0},
            'performance': {'active': True, 'throughput': 0, 'health': 1.0}
        }
        
        self.signal_flows = []
        self.portfolio_value = 4.65
        self.attention_budget = 3200
        self.prediction_accuracy = 0.873
        
    def update_components(self):
        """Update component states and throughput"""
        for name, component in self.components.items():
            if component['active']:
                # Simulate throughput
                component['throughput'] = random.randint(50, 200)
                # Simulate health
                component['health'] = min(1.0, component['health'] + random.uniform(-0.05, 0.05))
            else:
                component['throughput'] = 0
                component['health'] = max(0.3, component['health'] - 0.01)
    
    def generate_signal_flow(self):
        """Generate signal flow data"""
        flows = []
        
        # Layer 1 -> Layer 2
        if self.components['market-feeds']['active']:
            flows.append({
                'from': 'market-feeds',
                'to': 'rust-engine',
                'strength': random.uniform(0.7, 1.0),
                'data': f"{random.randint(100, 500)} signals/sec"
            })
        
        # Layer 2 -> Layer 3
        if self.components['rust-engine']['active']:
            flows.append({
                'from': 'rust-engine',
                'to': 'ensemble',
                'strength': random.uniform(0.6, 0.9),
                'data': f"{random.randint(50, 200)} features/sec"
            })
        
        # Layer 3 -> Layer 4
        if self.components['ensemble']['active']:
            flows.append({
                'from': 'ensemble',
                'to': 'tournament',
                'strength': random.uniform(0.8, 1.0),
                'data': f"{random.uniform(0.8, 0.95):.3f} confidence"
            })
        
        # Layer 4 -> Layer 5
        if self.components['tournament']['active']:
            flows.append({
                'from': 'tournament',
                'to': 'performance',
                'strength': random.uniform(0.7, 0.95),
                'data': f"{random.randint(1, 10)} submissions"
            })
        
        return flows
    
    def get_market_data(self):
        """Generate market data"""
        return {
            'BTC': 65000 + random.randint(-2000, 2000),
            'ETH': 3200 + random.randint(-200, 200),
            'SPY': 445 + random.uniform(-5, 5),
            'VIX': 15 + random.uniform(-2, 2),
            'DXY': 105 + random.uniform(-1, 1)
        }
    
    def get_ensemble_metrics(self):
        """Get ensemble model metrics"""
        return {
            'XGBoost': 0.85 + random.uniform(0, 0.1),
            'LSTM': 0.83 + random.uniform(0, 0.1),
            'RandomForest': 0.82 + random.uniform(0, 0.1),
            'NeuralNet': 0.84 + random.uniform(0, 0.1),
            'Linear': 0.78 + random.uniform(0, 0.1)
        }
    
    def get_token_metrics(self):
        """Get token metrics"""
        return {
            'price': 0.0234 + random.uniform(-0.002, 0.002),
            'liquidity': 1200000 + random.randint(-50000, 50000),
            'volume_24h': 450000 + random.randint(-20000, 20000),
            'holders': 1234 + random.randint(-10, 50),
            'mint_rate': random.randint(100, 2000),
            'burn_rate': random.randint(10, 200)
        }
    
    def update_portfolio(self):
        """Update portfolio value based on component performance"""
        active_count = sum(1 for c in self.components.values() if c['active'])
        health_avg = sum(c['health'] for c in self.components.values()) / len(self.components)
        
        # Portfolio value influenced by active components and health
        self.portfolio_value = 4.0 + (active_count * 0.1) + (health_avg * 0.5) + random.uniform(-0.1, 0.1)
        
        # Prediction accuracy influenced by ensemble health
        if self.components['ensemble']['active']:
            self.prediction_accuracy = 0.85 + (self.components['ensemble']['health'] * 0.1) + random.uniform(-0.02, 0.02)
        else:
            self.prediction_accuracy = 0.70 + random.uniform(-0.05, 0.05)
    
    def get_state(self):
        """Get complete system state"""
        self.update_components()
        self.update_portfolio()
        
        return {
            'timestamp': datetime.now().isoformat(),
            'components': self.components,
            'signal_flows': self.generate_signal_flow(),
            'metrics': {
                'portfolio_value': round(self.portfolio_value, 2),
                'prediction_accuracy': round(self.prediction_accuracy, 3),
                'attention_budget': self.attention_budget,
                'signal_strength': round(random.uniform(0.6, 0.9), 2),
                'vision_alignment': 0.473  # Current alignment from gap analysis
            },
            'market_data': self.get_market_data(),
            'ensemble_metrics': self.get_ensemble_metrics(),
            'token_metrics': self.get_token_metrics()
        }

simulator = PredictOMaticSimulator()
connected_clients = set()

async def handle_client(websocket, path):
    """Handle WebSocket client connections"""
    connected_clients.add(websocket)
    print(f"Client connected. Total clients: {len(connected_clients)}")
    
    try:
        # Send initial state
        await websocket.send(json.dumps({
            'type': 'initial',
            'data': simulator.get_state()
        }))
        
        # Handle incoming messages
        async for message in websocket:
            data = json.loads(message)
            
            if data['type'] == 'toggle_component':
                component = data['component']
                if component in simulator.components:
                    simulator.components[component]['active'] = not simulator.components[component]['active']
                    
                    # Broadcast component state change
                    await broadcast({
                        'type': 'component_update',
                        'component': component,
                        'state': simulator.components[component]
                    })
            
            elif data['type'] == 'update_attention':
                simulator.attention_budget = data['value']
                
            elif data['type'] == 'request_state':
                await websocket.send(json.dumps({
                    'type': 'state_update',
                    'data': simulator.get_state()
                }))
    
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        connected_clients.remove(websocket)
        print(f"Client disconnected. Total clients: {len(connected_clients)}")

async def broadcast(message):
    """Broadcast message to all connected clients"""
    if connected_clients:
        await asyncio.gather(
            *[client.send(json.dumps(message)) for client in connected_clients]
        )

async def periodic_updates():
    """Send periodic updates to all clients"""
    while True:
        await asyncio.sleep(2)  # Update every 2 seconds
        
        if connected_clients:
            state = simulator.get_state()
            await broadcast({
                'type': 'state_update',
                'data': state
            })

async def main():
    print("🚀 Predict-O-Matic WebSocket Server")
    print("📡 Starting on ws://localhost:8767")
    print("🔄 Broadcasting live signal flow data...")
    
    # Start periodic updates
    asyncio.create_task(periodic_updates())
    
    # Start WebSocket server
    async with websockets.serve(handle_client, "0.0.0.0", 8767):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())