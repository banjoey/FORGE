# FORGE Methodology

## Development Philosophy

FORGE follows a principled approach to AI-assisted development and OSS contribution:

### 1. Study Before Building
- Clone and analyze upstream projects
- Document patterns and architectural decisions
- Understand the "why" behind implementation choices

### 2. Design in the Open
- Document features before coding in `docs/features/`
- Create Architecture Decision Records (ADRs) for major choices
- Share design rationale with upstream maintainers

### 3. Prototype First
- Test ideas in `experiments/` before integrating
- Validate assumptions with real use cases (work + home)
- Iterate based on feedback

### 4. Contribute Thoughtfully
- Submit focused, well-documented PRs
- Follow upstream project conventions
- Accept that not all ideas will be merged (and that's OK)

## Workflow

### Feature Development Cycle

```
1. Ideation
   └─> docs/features/feature-name.md (design doc)

2. Architecture Decision
   └─> docs/decisions/ADR-NNN-decision.md

3. Prototype
   └─> experiments/feature-name/ (proof of concept)

4. Integration
   └─> repos/PAI/ (fork development)
   └─> Create feature branch: feature/feature-name

5. Testing
   └─> Test in both work and home installations

6. Documentation
   └─> Update PAI docs, create examples

7. Contribution
   └─> PR to upstream with docs/contributions/pr-NNN.md tracking
```

### Git Workflow

```bash
# Always work from a feature branch
cd repos/PAI
git checkout -b feature/awesome-thing

# Keep upstream in sync
git fetch upstream
git rebase upstream/main

# Push to your fork
git push origin feature/awesome-thing

# Create PR via GitHub UI
# Document in docs/contributions/
```

## Multi-Project Context Strategy

One of FORGE's core innovations: **Agents that maintain context across projects**

Traditional approach (BMAD):
- Each project = isolated team
- No shared context between projects

FORGE approach:
- PM agent aware of all company products
- Shared knowledge base across projects
- Context switching without memory loss

Implementation: TBD in feature design docs

## Party Mode Adaptation

BMAD's "party mode" concept: Multiple specialized agents collaborate on a task

FORGE enhancement:
- Agents can be summoned across projects
- Persistent agent memory/personality
- Team templates for quick setup

See: `docs/features/party-mode.md` (to be created)

## Tools & Standards

- **Version Control**: Git with feature branches
- **Documentation**: Markdown in `docs/`
- **Code Style**: Follow upstream conventions
- **Commit Messages**: Conventional Commits format
- **Testing**: Validate in real-world scenarios (work + home)

## Success Metrics

- [ ] opencode.ai compatibility working
- [ ] Party mode functional in PAI
- [ ] Daily status reports generating
- [ ] At least ONE PR merged to upstream PAI
- [ ] Using FORGE daily at work and home

## Learning Goals

As my first major OSS contribution:
- Learn proper git workflow (forks, PRs, rebasing)
- Understand OSS collaboration dynamics
- Practice clear technical communication
- Build relationships with maintainers
- Give back to projects that helped me

---

*"FORGE is where ideas are refined into contributions"*
