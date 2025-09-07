#!/bin/bash
# Claude Multi-Project Router - Shell Implementation
# Efficient routing without unnecessary Python overhead

set -euo pipefail

# Configuration
CLAUDE_CONFIG_DIR=".claude"
SESSION_MEMORY_DIR="$CLAUDE_CONFIG_DIR/sessions"
ROUTING_LOG="$CLAUDE_CONFIG_DIR/routing.log"

# Create directories
mkdir -p "$SESSION_MEMORY_DIR"

# Project definitions
declare -A PROJECTS=(
    ["numerai"]="/var/www/strategy.uprootiny.dev/numerai-pipeline"
    ["phoenix"]="/var/www/phoenix-live"
    ["haskell"]="/var/www/repositories/numerai-haskell-tournament"
    ["rust"]="/var/www/performance-monitor-rs"
    ["backtesting"]="/var/www/elixir-backtesting-engine.uprootiny.dev"
    ["substance"]="/var/www/substance"
    ["docs"]="/var/www/enhanced-docs-browser"
    ["pythia"]="/tmp/pythia-demo"
    ["wedding"]="/var/www/eliot-wedding.hyperstitious.art"
)

declare -A PROJECT_TOOLS=(
    ["numerai"]="python,uv,pytest,jupyter,ml"
    ["phoenix"]="elixir,mix,liveview,ecto"
    ["haskell"]="ghc,cabal,stack,hlint"
    ["rust"]="cargo,rustc,clippy,rustfmt"
    ["backtesting"]="elixir,mix,genserver"
    ["substance"]="utilities,bash,scripts"
    ["docs"]="markdown,search,git"
    ["pythia"]="python,pandas,numpy,analysis"
    ["wedding"]="html,css,js,frontend"
)

declare -A PROJECT_PRIORITY=(
    ["numerai"]="high"
    ["phoenix"]="medium"
    ["haskell"]="medium"
    ["rust"]="medium" 
    ["backtesting"]="medium"
    ["substance"]="low"
    ["docs"]="low"
    ["pythia"]="high"
    ["wedding"]="low"
)

log_routing() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$ROUTING_LOG"
}

detect_project() {
    local file_path="$1"
    local content_hint="${2:-}"
    
    # Direct path matching
    for project in "${!PROJECTS[@]}"; do
        if [[ "$file_path" == "${PROJECTS[$project]}"* ]]; then
            echo "$project"
            log_routing "ROUTE: $file_path -> $project (path_match)"
            return 0
        fi
    done
    
    # File extension patterns
    case "$file_path" in
        *.py)
            if [[ "$file_path" == *numerai* ]] || [[ "$content_hint" == *numerai* ]]; then
                echo "numerai"
                log_routing "ROUTE: $file_path -> numerai (python+numerai)"
            elif [[ "$file_path" == *pythia* ]] || [[ "$content_hint" == *pythia* ]]; then
                echo "pythia" 
                log_routing "ROUTE: $file_path -> pythia (python+pythia)"
            else
                echo "numerai"  # Default Python project
                log_routing "ROUTE: $file_path -> numerai (python_default)"
            fi
            ;;
        *.ex|*.exs)
            if [[ "$file_path" == *backtesting* ]] || [[ "$content_hint" == *backtesting* ]]; then
                echo "backtesting"
                log_routing "ROUTE: $file_path -> backtesting (elixir+backtesting)"
            else
                echo "phoenix"
                log_routing "ROUTE: $file_path -> phoenix (elixir_default)"
            fi
            ;;
        *.hs)
            echo "haskell"
            log_routing "ROUTE: $file_path -> haskell (haskell_file)"
            ;;
        *.rs)
            echo "rust"
            log_routing "ROUTE: $file_path -> rust (rust_file)"
            ;;
        *.html|*.css|*.js)
            if [[ "$file_path" == *wedding* ]]; then
                echo "wedding"
                log_routing "ROUTE: $file_path -> wedding (frontend+wedding)"
            else
                echo "docs"
                log_routing "ROUTE: $file_path -> docs (frontend_default)"
            fi
            ;;
        *.md)
            echo "docs"
            log_routing "ROUTE: $file_path -> docs (markdown)"
            ;;
        *)
            # Content-based detection
            if [[ -n "$content_hint" ]]; then
                case "$content_hint" in
                    *numerai*|*tournament*|*lightgbm*|*xgboost*)
                        echo "numerai"
                        log_routing "ROUTE: $file_path -> numerai (content_numerai)"
                        ;;
                    *phoenix*|*liveview*|*genserver*)
                        echo "phoenix"
                        log_routing "ROUTE: $file_path -> phoenix (content_phoenix)"
                        ;;
                    *haskell*|*cabal*|*ghc*)
                        echo "haskell"
                        log_routing "ROUTE: $file_path -> haskell (content_haskell)"
                        ;;
                    *rust*|*cargo*|*tokio*)
                        echo "rust"
                        log_routing "ROUTE: $file_path -> rust (content_rust)"
                        ;;
                    *backtesting*|*strategy*)
                        echo "backtesting"
                        log_routing "ROUTE: $file_path -> backtesting (content_backtesting)"
                        ;;
                    *pythia*|*trading*)
                        echo "pythia"
                        log_routing "ROUTE: $file_path -> pythia (content_pythia)"
                        ;;
                    *wedding*)
                        echo "wedding"
                        log_routing "ROUTE: $file_path -> wedding (content_wedding)"
                        ;;
                    *)
                        echo "numerai"  # Default fallback
                        log_routing "ROUTE: $file_path -> numerai (fallback)"
                        ;;
                esac
            else
                echo "numerai"  # Default fallback
                log_routing "ROUTE: $file_path -> numerai (no_context_fallback)"
            fi
            ;;
    esac
}

switch_context() {
    local project="$1"
    local session_file="$SESSION_MEMORY_DIR/${project}.session"
    
    if [[ -z "${PROJECTS[$project]:-}" ]]; then
        echo "❌ Unknown project: $project" >&2
        return 1
    fi
    
    # Load project context
    local project_path="${PROJECTS[$project]}"
    local tools="${PROJECT_TOOLS[$project]}"
    local priority="${PROJECT_PRIORITY[$project]}"
    
    log_routing "CONTEXT_SWITCH: -> $project (path: $project_path, priority: $priority)"
    
    # Create/update session
    cat > "$session_file" <<EOF
PROJECT=$project
PROJECT_PATH=$project_path
TOOLS=$tools
PRIORITY=$priority
TIMESTAMP=$(date -Iseconds)
CLAUDE_CONTEXT=active
EOF
    
    echo "🔀 Switched to $project context"
    echo "📁 Path: $project_path"
    echo "🔧 Tools: $tools"
    echo "⚡ Priority: $priority"
    
    # Set up environment
    cd "$project_path" 2>/dev/null || echo "⚠️ Project path not accessible: $project_path"
    
    return 0
}

get_current_context() {
    local current_session=""
    local latest_timestamp=""
    
    # Find most recent session
    for session_file in "$SESSION_MEMORY_DIR"/*.session; do
        if [[ -f "$session_file" ]]; then
            local timestamp
            timestamp=$(grep "TIMESTAMP=" "$session_file" | cut -d= -f2)
            if [[ "$timestamp" > "$latest_timestamp" ]]; then
                latest_timestamp="$timestamp"
                current_session="$session_file"
            fi
        fi
    done
    
    if [[ -n "$current_session" ]]; then
        source "$current_session"
        echo "Current context: $PROJECT (priority: $PRIORITY)"
        echo "Path: $PROJECT_PATH"
        echo "Tools: $TOOLS"
    else
        echo "No active context"
    fi
}

list_projects() {
    echo "📋 Available Projects:"
    for project in "${!PROJECTS[@]}"; do
        local path="${PROJECTS[$project]}"
        local tools="${PROJECT_TOOLS[$project]}"
        local priority="${PROJECT_PRIORITY[$project]}"
        local status="🔴"
        
        if [[ -d "$path" ]]; then
            status="🟢"
        fi
        
        echo "  $status $project"
        echo "    📁 $path"
        echo "    🔧 $tools"
        echo "    ⚡ $priority priority"
        echo
    done
}

# Main command dispatcher
case "${1:-help}" in
    detect)
        detect_project "${2:-$(pwd)}" "${3:-}"
        ;;
    switch)
        switch_context "${2:-numerai}"
        ;;
    context|current)
        get_current_context
        ;;
    list|projects)
        list_projects
        ;;
    log)
        tail -20 "$ROUTING_LOG"
        ;;
    help|*)
        cat <<EOF
🔀 Claude Multi-Project Router

Commands:
  detect <path> [content]   - Detect project for path/content
  switch <project>          - Switch to project context
  context                   - Show current context
  list                      - List all projects
  log                       - Show routing log
  help                      - Show this help

Available projects: ${!PROJECTS[*]}
EOF
        ;;
esac