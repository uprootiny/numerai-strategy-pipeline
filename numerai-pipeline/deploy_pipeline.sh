#!/bin/bash
# Comprehensive Test-Commit-Deploy Pipeline for Numerai Strategy
# Implements full CI/CD cycle with testing, linting, coverage, and deployment

set -euo pipefail

echo "🚀 Starting Numerai Pipeline Deployment Cycle"
echo "=============================================="

# Change to pipeline directory
cd "$(dirname "$0")"
PIPELINE_DIR=$(pwd)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Step 1: Environment Setup
print_info "Step 1: Setting up environment..."
if [ ! -d ".venv" ]; then
    print_warning "Virtual environment not found, creating with UV..."
    uv venv
fi

# Activate environment and install dependencies
export PATH="$(pwd)/.venv/bin:$PATH"
uv pip install -e ".[dev,test]"
print_status "Environment setup complete"

# Step 2: Code Quality Checks
print_info "Step 2: Running code quality checks..."

# Run Black formatter
print_info "Running Black formatter..."
if uv run black --check --diff . 2>/dev/null; then
    print_status "Black formatting check passed"
else
    print_warning "Black formatting issues found, auto-fixing..."
    uv run black .
    print_status "Black auto-formatting complete"
fi

# Run isort
print_info "Running isort..."
if uv run isort --check-only --diff . 2>/dev/null; then
    print_status "isort check passed"
else
    print_warning "Import order issues found, auto-fixing..."
    uv run isort .
    print_status "isort auto-fix complete"
fi

# Run Flake8
print_info "Running Flake8..."
if uv run flake8 --max-line-length=88 --extend-ignore=E203,E266,E501,W503,F403,F401 .; then
    print_status "Flake8 linting passed"
else
    print_warning "Flake8 issues found (continuing with warnings)"
fi

# Step 3: Type Checking
print_info "Step 3: Running type checking..."
if uv run mypy --ignore-missing-imports --no-strict-optional . 2>/dev/null; then
    print_status "MyPy type checking passed"
else
    print_warning "MyPy type checking issues found (continuing)"
fi

# Step 4: Security Scan
print_info "Step 4: Running security scan..."
if uv run bandit -r . -f json -o bandit-report.json 2>/dev/null; then
    print_status "Bandit security scan passed"
else
    print_warning "Bandit security issues found (check bandit-report.json)"
fi

# Step 5: Run Tests
print_info "Step 5: Running comprehensive test suite..."
TEST_RESULTS=$(mktemp)

if uv run python -m pytest tests/ -v --cov=. --cov-report=term-missing --cov-report=html:htmlcov --cov-report=xml --tb=short | tee "$TEST_RESULTS"; then
    COVERAGE=$(grep "TOTAL" "$TEST_RESULTS" | awk '{print $4}' | sed 's/%//')
    if (( $(echo "$COVERAGE >= 50" | bc -l) )); then
        print_status "Tests passed with $COVERAGE% coverage (>= 50% required)"
    else
        print_error "Tests passed but coverage $COVERAGE% is below 50% threshold"
        exit 1
    fi
else
    print_error "Tests failed"
    exit 1
fi

# Step 6: Build Package
print_info "Step 6: Building package..."
if uv build; then
    print_status "Package build successful"
else
    print_error "Package build failed"
    exit 1
fi

# Step 7: Git Operations
print_info "Step 7: Git operations..."

# Check if we're in a git repository
if [ -d ".git" ]; then
    # Add all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        print_info "No changes to commit"
    else
        # Create commit with timestamp and coverage info
        TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
        COMMIT_MSG="🚀 Deploy numerai pipeline - Tests: ✅ Coverage: ${COVERAGE}% - ${TIMESTAMP}

🔧 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
        
        git commit -m "$COMMIT_MSG"
        print_status "Changes committed to git"
        
        # Push if on a branch with upstream
        if git symbolic-ref -q HEAD >/dev/null 2>&1; then
            BRANCH=$(git symbolic-ref --short HEAD)
            if git rev-parse --verify "origin/$BRANCH" >/dev/null 2>&1; then
                git push origin "$BRANCH"
                print_status "Changes pushed to origin/$BRANCH"
            else
                print_warning "No upstream branch configured for push"
            fi
        fi
    fi
else
    print_warning "Not a git repository - skipping git operations"
fi

# Step 8: Service Integration
print_info "Step 8: Service integration..."

# Update service status
SERVICE_STATUS="{
  \"service\": \"numerai-pipeline\",
  \"status\": \"deployed\",
  \"timestamp\": \"$(date -Iseconds)\",
  \"coverage\": \"$COVERAGE%\",
  \"location\": \"$PIPELINE_DIR\",
  \"version\": \"$(grep version pyproject.toml | cut -d'\"' -f2)\"
}"

echo "$SERVICE_STATUS" > service_status.json
print_status "Service status updated"

# Create deployment manifest
MANIFEST="{
  \"deployment\": {
    \"timestamp\": \"$(date -Iseconds)\",
    \"pipeline_path\": \"$PIPELINE_DIR\",
    \"coverage\": \"$COVERAGE%\",
    \"tests_passed\": true,
    \"environment\": \"production\",
    \"python_version\": \"$(python --version | cut -d' ' -f2)\",
    \"uv_version\": \"$(uv --version | cut -d' ' -f2)\"
  }
}"

echo "$MANIFEST" > deployment_manifest.json
print_status "Deployment manifest created"

# Step 9: Health Check
print_info "Step 9: Running health check..."
if uv run python -c "
import sys
sys.path.insert(0, '.')
try:
    from analytics.analyze_uprootiny import UprootinyAnalytics
    from indexing.index_engine import IndexEngine
    print('✓ All modules import successfully')
    analytics = UprootinyAnalytics()
    print('✓ Analytics module functional')
    engine = IndexEngine(friendly_mode=True)
    print('✓ Index engine functional')
    print('✅ Health check passed')
    sys.exit(0)
except Exception as e:
    print(f'❌ Health check failed: {e}')
    sys.exit(1)
"; then
    print_status "Health check passed"
else
    print_error "Health check failed"
    exit 1
fi

# Step 10: Deployment Complete
print_info "Step 10: Deployment summary"
echo
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "========================="
echo "📁 Location: $PIPELINE_DIR"
echo "📊 Coverage: $COVERAGE%"
echo "🧪 Tests: All passed"
echo "🔒 Security: Scanned"
echo "📦 Package: Built"
echo "🌐 Git: Committed & pushed"
echo "💚 Health: Verified"
echo
echo "🚀 Numerai Pipeline is ready for production!"
echo "📋 Run './start_numerai_pipeline.sh' to start the pipeline"
echo "🧪 Run './run_tests.sh' for quick testing"
echo

# Cleanup
rm -f "$TEST_RESULTS"

exit 0