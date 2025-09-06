#!/bin/bash
# Backup and Rollback System for Numerai Pipeline
# Defensive procedures for uncertain futures

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
log_info() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_blue() { echo -e "${BLUE}ℹ${NC} $1"; }

# Configuration
PIPELINE_DIR="/var/www/strategy.uprootiny.dev/numerai-pipeline"
BACKUP_DIR="$PIPELINE_DIR/backups"
TIMESTAMP=$(date "+%Y%m%d_%H%M%S")
MAX_BACKUPS=10

# Change to pipeline directory
cd "$PIPELINE_DIR"

backup_current_state() {
    log_info "Creating comprehensive backup..."
    
    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR/state_backups"
    
    BACKUP_NAME="full_state_$TIMESTAMP"
    BACKUP_PATH="$BACKUP_DIR/state_backups/$BACKUP_NAME"
    
    # Create backup archive
    tar -czf "$BACKUP_PATH.tar.gz" \
        --exclude='.venv' \
        --exclude='__pycache__' \
        --exclude='*.pyc' \
        --exclude='.pytest_cache' \
        --exclude='htmlcov' \
        --exclude='backups/state_backups' \
        . 2>/dev/null || log_warn "Some files could not be backed up"
    
    # Create backup metadata
    cat > "$BACKUP_PATH.json" << EOF
{
  "backup_name": "$BACKUP_NAME",
  "timestamp": "$TIMESTAMP",
  "backup_type": "full_state",
  "files_included": [
    "analytics/",
    "indexing/", 
    "tests/",
    "*.py",
    "*.toml",
    "*.sh",
    "*.json",
    "*.conf"
  ],
  "git_commit": "$(git rev-parse HEAD 2>/dev/null || echo 'not available')",
  "git_branch": "$(git branch --show-current 2>/dev/null || echo 'not available')",
  "coverage": "$(grep -o '[0-9]*\.[0-9]*%' deployment_info.json 2>/dev/null || echo 'not available')",
  "test_status": "$(jq -r '.tests_passed // "unknown"' deployment_info.json 2>/dev/null || echo 'unknown')"
}
EOF
    
    log_info "Backup created: $BACKUP_PATH.tar.gz"
    
    # Cleanup old backups
    cleanup_old_backups
    
    echo "$BACKUP_PATH"
}

cleanup_old_backups() {
    log_blue "Cleaning up old backups (keeping $MAX_BACKUPS most recent)..."
    
    if [ -d "$BACKUP_DIR/state_backups" ]; then
        # Count backup files
        BACKUP_COUNT=$(ls -1 "$BACKUP_DIR/state_backups"/*.tar.gz 2>/dev/null | wc -l || echo 0)
        
        if [ "$BACKUP_COUNT" -gt "$MAX_BACKUPS" ]; then
            # Remove oldest backups
            ls -1t "$BACKUP_DIR/state_backups"/*.tar.gz | tail -n +$((MAX_BACKUPS + 1)) | while read -r backup; do
                rm -f "$backup"
                rm -f "${backup%%.tar.gz}.json"
                log_blue "Removed old backup: $(basename "$backup")"
            done
        fi
    fi
}

list_backups() {
    log_info "Available backups:"
    echo
    
    if [ -d "$BACKUP_DIR/state_backups" ]; then
        ls -1t "$BACKUP_DIR/state_backups"/*.json 2>/dev/null | head -10 | while read -r metadata; do
            if [ -f "$metadata" ]; then
                BACKUP_NAME=$(jq -r '.backup_name' "$metadata" 2>/dev/null || echo "unknown")
                TIMESTAMP=$(jq -r '.timestamp' "$metadata" 2>/dev/null || echo "unknown")
                COVERAGE=$(jq -r '.coverage' "$metadata" 2>/dev/null || echo "unknown")
                GIT_COMMIT=$(jq -r '.git_commit[0:8]' "$metadata" 2>/dev/null || echo "unknown")
                
                echo "📦 $BACKUP_NAME"
                echo "   ⏰ Time: $TIMESTAMP"
                echo "   📊 Coverage: $COVERAGE" 
                echo "   🔗 Commit: $GIT_COMMIT"
                echo
            fi
        done
    else
        log_warn "No backups found"
    fi
}

rollback_to_backup() {
    local BACKUP_NAME="$1"
    
    if [ -z "$BACKUP_NAME" ]; then
        log_error "Backup name required for rollback"
        return 1
    fi
    
    local BACKUP_PATH="$BACKUP_DIR/state_backups/$BACKUP_NAME"
    
    if [ ! -f "$BACKUP_PATH.tar.gz" ]; then
        log_error "Backup not found: $BACKUP_PATH.tar.gz"
        return 1
    fi
    
    log_warn "Rolling back to backup: $BACKUP_NAME"
    log_warn "This will replace current state!"
    
    read -p "Are you sure? (yes/no): " -r CONFIRM
    if [ "$CONFIRM" != "yes" ]; then
        log_info "Rollback cancelled"
        return 0
    fi
    
    # Create emergency backup of current state first
    log_info "Creating emergency backup of current state..."
    EMERGENCY_BACKUP=$(backup_current_state)
    
    log_info "Extracting backup: $BACKUP_NAME"
    
    # Extract backup (excluding .venv to avoid environment issues)
    tar -xzf "$BACKUP_PATH.tar.gz" --exclude='.venv' 2>/dev/null || {
        log_error "Failed to extract backup"
        return 1
    }
    
    log_info "Rollback completed successfully"
    log_warn "Emergency backup created at: $EMERGENCY_BACKUP"
    
    # Verify rollback
    if [ -f "pyproject.toml" ]; then
        log_info "Verifying rollback..."
        if ./run_tests.sh > /dev/null 2>&1; then
            log_info "✅ Rollback verification successful"
        else
            log_warn "⚠️ Rollback verification failed - tests not passing"
        fi
    fi
}

health_check() {
    log_info "Performing health check..."
    
    local HEALTH_SCORE=0
    local MAX_SCORE=5
    
    # Check 1: Core files exist
    if [ -f "pyproject.toml" ] && [ -f "analytics/analyze_uprootiny.py" ] && [ -f "indexing/index_engine.py" ]; then
        log_info "✅ Core files present"
        ((HEALTH_SCORE++))
    else
        log_error "❌ Core files missing"
    fi
    
    # Check 2: Virtual environment
    if [ -d ".venv" ]; then
        log_info "✅ Virtual environment present"  
        ((HEALTH_SCORE++))
    else
        log_warn "⚠️ Virtual environment missing"
    fi
    
    # Check 3: Dependencies
    if uv run python -c "import analytics.analyze_uprootiny; import indexing.index_engine" 2>/dev/null; then
        log_info "✅ Dependencies functional"
        ((HEALTH_SCORE++))
    else
        log_error "❌ Dependencies not functional"
    fi
    
    # Check 4: Tests
    if ./run_tests.sh > /dev/null 2>&1; then
        log_info "✅ Tests passing"
        ((HEALTH_SCORE++))
    else
        log_error "❌ Tests failing"
    fi
    
    # Check 5: Backup system
    if [ -d "$BACKUP_DIR" ] && [ -w "$BACKUP_DIR" ]; then
        log_info "✅ Backup system ready"
        ((HEALTH_SCORE++))
    else
        log_warn "⚠️ Backup system issues"
    fi
    
    # Overall health assessment
    local HEALTH_PERCENTAGE=$((HEALTH_SCORE * 100 / MAX_SCORE))
    
    echo
    log_blue "Health Score: $HEALTH_SCORE/$MAX_SCORE ($HEALTH_PERCENTAGE%)"
    
    if [ $HEALTH_SCORE -ge 4 ]; then
        log_info "🟢 System health: GOOD"
    elif [ $HEALTH_SCORE -ge 3 ]; then
        log_warn "🟡 System health: FAIR"
    else
        log_error "🔴 System health: POOR"
    fi
    
    return $HEALTH_SCORE
}

# Main function
main() {
    local COMMAND="${1:-help}"
    
    case "$COMMAND" in
        backup)
            backup_current_state
            ;;
        list)
            list_backups
            ;;
        rollback)
            if [ $# -lt 2 ]; then
                log_error "Usage: $0 rollback <backup_name>"
                exit 1
            fi
            rollback_to_backup "$2"
            ;;
        health)
            health_check
            ;;
        cleanup) 
            cleanup_old_backups
            ;;
        help|*)
            echo "🛡️ Numerai Pipeline Backup & Rollback System"
            echo
            echo "Usage: $0 <command> [arguments]"
            echo
            echo "Commands:"
            echo "  backup           Create full state backup"
            echo "  list             List available backups"
            echo "  rollback <name>  Rollback to specified backup"
            echo "  health           Perform system health check"
            echo "  cleanup          Clean up old backups"
            echo "  help             Show this help message"
            echo
            echo "Examples:"
            echo "  $0 backup"
            echo "  $0 list"
            echo "  $0 rollback full_state_20250906_140000"
            echo "  $0 health"
            ;;
    esac
}

# Execute main function
main "$@"