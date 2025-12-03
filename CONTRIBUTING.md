# Contributing to FORGE

Thank you for your interest in contributing to FORGE! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Skill Development Guidelines](#skill-development-guidelines)
- [Agent Development Guidelines](#agent-development-guidelines)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

---

## Code of Conduct

FORGE is a learning project and my first major OSS contribution. I welcome:
- Constructive feedback and code review
- Suggestions for improvements
- Bug reports and feature requests
- Questions about implementation choices

Please be patient and kind. We're all learning together.

---

## How Can I Contribute?

### 1. Report Bugs

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, PAI version, Claude Code version)

### 2. Suggest Enhancements

Have an idea? Open an issue with:
- Clear use case (what problem does it solve?)
- Proposed solution (if you have one)
- Alternatives considered
- Impact on existing functionality

### 3. Contribute Code

Ready to code? Follow the process below:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Follow development guidelines (see below)
4. Write tests (see Testing Requirements)
5. Submit a pull request

### 4. Improve Documentation

Documentation improvements are always welcome:
- Fix typos or unclear explanations
- Add examples
- Improve workflow documentation
- Create tutorials or guides

### 5. Create Custom Agents

Share your custom agents with the community:
- Create agent for a new domain (finance, legal, healthcare, etc.)
- Document their expertise and use cases
- Provide example standup contributions
- Submit as a pull request to `examples/agents/`

---

## Development Setup

### Prerequisites

- **PAI**: FORGE is built on PAI (Personal AI Infrastructure)
- **Claude Code**: For development and testing
- **Git**: For version control
- **Node.js** (optional): For future test implementation

### Installation

```bash
# 1. Fork and clone FORGE
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE

# 2. Install in PAI (symlink skills and agents)
ln -s $(pwd)/.claude/skills/* ~/.claude/skills/
ln -s $(pwd)/.claude/agents/* ~/.claude/agents/

# 3. Verify installation
claude skill AgilePm  # Should load successfully
```

### Directory Structure

```
FORGE/
├── .claude/
│   ├── skills/              # PAI-compliant skills
│   │   ├── AgilePm/
│   │   │   ├── skill.md     # Skill definition (TitleCase, USE WHEN, Examples)
│   │   │   ├── workflows/   # Workflow markdown files (TitleCase.md)
│   │   │   ├── templates/   # Copy-paste templates
│   │   │   ├── knowledge/   # Reference documentation
│   │   │   ├── tools/       # Executables (if any)
│   │   │   └── METHODOLOGY.md  # Skill principles and approach
│   │   └── [OtherSkills]/
│   └── agents/              # Agent definitions
│       ├── Hefley/
│       │   └── agent.md     # Agent persona, expertise, communication style
│       └── [OtherAgents]/
├── docs/
│   ├── PRD-FORGE.md         # Product Requirements Document
│   ├── threat-model-FORGE.md   # Security threat model
│   ├── test-strategy-FORGE.md  # Test strategy
│   ├── epics/               # Release planning
│   └── validation/          # Validation tests
├── README.md
└── CONTRIBUTING.md          # This file
```

---

## Skill Development Guidelines

### PAI Compliance Requirements

All skills MUST follow PAI standards:

#### 1. Skill Definition (skill.md)

**Required frontmatter**:
```yaml
---
name: SkillName  # TitleCase, no spaces, no hyphens
description: One-line description. USE WHEN user needs X, Y, or Z. <1024 chars.
---
```

**Required sections**:
1. **Workflow Routing Table**: Maps workflows to use cases
2. **Examples** (2-3 minimum): Show skill usage patterns
3. **Integration**: How skill works with other skills
4. **Methodology**: Link to METHODOLOGY.md

**Example**:
```markdown
---
name: AgilePm
description: Enterprise agile product management. USE WHEN user needs PRD creation, epic decomposition, user story generation, or sprint planning.
---

# AgilePm

Enterprise agile product management for PAI projects.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| CreatePrd | Need comprehensive PRD | PRD with architecture, features, checklist |
| CreateEpics | Break PRD into epics | User-value epics with MoSCoW prioritization |

## Examples

### Example 1: Create PRD for new project
[...]
```

#### 2. Workflow Files (workflows/WorkflowName.md)

**Naming**: TitleCase.md (e.g., `CreatePrd.md`, not `create-prd.md`)

**Required sections**:
- **Purpose**: One-line summary
- **Input**: What user provides
- **Output**: What workflow produces
- **Workflow Steps**: Detailed step-by-step process

**Example**:
```markdown
# CreatePrd Workflow

**Purpose**: Generate comprehensive Product Requirements Document

**Input**: Project name, target users, problem statement

**Output**: PRD with executive summary, architecture, features, implementation checklist

## Workflow Steps

### Step 1: Executive Summary
[...]
```

#### 3. METHODOLOGY.md

Every skill MUST have a METHODOLOGY.md explaining:
- Principles (why this approach?)
- Workflow sequence (when to use each workflow)
- References (frameworks, methodologies)

#### 4. Tools Directory

Every skill MUST have a `tools/` directory (even if empty).

**Why**: PAI requirement for skill structure compliance.

### Skill Quality Checklist

Before submitting a skill:
- [ ] TitleCase naming (skill name, workflow files)
- [ ] USE WHEN description (<1024 chars)
- [ ] Examples section (2-3 examples)
- [ ] Workflow Routing table
- [ ] METHODOLOGY.md exists
- [ ] tools/ directory exists (even if empty)
- [ ] Templates provided (if applicable)
- [ ] Knowledge base provided (if applicable)
- [ ] Dogfooded (used to create real artifact)

---

## Agent Development Guidelines

### Agent Definition Requirements

All agents MUST have an `agent.md` file with:

**Required frontmatter**:
```yaml
---
name: AgentName
role: Role Title
expertise: Domain 1, Domain 2, Domain 3
personality: Trait 1, Trait 2, Trait 3
triggers: Trigger 1, Trigger 2, Trigger 3
---
```

**Required sections**:
1. **Core Responsibilities**: What agent focuses on
2. **Behavioral Guidelines**: How agent thinks
3. **Communication Style**: Tone and example phrases
4. **Standup Participation**: When to speak up
5. **Example Contributions**: Demonstrate expertise in action
6. **Integration with Other Agents**: How they collaborate
7. **Decision-Making Framework**: Agent's approach to decisions

### Agent Persona Consistency

Agents must be **consistent and distinct**:
- Use catchphrases (Hefley: "What problem are we solving?")
- Apply consistent frameworks (Daniel: STRIDE, Amy: Test Pyramid)
- Maintain personality (Hefley: ruthless prioritizer, Daniel: security-first, Amy: test-first)

### Custom Agent Template

Use `.claude/skills/Standup/templates/custom-agent-template.md` as starting point.

**Example domains**:
- **Finance**: Financial Analyst, Compliance Officer, Investment Advisor
- **Legal**: Contract Specialist, Risk Manager, Business Counsel
- **Healthcare**: Clinical Specialist, Regulatory Affairs, Patient Advocate
- **Design**: UX Designer, Brand Manager, Accessibility Expert

### Agent Quality Checklist

Before submitting an agent:
- [ ] Frontmatter complete (name, role, expertise, personality, triggers)
- [ ] Core responsibilities defined (3+)
- [ ] Catchphrases provided (5+)
- [ ] Example contributions (2+ scenarios)
- [ ] Integration with other agents documented
- [ ] Decision framework explained
- [ ] Persona consistency validated (stays in character)

---

## Testing Requirements

### Test-First Development (ATDD)

FORGE follows Acceptance Test-Driven Development:

1. **Write acceptance criteria** (Given-When-Then)
2. **Write test** (RED - fails)
3. **Implement feature** (code)
4. **Run test** (GREEN - passes)
5. **Refactor** (improve without breaking test)

### Test Pyramid

- **70% Unit tests**: Test workflow steps, validation logic, helper functions
- **20% Integration tests**: Test full workflows, file I/O, multi-agent conversations
- **10% E2E tests**: Test complete user journeys

### Coverage Targets

| Component Risk | Coverage Target | Rationale |
|----------------|-----------------|-----------|
| Critical | 90% | Core innovation, user-facing, security |
| High | 80% | Complex output, quality gates |
| Medium | 70% | Standard processes |
| Low | 50% | Static content, documentation |

### Dogfooding Requirement

All skills MUST be dogfooded (used to create real artifacts):
- **AgilePm**: Created PRD-FORGE.md (scored 10/10)
- **Security**: Created threat-model-FORGE.md (8 threats, 0 critical)
- **TestArchitect**: Created test-strategy-FORGE.md (144 tests)

**Why**: Proves skill works correctly, validates quality

### Test Implementation

Tests will be implemented in Release 0.2. For MVP:
- Manual validation (dogfooding)
- A/B testing (solo vs standup)
- Quality scoring (PRD rubric, threat model STRIDE coverage)

---

## Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature
# or
git checkout -b agent/your-agent
# or
git checkout -b fix/bug-description
```

### 2. Follow Conventions

**Commit Messages**:
- Use conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`
- Be descriptive: "feat: add Investment Advisory agent" not "add agent"
- Reference issues: "fix: correct STRIDE coverage (#42)"

**Code Style**:
- Markdown: Use markdownlint (no trailing spaces, consistent headers)
- YAML frontmatter: Consistent formatting
- File naming: TitleCase for skills/workflows, kebab-case for docs

### 3. Update Documentation

- Update README.md if adding new skill/agent
- Update CHANGELOG.md (if exists)
- Add examples to skill.md
- Document integration with existing skills

### 4. Test Your Changes

- [ ] Dogfood your skill/agent (create real artifact)
- [ ] Validate PAI compliance (TitleCase, USE WHEN, Examples, tools/)
- [ ] Check for broken links
- [ ] Verify symlinks work

### 5. Submit Pull Request

**PR Title**: Use conventional commit format
- `feat: Add Investment Advisory agent`
- `fix: Correct CMMC practice citations in Security skill`
- `docs: Improve CreatePrd workflow examples`

**PR Description** (template):
```markdown
## Summary
[What does this PR do?]

## Motivation
[Why is this change needed?]

## Changes
- [Change 1]
- [Change 2]

## Testing
- [ ] Dogfooded (used skill to create artifact)
- [ ] PAI compliance validated
- [ ] Documentation updated
- [ ] Examples provided

## Related Issues
Closes #42
```

### 6. Code Review

- Respond to feedback constructively
- Make requested changes promptly
- Ask questions if unclear
- Update PR description if scope changes

### 7. Merge

Once approved:
- Squash commits (if requested)
- Maintainer will merge
- Delete feature branch after merge

---

## Release Process

FORGE follows semantic versioning: `MAJOR.MINOR.PATCH`

**Current**: Release 0.1 MVP (Sprint 5 - Final polish)

**Upcoming**:
- **Release 0.2 Enterprise** (8-10 weeks): Security + testing gaps
- **Release 0.3 Upstream** (3-4 weeks): Customization + PAI contribution

### Release Checklist

- [ ] All planned features complete
- [ ] Dogfooding complete (all skills validated)
- [ ] Validation gates passed (PRD quality, threat model, test strategy)
- [ ] Documentation updated (README, CONTRIBUTING, CHANGELOG)
- [ ] Tests implemented (if applicable)
- [ ] Quality review complete
- [ ] Git tag created (`git tag v0.1.0`)
- [ ] Release notes published

---

## Development Principles

FORGE is built on these principles:

### 1. Augmentation, Not Replacement
- FORGE augments PAI, doesn't compete with it
- Follow PAI standards strictly
- Contribute improvements back upstream

### 2. Multi-Agent Collaboration
- Diverse perspectives find more issues (validated: 3.67x)
- Synthesis beats solo decisions
- Document decision rationale

### 3. Test-First Development
- Write tests before code (ATDD)
- Use Test Pyramid (70/20/10)
- Risk-based coverage (Critical 90%, High 80%, Medium 70%, Low 50%)

### 4. Security-First Design
- STRIDE threat modeling for all features
- CMMC compliance (71 practices in MVP, 110 in Release 0.2)
- Defense-in-depth, least privilege, fail secure

### 5. Dogfooding Everything
- Use FORGE skills to build FORGE
- Validate skills work correctly
- Prove quality through real artifacts

### 6. Agile Methodology
- Story points (Fibonacci scale)
- MoSCoW prioritization (Must/Should/Could/Won't)
- INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Sprint planning (velocity-based)

---

## Questions?

- **General questions**: Open a discussion on GitHub
- **Bug reports**: Open an issue with reproduction steps
- **Feature requests**: Open an issue with use case and proposal
- **Security concerns**: Email [your-email] (private disclosure)

---

**Thank you for contributing to FORGE!**

This is my first major OSS contribution project. I'm learning as I go, and your patience and guidance are appreciated. Let's build better software development tools together.

---

**Last Updated**: 2025-12-02
**FORGE Version**: Release 0.1 MVP (Sprint 5)
