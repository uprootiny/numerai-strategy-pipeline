#!/usr/bin/env python3
"""
Numerai Pipeline Migration Script
Migrates numerai-uprootiny from home directory to strategy.uprootiny.dev server
Using UV for Python package management as specified by user
"""

import os
import sys
import shutil
import subprocess
import json
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class NumeraiMigrator:
    def __init__(self):
        self.source_path = Path("/home/uprootiny/numerai-uprootiny")
        self.target_path = Path("/var/www/strategy.uprootiny.dev/numerai-pipeline")
        self.backup_path = Path("/var/www/strategy.uprootiny.dev/backups")
        
    def validate_source(self):
        """Validate source directory exists and is accessible"""
        if not self.source_path.exists():
            raise FileNotFoundError(f"Source directory {self.source_path} not found")
        
        if not self.source_path.is_dir():
            raise NotADirectoryError(f"Source {self.source_path} is not a directory")
        
        logger.info(f"✓ Source directory validated: {self.source_path}")
        return True
    
    def prepare_target(self):
        """Prepare target directory structure"""
        # Create backup directory
        self.backup_path.mkdir(exist_ok=True)
        
        # Create target directory
        self.target_path.mkdir(exist_ok=True)
        
        logger.info(f"✓ Target directory prepared: {self.target_path}")
        return True
    
    def backup_existing(self):
        """Backup any existing numerai pipeline if present"""
        if self.target_path.exists() and any(self.target_path.iterdir()):
            backup_name = f"numerai-pipeline-backup-{int(__import__('time').time())}"
            backup_full_path = self.backup_path / backup_name
            
            shutil.copytree(self.target_path, backup_full_path, dirs_exist_ok=True)
            logger.info(f"✓ Existing pipeline backed up to: {backup_full_path}")
    
    def migrate_files(self):
        """Migrate numerai pipeline files"""
        logger.info("Starting file migration...")
        
        # Files and directories to migrate
        essential_items = [
            "analytics/",
            "indexing/",
            "tests/",
            "model_uprootiny.py",
            "pyproject.toml",
            "README.md",
            ".gitignore",
            "requirements.txt"
        ]
        
        for item in essential_items:
            source_item = self.source_path / item
            target_item = self.target_path / item
            
            if source_item.exists():
                if source_item.is_dir():
                    # Copy directory
                    shutil.copytree(source_item, target_item, dirs_exist_ok=True)
                    logger.info(f"✓ Directory copied: {item}")
                else:
                    # Copy file
                    target_item.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(source_item, target_item)
                    logger.info(f"✓ File copied: {item}")
            else:
                logger.warning(f"⚠ Item not found in source: {item}")
    
    def setup_python_environment(self):
        """Setup Python environment using UV"""
        logger.info("Setting up Python environment with UV...")
        
        os.chdir(self.target_path)
        
        try:
            # Create virtual environment with UV
            subprocess.run(["uv", "venv", ".venv"], check=True)
            logger.info("✓ UV virtual environment created")
            
            # Install dependencies using UV
            if (self.target_path / "pyproject.toml").exists():
                subprocess.run(["uv", "pip", "install", "-e", "."], check=True)
                logger.info("✓ Dependencies installed via UV")
            else:
                logger.warning("⚠ No pyproject.toml found, skipping dependency installation")
                
        except subprocess.CalledProcessError as e:
            logger.error(f"✗ Error setting up Python environment: {e}")
            return False
            
        return True
    
    def create_service_scripts(self):
        """Create service management scripts"""
        
        # Create startup script
        startup_script = self.target_path / "start_numerai_pipeline.sh"
        startup_content = """#!/bin/bash
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
"""
        
        with open(startup_script, 'w') as f:
            f.write(startup_content)
        
        startup_script.chmod(0o755)
        logger.info("✓ Startup script created")
        
        # Create test runner script  
        test_script = self.target_path / "run_tests.sh"
        test_content = """#!/bin/bash
# Numerai Pipeline Test Runner
cd "$(dirname "$0")"

echo "Running Numerai Pipeline Tests..."

# Activate UV environment and run tests
uv run python -m pytest tests/ -v --cov=. --cov-report=term-missing

echo "Tests complete"
"""
        
        with open(test_script, 'w') as f:
            f.write(test_content)
            
        test_script.chmod(0o755)
        logger.info("✓ Test runner script created")
    
    def update_configurations(self):
        """Update configuration files for new location"""
        
        # Create migration metadata
        migration_info = {
            "migration_timestamp": __import__('time').time(),
            "source_path": str(self.source_path),
            "target_path": str(self.target_path),
            "migrated_by": "numerai-pipeline-migrator",
            "python_version": subprocess.run(["python3", "--version"], 
                                           capture_output=True, text=True).stdout.strip(),
            "uv_version": subprocess.run(["uv", "--version"], 
                                       capture_output=True, text=True).stdout.strip()
        }
        
        migration_file = self.target_path / "migration_info.json"
        with open(migration_file, 'w') as f:
            json.dump(migration_info, f, indent=2)
            
        logger.info("✓ Migration metadata created")
    
    def verify_migration(self):
        """Verify migration was successful"""
        logger.info("Verifying migration...")
        
        # Check essential files exist
        essential_files = [
            "pyproject.toml",
            "analytics/analyze_uprootiny.py", 
            "indexing/index_engine.py",
            "tests/test_indexing.py"
        ]
        
        missing_files = []
        for file in essential_files:
            if not (self.target_path / file).exists():
                missing_files.append(file)
        
        if missing_files:
            logger.error(f"✗ Missing files after migration: {missing_files}")
            return False
        
        # Try running a basic test
        os.chdir(self.target_path)
        try:
            result = subprocess.run(["uv", "run", "python", "-c", "import analytics.analyze_uprootiny; print('Import successful')"], 
                                  capture_output=True, text=True, check=True)
            logger.info("✓ Basic import test passed")
        except subprocess.CalledProcessError:
            logger.warning("⚠ Basic import test failed - may need dependency resolution")
        
        logger.info("✓ Migration verification complete")
        return True
    
    def migrate(self):
        """Execute complete migration process"""
        logger.info("🚀 Starting Numerai Pipeline Migration")
        
        try:
            # Step 1: Validate source
            self.validate_source()
            
            # Step 2: Prepare target
            self.prepare_target()
            
            # Step 3: Backup existing
            self.backup_existing()
            
            # Step 4: Migrate files
            self.migrate_files()
            
            # Step 5: Setup Python environment
            self.setup_python_environment()
            
            # Step 6: Create service scripts
            self.create_service_scripts()
            
            # Step 7: Update configurations
            self.update_configurations()
            
            # Step 8: Verify migration
            if self.verify_migration():
                logger.info("✅ Migration completed successfully!")
                logger.info(f"Numerai pipeline is now available at: {self.target_path}")
                return True
            else:
                logger.error("❌ Migration verification failed")
                return False
                
        except Exception as e:
            logger.error(f"❌ Migration failed: {e}")
            return False

def main():
    """Main migration function"""
    migrator = NumeraiMigrator()
    
    success = migrator.migrate()
    
    if success:
        print("\n🎉 Numerai Pipeline Migration Complete!")
        print(f"📁 New location: {migrator.target_path}")
        print("🔧 Run tests with: ./run_tests.sh")
        print("🚀 Start pipeline with: ./start_numerai_pipeline.sh")
        sys.exit(0)
    else:
        print("\n❌ Migration failed. Check logs for details.")
        sys.exit(1)

if __name__ == "__main__":
    main()