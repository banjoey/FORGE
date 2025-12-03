# FORGE Installation Guide

**Installation time**: ~5 minutes

---

## Prerequisites

Before installing FORGE, ensure you have:

1. **PAI (Personal AI Infrastructure)** installed
   - FORGE is built on PAI and requires it to run
   - Installation: [PAI GitHub Repository](https://github.com/danielmiessler/pai)

2. **Claude Code** CLI access
   - For running skills and agents
   - Verify: `claude --version`

3. **Git** (for cloning the repository)
   - Verify: `git --version`

---

## Quick Install (Recommended)

### Option 1: Automated Install Script

```bash
# Clone FORGE
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE

# Run install script (uses symlinks by default)
./install.sh

# Or copy instead of symlink
./install.sh --copy
```

**What the script does**:
1. ✅ Checks PAI is installed at `~/.claude`
2. ✅ Validates FORGE directory structure
3. ✅ Creates PAI directories if needed
4. ✅ Installs 4 skills: AgilePm, Security, TestArchitect, Standup
5. ✅ Installs all agents (Murat, Emma, Wei, etc.)
6. ✅ Verifies installation

**Install methods**:
- **Symlink** (default): Changes to FORGE repo immediately reflected in PAI
- **Copy** (`--copy` flag): Independent copy, safe to delete FORGE repo after install

---

### Option 2: Manual Install

If you prefer manual installation:

```bash
# Clone FORGE
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE

# Create symlinks to PAI directories
ln -s $(pwd)/.claude/skills/AgilePm ~/.claude/skills/
ln -s $(pwd)/.claude/skills/Security ~/.claude/skills/
ln -s $(pwd)/.claude/skills/TestArchitect ~/.claude/skills/
ln -s $(pwd)/.claude/skills/Standup ~/.claude/skills/

# Install agents (find all agents in directory)
for agent in .claude/agents/*; do
    ln -s $(pwd)/$agent ~/.claude/agents/
done
```

**Alternative (copy instead of symlink)**:

```bash
# Copy skills and agents to PAI
cp -r .claude/skills/* ~/.claude/skills/
cp -r .claude/agents/* ~/.claude/agents/
```

---

## Verify Installation

### Test 1: Check PAI Directory

```bash
# List installed skills
ls ~/.claude/skills/

# Expected output:
# AgilePm  Security  TestArchitect  Standup

# List installed agents
ls ~/.claude/agents/

# Expected output:
# Murat  Emma  Wei  (and any custom agents)
```

---

### Test 2: Load a Skill

```bash
# Start Claude Code
claude

# In Claude Code, type:
Use the AgilePm skill
```

**Expected behavior**: AgilePm skill loads successfully, showing available workflows (CreatePrd, CreateEpics, CreateStories, SprintPlanning)

---

### Test 3: Run a Workflow

```bash
# In Claude Code, type:
Use the AgilePm skill to create a PRD for a task management app.

Target users: Solo developers
Problem: Existing task managers are too complex
```

**Expected output**: PRD document with:
- Executive Summary
- System Architecture (with Mermaid diagram)
- Feature Breakdown (MoSCoW prioritized)
- Implementation Checklist

---

## What Gets Installed

### Skills (4 total)

| Skill | Workflows | Purpose |
|-------|-----------|---------|
| **AgilePm** | CreatePrd, CreateEpics, CreateStories, SprintPlanning | Agile project management |
| **Security** | ThreatModel, CmmcBaseline, SecurityReview | Security engineering |
| **TestArchitect** | CreateTestStrategy, DefineCoverage, ATDD | Test strategy and quality |
| **Standup** | RunStandup, SynthesizeDecision, ManageContext | Multi-agent orchestration |

---

### Agents (Default Roster)

| Agent | Role | Expertise |
|-------|------|-----------|
| **Murat** | Product Manager | User value, MoSCoW prioritization, requirements |
| **Emma** | Security Engineer | STRIDE, CMMC Level 2, OWASP Top 10 |
| **Wei** | QA Lead | ATDD, test strategy, risk-based testing |

*Additional custom agents may be included based on FORGE version*

---

### Directory Structure After Install

```
~/.claude/
├── skills/
│   ├── AgilePm/           # FORGE skill (symlinked or copied)
│   ├── Security/          # FORGE skill
│   ├── TestArchitect/     # FORGE skill
│   ├── Standup/           # FORGE skill
│   └── [Other PAI skills] # Existing PAI skills (unchanged)
├── agents/
│   ├── Murat/             # FORGE agent
│   ├── Emma/              # FORGE agent
│   ├── Wei/               # FORGE agent
│   └── [Other PAI agents] # Existing PAI agents (unchanged)
```

**No conflicts**: FORGE skills work alongside existing PAI skills

---

## Installation Options

### Symlink vs Copy

**Symlink** (default):
- ✅ FORGE updates automatically (pull latest from Git)
- ✅ Easy to develop/contribute (edit in FORGE repo)
- ⚠️ Requires FORGE repo to remain on disk

**Copy**:
- ✅ Independent installation (can delete FORGE repo)
- ✅ Stable (no automatic updates)
- ⚠️ Manual updates required (re-run install script)

**Recommendation**: Use symlink for development, copy for production

---

### Uninstall

To remove FORGE:

```bash
# Remove skills
rm -rf ~/.claude/skills/AgilePm
rm -rf ~/.claude/skills/Security
rm -rf ~/.claude/skills/TestArchitect
rm -rf ~/.claude/skills/Standup

# Remove agents
rm -rf ~/.claude/agents/Murat
rm -rf ~/.claude/agents/Emma
rm -rf ~/.claude/agents/Wei
```

**Note**: This does NOT affect other PAI skills or agents

---

## Troubleshooting

### Issue 1: "PAI not found at ~/.claude"

**Cause**: PAI is not installed

**Solution**: Install PAI first
```bash
# Follow PAI installation instructions
# https://github.com/danielmiessler/pai
```

---

### Issue 2: Skill doesn't load in Claude Code

**Symptom**: "Use the AgilePm skill" returns error or skill not found

**Solutions**:

**Check symlink exists**:
```bash
ls -la ~/.claude/skills/AgilePm
```

If broken symlink (red):
```bash
rm ~/.claude/skills/AgilePm
ln -s /full/path/to/FORGE/.claude/skills/AgilePm ~/.claude/skills/
```

**Verify skill.md exists**:
```bash
cat ~/.claude/skills/AgilePm/skill.md
```

If missing, re-run install script.

---

### Issue 3: Agent not found in standup

**Symptom**: Standup can't find Murat, Emma, or Wei

**Solutions**:

**Check agent symlink**:
```bash
ls -la ~/.claude/agents/Murat
```

**Verify agent.md exists**:
```bash
cat ~/.claude/agents/Murat/agent.md
```

If missing, reinstall agents:
```bash
ln -s /full/path/to/FORGE/.claude/agents/Murat ~/.claude/agents/
```

---

### Issue 4: Install script fails with "Permission denied"

**Cause**: Script not executable

**Solution**:
```bash
chmod +x install.sh
./install.sh
```

---

### Issue 5: Symlinks not supported (Windows)

**Symptom**: Windows doesn't support symlinks without admin

**Solution**: Use copy method
```bash
./install.sh --copy
```

Or manual copy:
```bash
cp -r .claude/skills/* ~/.claude/skills/
cp -r .claude/agents/* ~/.claude/agents/
```

---

## Upgrading FORGE

### For Symlinked Installation

```bash
# Navigate to FORGE repo
cd /path/to/FORGE

# Pull latest changes
git pull origin main

# Skills and agents auto-update (symlinked)
```

---

### For Copied Installation

```bash
# Navigate to FORGE repo
cd /path/to/FORGE

# Pull latest changes
git pull origin main

# Re-run install script
./install.sh --copy
```

**Note**: Re-running install script overwrites existing installation

---

## Next Steps

### 1. Quick Start Tutorial

Follow [QUICKSTART.md](QUICKSTART.md) for:
- Creating your first PRD (5 minutes)
- Running your first standup (5 minutes)
- Creating a custom agent (10 minutes)

---

### 2. Explore Examples

See [examples/](examples/) for:
- **Standup transcripts**: Real multi-agent decision-making
- **Project contexts**: Example project-context.md files
- **Custom agents**: Financial Analyst, Legal Specialist, etc.

---

### 3. Read Documentation

- **ARCHITECTURE.md**: Technical architecture, integration with PAI
- **CONTRIBUTION_PROPOSAL.md**: Upstream contribution to PAI
- **CONTRIBUTING.md**: Development guidelines

---

## Platform-Specific Notes

### macOS / Linux

- Symlinks work out of the box
- Use `./install.sh` (recommended)

---

### Windows

- **Git Bash**: Symlinks require admin privileges
  - Use `./install.sh --copy` instead

- **WSL (Windows Subsystem for Linux)**: Symlinks work
  - Use `./install.sh` (recommended)

- **PowerShell**: Different syntax
  - Use manual copy method (see Option 2)

---

## Installation Summary

**Automatic install**:
```bash
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE
./install.sh
```

**Manual install**:
```bash
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE
ln -s $(pwd)/.claude/skills/* ~/.claude/skills/
for agent in .claude/agents/*; do ln -s $(pwd)/$agent ~/.claude/agents/; done
```

**Verify**:
```bash
ls ~/.claude/skills/  # Should see: AgilePm Security TestArchitect Standup
claude                 # Start Claude Code
> Use the AgilePm skill  # Test skill loads
```

---

## Support

- **Installation issues**: Open issue on GitHub with error message
- **General questions**: See [QUICKSTART.md](QUICKSTART.md) or [examples/](examples/)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Last Updated**: 2025-12-02
**FORGE Version**: Release 0.2 (Emma Security Engineer agent with 72 automated tests)
