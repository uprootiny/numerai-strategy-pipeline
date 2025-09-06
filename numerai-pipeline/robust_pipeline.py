#!/usr/bin/env python3
"""
Robust Numerai Pipeline - Defensive, Thrifty, and Resilient
Incorporates feedback and prepares for uncertain futures
"""

import os
import sys
import json
import logging
import traceback
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, Union, List
import threading
import time
import signal
import psutil
from dataclasses import dataclass


@dataclass
class PipelineMetrics:
    """Defensive metrics tracking"""
    start_time: float
    memory_usage_mb: float
    cpu_usage_percent: float
    errors_count: int
    warnings_count: int
    operations_count: int


class DefensivePipeline:
    """Robust, defensive numerai pipeline with comprehensive error handling"""
    
    def __init__(self, config_path: Optional[str] = None):
        self.config = self._load_config(config_path)
        self.logger = self._setup_logging()
        self.metrics = PipelineMetrics(
            start_time=time.time(),
            memory_usage_mb=0.0,
            cpu_usage_percent=0.0,
            errors_count=0,
            warnings_count=0,
            operations_count=0
        )
        self.shutdown_flag = threading.Event()
        self._setup_signal_handlers()
        
    def _load_config(self, config_path: Optional[str]) -> Dict[str, Any]:
        """Defensively load configuration with fallbacks"""
        default_config = {
            "max_memory_mb": 1024,
            "max_runtime_minutes": 60,
            "retry_attempts": 3,
            "timeout_seconds": 30,
            "backup_enabled": True,
            "graceful_shutdown_timeout": 10,
            "health_check_interval": 60,
            "log_level": "INFO"
        }
        
        if not config_path:
            self.logger.info("Using default configuration") if hasattr(self, 'logger') else None
            return default_config
            
        try:
            with open(config_path, 'r') as f:
                user_config = json.load(f)
                # Merge with defaults, user config takes precedence
                config = {**default_config, **user_config}
                return config
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"⚠️ Config load failed: {e}. Using defaults.")
            return default_config
    
    def _setup_logging(self) -> logging.Logger:
        """Setup defensive logging with rotation and fallbacks"""
        logger = logging.getLogger("RobustPipeline")
        logger.setLevel(getattr(logging, self.config.get("log_level", "INFO")))
        
        # Create logs directory defensively
        log_dir = Path("logs")
        try:
            log_dir.mkdir(exist_ok=True)
            log_file = log_dir / f"pipeline_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
        except (OSError, PermissionError):
            # Fallback to temp directory
            log_file = Path(f"/tmp/pipeline_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")
        
        # File handler with rotation
        try:
            from logging.handlers import RotatingFileHandler
            file_handler = RotatingFileHandler(
                log_file, maxBytes=10*1024*1024, backupCount=5
            )
            file_handler.setLevel(logging.DEBUG)
        except Exception:
            # Fallback to basic file handler
            file_handler = logging.FileHandler(log_file)
        
        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
        
        return logger
    
    def _setup_signal_handlers(self):
        """Setup graceful shutdown handling"""
        def signal_handler(signum, frame):
            self.logger.info(f"Received signal {signum}, initiating graceful shutdown...")
            self.shutdown_flag.set()
        
        signal.signal(signal.SIGTERM, signal_handler)
        signal.signal(signal.SIGINT, signal_handler)
    
    def _update_metrics(self):
        """Update system metrics defensively"""
        try:
            process = psutil.Process()
            self.metrics.memory_usage_mb = process.memory_info().rss / 1024 / 1024
            self.metrics.cpu_usage_percent = process.cpu_percent()
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            # Fallback metrics
            self.metrics.memory_usage_mb = 0.0
            self.metrics.cpu_usage_percent = 0.0
    
    def _check_resource_limits(self) -> bool:
        """Defensive resource limit checking"""
        self._update_metrics()
        
        # Memory check
        if self.metrics.memory_usage_mb > self.config["max_memory_mb"]:
            self.logger.warning(
                f"Memory usage {self.metrics.memory_usage_mb:.1f}MB exceeds limit "
                f"{self.config['max_memory_mb']}MB"
            )
            return False
        
        # Runtime check
        runtime_minutes = (time.time() - self.metrics.start_time) / 60
        if runtime_minutes > self.config["max_runtime_minutes"]:
            self.logger.warning(
                f"Runtime {runtime_minutes:.1f}min exceeds limit "
                f"{self.config['max_runtime_minutes']}min"
            )
            return False
        
        return True
    
    def _retry_operation(self, operation, *args, **kwargs):
        """Defensive retry mechanism with exponential backoff"""
        attempts = 0
        while attempts < self.config["retry_attempts"]:
            try:
                return operation(*args, **kwargs)
            except Exception as e:
                attempts += 1
                self.metrics.errors_count += 1
                
                if attempts >= self.config["retry_attempts"]:
                    self.logger.error(f"Operation failed after {attempts} attempts: {e}")
                    raise
                
                wait_time = min(2 ** attempts, 30)  # Exponential backoff, max 30s
                self.logger.warning(f"Attempt {attempts} failed: {e}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
    
    def _safe_import_modules(self) -> Dict[str, Any]:
        """Defensively import pipeline modules"""
        modules = {}
        
        try:
            from analytics.analyze_uprootiny import UprootinyAnalytics
            modules['analytics'] = UprootinyAnalytics
            self.logger.info("✓ Analytics module loaded")
        except ImportError as e:
            self.logger.error(f"Failed to load analytics module: {e}")
            modules['analytics'] = None
        
        try:
            from indexing.index_engine import IndexEngine, IndexType
            modules['indexing'] = {'engine': IndexEngine, 'types': IndexType}
            self.logger.info("✓ Indexing module loaded")
        except ImportError as e:
            self.logger.error(f"Failed to load indexing module: {e}")
            modules['indexing'] = None
        
        try:
            import model_uprootiny
            modules['model'] = model_uprootiny
            self.logger.info("✓ Model module loaded")
        except ImportError as e:
            self.logger.warning(f"Model module not available: {e}")
            modules['model'] = None
        
        return modules
    
    def _create_backup(self, data: Any, backup_name: str) -> bool:
        """Create defensive backups"""
        if not self.config["backup_enabled"]:
            return True
            
        try:
            backup_dir = Path("backups")
            backup_dir.mkdir(exist_ok=True)
            
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_file = backup_dir / f"{backup_name}_{timestamp}.json"
            
            with open(backup_file, 'w') as f:
                if isinstance(data, dict):
                    json.dump(data, f, indent=2, default=str)
                else:
                    json.dump({"backup": str(data)}, f, indent=2)
            
            self.logger.info(f"✓ Backup created: {backup_file}")
            return True
            
        except Exception as e:
            self.logger.warning(f"Backup creation failed: {e}")
            return False
    
    def run_analytics(self) -> Optional[Dict[str, Any]]:
        """Run analytics with defensive error handling"""
        if self.shutdown_flag.is_set():
            return None
            
        self.logger.info("🔍 Starting analytics pipeline...")
        
        try:
            modules = self._safe_import_modules()
            if not modules.get('analytics'):
                self.logger.error("Analytics module not available")
                return None
            
            def analytics_operation():
                analytics = modules['analytics']()
                result = analytics.analyze_submissions()
                self.metrics.operations_count += 1
                return result
            
            result = self._retry_operation(analytics_operation)
            
            # Create backup
            if result:
                self._create_backup(result, "analytics_result")
                
            self.logger.info("✓ Analytics completed successfully")
            return result
            
        except Exception as e:
            self.logger.error(f"Analytics pipeline failed: {e}")
            self.logger.debug(traceback.format_exc())
            return None
    
    def run_indexing_demo(self) -> Optional[Dict[str, Any]]:
        """Run indexing demo with defensive patterns"""
        if self.shutdown_flag.is_set():
            return None
            
        self.logger.info("🗂️ Starting indexing demonstration...")
        
        try:
            modules = self._safe_import_modules()
            if not modules.get('indexing'):
                self.logger.error("Indexing module not available")
                return None
            
            def indexing_operation():
                import pandas as pd
                import numpy as np
                
                # Create sample data
                data = pd.DataFrame({
                    'id': range(100),
                    'category': np.random.choice(['A', 'B', 'C'], 100),
                    'value': np.random.uniform(0, 100, 100)
                })
                
                engine = modules['indexing']['engine'](friendly_mode=True)
                IndexType = modules['indexing']['types']
                
                # Create indexes
                engine.create_index('demo_hash', IndexType.HASH, data, column='id')
                engine.create_index('demo_bitmap', IndexType.BITMAP, data, column='category')
                
                # Get status
                status = engine.status()
                self.metrics.operations_count += 1
                return status
            
            result = self._retry_operation(indexing_operation)
            
            if result:
                self._create_backup(result, "indexing_status")
                
            self.logger.info("✓ Indexing demo completed successfully")
            return result
            
        except Exception as e:
            self.logger.error(f"Indexing demo failed: {e}")
            self.logger.debug(traceback.format_exc())
            return None
    
    def health_check(self) -> Dict[str, Any]:
        """Comprehensive health check"""
        health = {
            "timestamp": datetime.now().isoformat(),
            "status": "healthy",
            "metrics": {
                "uptime_seconds": time.time() - self.metrics.start_time,
                "memory_mb": self.metrics.memory_usage_mb,
                "cpu_percent": self.metrics.cpu_usage_percent,
                "errors_count": self.metrics.errors_count,
                "warnings_count": self.metrics.warnings_count,
                "operations_count": self.metrics.operations_count
            },
            "resource_limits": {
                "within_memory_limit": self.metrics.memory_usage_mb <= self.config["max_memory_mb"],
                "within_runtime_limit": (time.time() - self.metrics.start_time) / 60 <= self.config["max_runtime_minutes"]
            }
        }
        
        # Determine overall health
        if not all(health["resource_limits"].values()):
            health["status"] = "warning"
        
        if self.metrics.errors_count > 0:
            health["status"] = "degraded" if health["status"] == "healthy" else "critical"
        
        return health
    
    def run_ml_predictions(self) -> Optional[Dict[str, Any]]:
        """
        UNIFIED ML PREDICTION INTERFACE
        Integrates actual ML models with existing validated infrastructure
        """
        self.logger.info("🤖 Starting ML prediction pipeline...")
        
        try:
            # Import here to avoid initialization overhead if not needed
            from model_uprootiny import UprootinyModel
            
            def ml_prediction_operation():
                self.logger.info("🔥 Initializing ML models...")
                model = UprootinyModel()
                
                # Try to load existing trained model
                model_loaded = model.load_model()
                if not model_loaded:
                    self.logger.info("📊 No pre-trained model found, training new model...")
                    # Generate demo training data for cold start
                    training_data = model._generate_demo_training_data(200)
                    model.train_models(training_data)
                    model.save_model()  # Save for next time
                    self.logger.info("💾 New model trained and saved")
                else:
                    self.logger.info("✅ Pre-trained model loaded successfully")
                
                # Generate test data and predictions
                test_data = model._generate_demo_training_data(100)
                self.logger.info("🎯 Generating predictions...")
                predictions = model.generate_predictions(test_data)
                
                # Create prediction analysis
                analysis = {
                    "model_type": "uprootiny_ensemble",
                    "prediction_count": len(predictions),
                    "prediction_stats": {
                        "min": float(predictions.min()),
                        "max": float(predictions.max()),
                        "mean": float(predictions.mean()),
                        "std": float(predictions.std())
                    },
                    "ensemble_info": {
                        "models": list(model.models.keys()) if model.is_trained else [],
                        "weights": {k: float(v) for k, v in model.ensemble_weights.items()} if hasattr(model, 'ensemble_weights') else {},
                        "feature_count": len(model.feature_columns) if model.feature_columns else 0
                    },
                    "polyglot_features": model.use_polyglot,
                    "model_trained": model.is_trained,
                    "timestamp": datetime.now().isoformat()
                }
                
                self.metrics.operations_count += 1
                return analysis
            
            result = self._retry_operation(ml_prediction_operation)
            
            if result:
                self._create_backup(result, "ml_predictions")
                
            self.logger.info("✅ ML predictions completed successfully")
            return result
            
        except Exception as e:
            self.logger.error(f"ML predictions failed: {e}")
            self.logger.debug(traceback.format_exc())
            return None
    
    def run_full_pipeline(self) -> Dict[str, Any]:
        """Run the complete pipeline defensively"""
        self.logger.info("🚀 Starting full defensive pipeline...")
        
        results = {
            "start_time": datetime.now().isoformat(),
            "pipeline_version": "1.0.0-robust",
            "results": {},
            "health": {},
            "status": "running"
        }
        
        try:
            # Check initial resource state
            if not self._check_resource_limits():
                results["status"] = "aborted"
                results["reason"] = "Resource limits exceeded at start"
                return results
            
            # Run analytics
            if not self.shutdown_flag.is_set():
                analytics_result = self.run_analytics()
                results["results"]["analytics"] = analytics_result
            
            # Run indexing demo
            if not self.shutdown_flag.is_set():
                indexing_result = self.run_indexing_demo()
                results["results"]["indexing"] = indexing_result
            
            # Run ML predictions (UNIFIED PREDICTION INTERFACE)
            if not self.shutdown_flag.is_set():
                ml_result = self.run_ml_predictions()
                results["results"]["ml_predictions"] = ml_result
            
            # Final health check
            results["health"] = self.health_check()
            
            if self.shutdown_flag.is_set():
                results["status"] = "shutdown"
            elif self.metrics.errors_count == 0:
                results["status"] = "completed"
            else:
                results["status"] = "completed_with_errors"
            
            self.logger.info(f"✅ Pipeline completed with status: {results['status']}")
            
        except Exception as e:
            self.logger.error(f"Pipeline failed with critical error: {e}")
            results["status"] = "failed"
            results["error"] = str(e)
            results["traceback"] = traceback.format_exc()
        
        finally:
            results["end_time"] = datetime.now().isoformat()
            results["total_runtime_seconds"] = time.time() - self.metrics.start_time
            
            # Create final backup
            self._create_backup(results, "pipeline_results")
        
        return results
    
    def shutdown(self, timeout: Optional[int] = None):
        """Graceful shutdown"""
        timeout = timeout or self.config["graceful_shutdown_timeout"]
        self.logger.info(f"Initiating graceful shutdown (timeout: {timeout}s)...")
        
        self.shutdown_flag.set()
        
        # Wait for graceful shutdown
        start_time = time.time()
        while (time.time() - start_time) < timeout:
            if self.shutdown_flag.is_set():
                self.logger.info("✓ Graceful shutdown completed")
                return
            time.sleep(0.1)
        
        self.logger.warning("Graceful shutdown timeout exceeded")


def main():
    """Main entry point for robust pipeline"""
    pipeline = None
    
    try:
        # Load configuration from environment or file
        config_path = os.environ.get("PIPELINE_CONFIG", "pipeline_config.json")
        if not Path(config_path).exists():
            config_path = None
        
        pipeline = DefensivePipeline(config_path)
        
        # Run the pipeline
        results = pipeline.run_full_pipeline()
        
        # Output results
        print("\n" + "="*60)
        print("ROBUST PIPELINE RESULTS")
        print("="*60)
        print(f"Status: {results['status']}")
        print(f"Runtime: {results.get('total_runtime_seconds', 0):.2f}s")
        
        health = results.get('health', {})
        print(f"Health: {health.get('status', 'unknown')}")
        
        metrics = health.get('metrics', {})
        print(f"Operations: {metrics.get('operations_count', 0)}")
        print(f"Errors: {metrics.get('errors_count', 0)}")
        print(f"Memory: {metrics.get('memory_mb', 0):.1f} MB")
        
        # Return appropriate exit code
        if results['status'] in ['completed', 'completed_with_errors']:
            return 0
        else:
            return 1
    
    except KeyboardInterrupt:
        print("\n🛑 Interrupted by user")
        return 130
    
    except Exception as e:
        print(f"💥 Critical pipeline failure: {e}")
        return 1
    
    finally:
        if pipeline:
            pipeline.shutdown()


if __name__ == "__main__":
    sys.exit(main())