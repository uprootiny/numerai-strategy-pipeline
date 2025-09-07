#!/usr/bin/env python3
"""
Claude Multi-Project Router
Intelligent routing system for Claude configurations across subprojects
"""

import json
import os
import fnmatch
import logging
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Tuple
import hashlib

class ClaudeProjectRouter:
    """Intelligent router for Claude configurations across multiple subprojects"""
    
    def __init__(self, config_path: str = ".claude/config.json"):
        self.config_path = Path(config_path)
        self.config = self._load_config()
        self.logger = self._setup_logging()
        self.session_memory = {}
        self.context_cache = {}
        self.routing_history = []
        
    def _load_config(self) -> Dict[str, Any]:
        """Load main routing configuration"""
        if not self.config_path.exists():
            raise FileNotFoundError(f"Claude router config not found: {self.config_path}")
        
        with open(self.config_path) as f:
            return json.load(f)
    
    def _setup_logging(self) -> logging.Logger:
        """Setup routing logger"""
        logger = logging.getLogger("ClaudeRouter")
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            os.makedirs(".claude/logs", exist_ok=True)
            handler = logging.FileHandler(".claude/logs/router.log")
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
            
        return logger
    
    def detect_project_context(self, file_path: str, content_hint: str = "") -> str:
        """Detect which subproject context to use based on file path and content"""
        file_path = str(Path(file_path).resolve())
        
        # Check routing rules in priority order
        best_match = None
        best_priority = -1
        
        for rule in self.config["routing_rules"]:
            if fnmatch.fnmatch(file_path, rule["pattern"]):
                if rule["priority"] > best_priority:
                    best_priority = rule["priority"]
                    best_match = rule["route_to"]
        
        if best_match:
            self.logger.info(f"Routed {file_path} to {best_match} (priority {best_priority})")
            return best_match
        
        # Check if file is within a subproject directory
        for project_name, project_config in self.config["subprojects"].items():
            project_path = Path(project_config["path"]).resolve()
            try:
                Path(file_path).relative_to(project_path)
                self.logger.info(f"Routed {file_path} to {project_name} (directory match)")
                return project_name
            except ValueError:
                continue
        
        # Content-based detection
        if content_hint:
            project = self._detect_by_content(content_hint)
            if project:
                self.logger.info(f"Routed by content to {project}")
                return project
        
        # Fallback to root
        if self.config["routing"]["fallback_to_root"]:
            self.logger.info(f"Fallback routing for {file_path}")
            return "numerai-pipeline"  # Default primary project
        
        raise ValueError(f"Could not determine project context for {file_path}")
    
    def _detect_by_content(self, content: str) -> Optional[str]:
        """Detect project by content keywords"""
        content_lower = content.lower()
        
        # Project-specific keywords
        keywords_map = {
            "numerai-pipeline": ["numerai", "tournament", "lightgbm", "xgboost", "polyglot"],
            "phoenix-live": ["phoenix", "liveview", "genserver", "elixir", "mix"],
            "numerai-haskell-tournament": ["haskell", "cabal", "ghc", "mathematical", "topology"],
            "performance-monitor-rs": ["rust", "cargo", "performance", "monitoring", "tokio"],
            "elixir-backtesting-engine": ["backtesting", "strategy", "evaluation", "elixir"],
            "pythia-tda-core": ["pythia", "trading", "analysis", "pandas", "numpy"],
            "wedding-site": ["wedding", "event", "marriage", "ceremony", "reception"]
        }
        
        for project, keywords in keywords_map.items():
            if any(keyword in content_lower for keyword in keywords):
                return project
        
        return None
    
    def load_project_config(self, project_name: str) -> Dict[str, Any]:
        """Load specific project's Claude configuration"""
        if project_name not in self.config["subprojects"]:
            raise ValueError(f"Unknown project: {project_name}")
        
        project_config = self.config["subprojects"][project_name]
        project_path = Path(project_config["path"])
        claude_config_path = project_path / project_config["claude_config"]
        
        if claude_config_path.exists():
            with open(claude_config_path) as f:
                claude_config = json.load(f)
        else:
            # Create default config for project
            claude_config = self._create_default_project_config(project_name, project_config)
            self._save_project_config(claude_config_path, claude_config)
        
        # Merge with global settings
        merged_config = {
            **self.config["global_settings"],
            **claude_config,
            "project_info": project_config
        }
        
        return merged_config
    
    def _create_default_project_config(self, project_name: str, project_config: Dict[str, Any]) -> Dict[str, Any]:
        """Create default Claude configuration for a project"""
        return {
            "project_name": project_name,
            "description": project_config["description"],
            "specialized_tools": project_config.get("specialized_tools", []),
            "context_priority": project_config.get("context_priority", "medium"),
            "memory_namespace": project_config.get("memory_namespace", project_name),
            "custom_prompts": {
                "system": f"You are working on {project_name}: {project_config['description']}",
                "context_switch": f"Switching to {project_name} context with specialized tools: {project_config.get('specialized_tools', [])}"
            },
            "file_patterns": {
                "include": ["**/*"],
                "exclude": ["node_modules/**", ".git/**", "**/.venv/**"]
            },
            "workspace_settings": {
                "auto_save": True,
                "backup_enabled": True,
                "memory_persistence": True
            }
        }
    
    def _save_project_config(self, config_path: Path, config: Dict[str, Any]):
        """Save project configuration"""
        config_path.parent.mkdir(parents=True, exist_ok=True)
        with open(config_path, 'w') as f:
            json.dump(config, f, indent=2)
        self.logger.info(f"Created default config: {config_path}")
    
    def switch_context(self, from_project: str, to_project: str, context_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Switch Claude context between projects with memory preservation"""
        self.logger.info(f"Context switch: {from_project} → {to_project}")
        
        # Save current context
        if from_project and context_data:
            self._save_context_memory(from_project, context_data)
        
        # Load target project config
        target_config = self.load_project_config(to_project)
        
        # Restore context memory
        restored_memory = self._load_context_memory(to_project)
        
        # Record routing decision
        self.routing_history.append({
            "timestamp": datetime.now().isoformat(),
            "from_project": from_project,
            "to_project": to_project,
            "context_restored": bool(restored_memory)
        })
        
        return {
            "project_config": target_config,
            "restored_memory": restored_memory,
            "context_switch_successful": True
        }
    
    def _save_context_memory(self, project_name: str, context_data: Dict[str, Any]):
        """Save context memory for a project"""
        memory_namespace = self.config["subprojects"][project_name]["memory_namespace"]
        
        memory_file = Path(f".claude/memory/{memory_namespace}.json")
        memory_file.parent.mkdir(parents=True, exist_ok=True)
        
        memory_data = {
            "timestamp": datetime.now().isoformat(),
            "project": project_name,
            "context": context_data,
            "session_id": self._generate_session_id(project_name)
        }
        
        with open(memory_file, 'w') as f:
            json.dump(memory_data, f, indent=2, default=str)
        
        self.logger.info(f"Saved context memory for {project_name}")
    
    def _load_context_memory(self, project_name: str) -> Optional[Dict[str, Any]]:
        """Load context memory for a project"""
        memory_namespace = self.config["subprojects"][project_name]["memory_namespace"]
        memory_file = Path(f".claude/memory/{memory_namespace}.json")
        
        if not memory_file.exists():
            return None
        
        try:
            with open(memory_file) as f:
                memory_data = json.load(f)
            
            # Check if memory is still valid
            timestamp = datetime.fromisoformat(memory_data["timestamp"])
            max_age = timedelta(days=self.config["global_settings"]["memory_persistence_days"])
            
            if datetime.now() - timestamp > max_age:
                self.logger.warning(f"Expired memory for {project_name}")
                return None
            
            self.logger.info(f"Loaded context memory for {project_name}")
            return memory_data["context"]
            
        except Exception as e:
            self.logger.error(f"Failed to load memory for {project_name}: {e}")
            return None
    
    def _generate_session_id(self, project_name: str) -> str:
        """Generate unique session ID"""
        data = f"{project_name}-{datetime.now().isoformat()}"
        return hashlib.md5(data.encode()).hexdigest()[:8]
    
    def get_project_status(self) -> Dict[str, Any]:
        """Get status of all configured projects"""
        status = {
            "active_projects": 0,
            "total_projects": len(self.config["subprojects"]),
            "routing_rules": len(self.config["routing_rules"]),
            "projects": {}
        }
        
        for project_name, project_config in self.config["subprojects"].items():
            project_path = Path(project_config["path"])
            memory_namespace = project_config["memory_namespace"]
            memory_file = Path(f".claude/memory/{memory_namespace}.json")
            
            project_status = {
                "active": project_config.get("active", False),
                "path_exists": project_path.exists(),
                "has_config": (project_path / project_config["claude_config"]).exists(),
                "has_memory": memory_file.exists(),
                "priority": project_config.get("context_priority", "medium"),
                "tools": project_config.get("specialized_tools", [])
            }
            
            if project_status["active"]:
                status["active_projects"] += 1
            
            status["projects"][project_name] = project_status
        
        return status
    
    def create_subproject_configs(self):
        """Create Claude configurations for all subprojects"""
        self.logger.info("Creating subproject configurations...")
        
        created_count = 0
        
        for project_name, project_config in self.config["subprojects"].items():
            if not project_config.get("active", False):
                continue
                
            project_path = Path(project_config["path"])
            claude_config_path = project_path / project_config["claude_config"]
            
            if not claude_config_path.exists():
                claude_config = self._create_default_project_config(project_name, project_config)
                self._save_project_config(claude_config_path, claude_config)
                created_count += 1
        
        self.logger.info(f"Created {created_count} subproject configurations")
        return created_count

def main():
    """Initialize and test Claude project router"""
    print("🔀 CLAUDE PROJECT ROUTER INITIALIZATION")
    print("=" * 50)
    
    try:
        router = ClaudeProjectRouter()
        
        # Create subproject configurations
        created = router.create_subproject_configs()
        print(f"📁 Created {created} project configurations")
        
        # Get system status
        status = router.get_project_status()
        print(f"\\n📊 SYSTEM STATUS:")
        print(f"🟢 Active Projects: {status['active_projects']}/{status['total_projects']}")
        print(f"🔧 Routing Rules: {status['routing_rules']}")
        
        print(f"\\n📋 PROJECT STATUS:")
        for project_name, project_status in status["projects"].items():
            active_icon = "🟢" if project_status["active"] else "⚪"
            config_icon = "✅" if project_status["has_config"] else "❌"
            path_icon = "📁" if project_status["path_exists"] else "❓"
            
            print(f"  {active_icon} {project_name}")
            print(f"    {path_icon} Path exists | {config_icon} Config ready | Priority: {project_status['priority']}")
            print(f"    🔧 Tools: {', '.join(project_status['tools'][:3])}{'...' if len(project_status['tools']) > 3 else ''}")
        
        # Test routing
        print(f"\\n🧪 TESTING ROUTING:")
        test_files = [
            "./numerai-pipeline/model_uprootiny.py",
            "../phoenix-live/lib/app.ex", 
            "../repositories/numerai-haskell-tournament/src/Model.hs",
            "../performance-monitor-rs/src/main.rs"
        ]
        
        for test_file in test_files:
            try:
                project = router.detect_project_context(test_file)
                print(f"  📄 {test_file} → {project}")
            except Exception as e:
                print(f"  ❌ {test_file} → ERROR: {e}")
        
        print(f"\\n✅ Claude Router initialized successfully!")
        print(f"💡 Use router.switch_context() to change project contexts")
        
        return router
        
    except Exception as e:
        print(f"❌ Router initialization failed: {e}")
        raise

if __name__ == "__main__":
    main()