#!/bin/bash

# FORGE Installation Script
# Installs FORGE skills and agents into PAI (Personal AI Infrastructure)

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}  FORGE Installation${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if PAI is installed
check_pai() {
    if [ ! -d "$HOME/.claude" ]; then
        print_error "PAI not found at ~/.claude"
        echo ""
        echo "Please install PAI (Personal AI Infrastructure) first:"
        echo "  https://github.com/danielmiessler/pai"
        echo ""
        exit 1
    fi
    print_success "PAI found at ~/.claude"
}

# Get FORGE directory
FORGE_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check if .claude directory exists in FORGE
check_forge_structure() {
    if [ ! -d "$FORGE_DIR/.claude/skills" ]; then
        print_error "FORGE skills directory not found"
        echo "  Expected: $FORGE_DIR/.claude/skills"
        exit 1
    fi

    if [ ! -d "$FORGE_DIR/.claude/agents" ]; then
        print_error "FORGE agents directory not found"
        echo "  Expected: $FORGE_DIR/.claude/agents"
        exit 1
    fi

    print_success "FORGE structure validated"
}

# Create directories if they don't exist
create_pai_directories() {
    mkdir -p "$HOME/.claude/skills"
    mkdir -p "$HOME/.claude/agents"
    print_success "PAI directories ready"
}

# Install skills
install_skills() {
    local method="$1"

    echo ""
    print_info "Installing FORGE skills..."

    local skills=("AgilePm" "Security" "TestArchitect" "Standup" "Daniel")

    for skill in "${skills[@]}"; do
        local source="$FORGE_DIR/.claude/skills/$skill"
        local target="$HOME/.claude/skills/$skill"

        if [ ! -d "$source" ]; then
            print_warning "Skill not found: $skill (skipping)"
            continue
        fi

        # Remove existing installation
        if [ -e "$target" ] || [ -L "$target" ]; then
            rm -rf "$target"
        fi

        if [ "$method" = "symlink" ]; then
            ln -s "$source" "$target"
            print_success "Linked: $skill"
        else
            cp -r "$source" "$target"
            print_success "Copied: $skill"
        fi
    done
}

# Install agents
install_agents() {
    local method="$1"

    echo ""
    print_info "Installing FORGE agents..."

    # Find all agent directories
    local agents=($(find "$FORGE_DIR/.claude/agents" -maxdepth 1 -type d -not -path "$FORGE_DIR/.claude/agents" -exec basename {} \;))

    if [ ${#agents[@]} -eq 0 ]; then
        print_warning "No agents found in $FORGE_DIR/.claude/agents"
        return
    fi

    for agent in "${agents[@]}"; do
        local source="$FORGE_DIR/.claude/agents/$agent"
        local target="$HOME/.claude/agents/$agent"

        # Remove existing installation
        if [ -e "$target" ] || [ -L "$target" ]; then
            rm -rf "$target"
        fi

        if [ "$method" = "symlink" ]; then
            ln -s "$source" "$target"
            print_success "Linked: $agent"
        else
            cp -r "$source" "$target"
            print_success "Copied: $agent"
        fi
    done
}

# Verify installation
verify_installation() {
    echo ""
    print_info "Verifying installation..."

    local all_ok=true
    local start_time=$(date +%s)

    # Check skills
    local skills=("AgilePm" "Security" "TestArchitect" "Standup" "Daniel")
    for skill in "${skills[@]}"; do
        local skill_file="$HOME/.claude/skills/$skill/SKILL.md"

        if [ -e "$skill_file" ]; then
            # Check if symlink
            if [ -L "$skill_file" ]; then
                # Verify symlink is not broken
                if [ -r "$skill_file" ]; then
                    print_success "Skill verified: $skill (symlink)"
                else
                    print_error "Skill symlink broken: $skill"
                    all_ok=false
                    continue
                fi
            else
                print_success "Skill verified: $skill (copy)"
            fi

            # Verify file is readable and recent (modified within last 60 seconds)
            local file_time=$(stat -f %m "$skill_file" 2>/dev/null || stat -c %Y "$skill_file" 2>/dev/null)
            local time_diff=$((start_time - file_time))

            if [ "$time_diff" -lt 60 ]; then
                print_info "  ✓ Recently installed ($time_diff seconds ago)"
            else
                print_warning "  ⚠ File is older than expected (may be from previous install)"
            fi
        else
            print_error "Skill missing: $skill"
            all_ok=false
        fi
    done

    # Check agents
    local agent_count=$(find "$HOME/.claude/agents" -maxdepth 1 -type d -o -type l 2>/dev/null | wc -l)
    if [ "$agent_count" -gt 1 ]; then
        print_success "Agents installed: $((agent_count - 1)) agents"

        # Verify agent directories/symlinks are readable
        find "$HOME/.claude/agents" -maxdepth 1 -type d -o -type l 2>/dev/null | while read -r agent_path; do
            if [ "$agent_path" != "$HOME/.claude/agents" ]; then
                local agent_name=$(basename "$agent_path")
                if [ -L "$agent_path" ]; then
                    if [ -r "$agent_path/agent.md" ]; then
                        print_info "  ✓ Agent symlink valid: $agent_name"
                    else
                        print_warning "  ⚠ Agent symlink may be broken: $agent_name"
                    fi
                fi
            fi
        done
    else
        print_warning "No agents found"
    fi

    if [ "$all_ok" = true ]; then
        echo ""
        print_success "Installation verified successfully!"
        print_info "Installation completed in $(($(date +%s) - start_time)) seconds"
    else
        echo ""
        print_error "Installation verification failed"
        exit 1
    fi
}

# Setup user profile
setup_profile() {
    echo ""
    print_info "Let's personalize your FORGE installation..."
    echo ""

    # Get user name
    read -p "What's your name? " USER_NAME
    if [ -z "$USER_NAME" ]; then
        USER_NAME="User"
    fi

    # Get assistant name
    echo ""
    read -p "What would you like to name your assistant? (default: FORGE) " ASSISTANT_NAME
    if [ -z "$ASSISTANT_NAME" ]; then
        ASSISTANT_NAME="FORGE"
    fi

    # Create profile.json
    local PROFILE_DIR="$HOME/.pai"
    mkdir -p "$PROFILE_DIR"

    cat > "$PROFILE_DIR/profile.json" <<EOF
{
  "version": "1.0",
  "user": {
    "name": "$USER_NAME",
    "preferred_name": "$USER_NAME"
  },
  "assistant": {
    "name": "$ASSISTANT_NAME",
    "personality": "professional"
  },
  "preferences": {
    "voice_enabled": false,
    "observability": false
  }
}
EOF

    print_success "Profile created: $PROFILE_DIR/profile.json"
    print_info "  User: $USER_NAME"
    print_info "  Assistant: $ASSISTANT_NAME"
    echo ""
}

# Print success message
print_completion() {
    # Load profile to personalize completion message
    local PROFILE_FILE="$HOME/.pai/profile.json"
    local USER_NAME="User"
    local ASSISTANT_NAME="FORGE"

    if [ -f "$PROFILE_FILE" ]; then
        USER_NAME=$(grep -o '"name": *"[^"]*"' "$PROFILE_FILE" | head -1 | sed 's/"name": *"\([^"]*\)"/\1/')
        ASSISTANT_NAME=$(grep -o '"name": *"[^"]*"' "$PROFILE_FILE" | tail -1 | sed 's/"name": *"\([^"]*\)"/\1/')
    fi

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  FORGE Installation Complete!${NC}"
    echo -e "${GREEN}========================================${NC}\n"

    echo "Welcome, $USER_NAME! Your assistant '$ASSISTANT_NAME' is ready."
    echo ""
    echo "Next steps:"
    echo "  1. Run: claude"
    echo "  2. Type: Use the AgilePm skill"
    echo "  3. See: QUICKSTART.md for tutorials"
    echo ""
    echo "Resources:"
    echo "  - Quick start: QUICKSTART.md"
    echo "  - Architecture: ARCHITECTURE.md"
    echo "  - Contributing: CONTRIBUTING.md"
    echo "  - Examples: examples/"
    echo ""
}

# Main installation flow
main() {
    print_header

    # Parse arguments
    local install_method="symlink"
    if [ "$1" = "--copy" ]; then
        install_method="copy"
        print_info "Installation method: copy"
    else
        print_info "Installation method: symlink (use --copy to copy instead)"
    fi

    # Run checks
    check_pai
    check_forge_structure
    create_pai_directories

    # Ask for confirmation
    echo ""
    read -p "Install FORGE skills and agents to ~/.claude? (y/n) " -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
    fi

    # Setup user profile
    setup_profile

    # Install
    install_skills "$install_method"
    install_agents "$install_method"
    verify_installation
    print_completion
}

# Run main
main "$@"
