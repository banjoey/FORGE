# EPIC-AGILE: Enterprise Agile Product Management

**Feature Branch**: `feature/agile-pm`
**Status**: ✅ Complete (Release 0.1.0)
**PAI Fork**: https://github.com/banjoey/Personal_AI_Infrastructure/tree/feature/agile-pm

---

## Overview

Enterprise-grade agile product management skill with PRD generation, epic decomposition, user story creation, and sprint planning.

## Success Metrics

| Metric | Target | Achieved | Status |
|--------|--------|----------|--------|
| PRD Quality Score | ≥8/10 | **10/10** | ✅ Exceeded |
| Workflows Complete | 4 | **4** | ✅ Met |
| Templates Complete | 5 | **5** | ✅ Met |
| Dogfooded Projects | 1+ | **1** (FORGE) | ✅ Met |

## Feature Branch Contents

```
feature/agile-pm/
└── .claude/skills/AgilePm/
    ├── SKILL.md
    ├── METHODOLOGY.md
    ├── workflows/
    │   ├── CreatePrd.md
    │   ├── CreateEpics.md
    │   ├── CreateStories.md
    │   └── SprintPlanning.md
    ├── templates/
    │   ├── prd-template.md
    │   ├── epic-template.md
    │   ├── story-template.md
    │   ├── sprint-status-template.yaml
    │   └── project-context.md
    └── knowledge/
        ├── prd-rubric.md
        └── epic-sizing.md
```

## Sprints

### Sprint 1: PRD & Epic Workflows (2 weeks) ✅ COMPLETE

**Week 1**:
- Story 1.1: CreatePrd workflow (8 pts) ✅
- Story 1.2: CreateEpics workflow (5 pts) ✅

**Week 2**:
- Story 1.3: CreateStories workflow (8 pts) ✅
- Story 1.4: SprintPlanning workflow (5 pts) ✅

**Total**: 26 story points

**Validation Gate**: PRD quality ≥8/10 → FORGE PRD scored **10/10** ✅

## Capabilities

### 1. CreatePrd - Comprehensive PRD Generation

**8-step process**:
1. Executive summary
2. System architecture (Mermaid diagrams)
3. Feature breakdown (MoSCoW prioritized)
4. Implementation checklist
5. Success metrics
6. Risk assessment
7. Timeline estimation
8. Quality validation

**Output**: Production-ready PRD with 10-point quality scoring

### 2. CreateEpics - Epic Decomposition

**7-step process**:
1. Parse PRD features
2. Identify user value themes
3. Create epics (MoSCoW prioritized)
4. Size epics (S/M/L)
5. Define acceptance criteria
6. Map dependencies
7. Validate completeness

**Output**: User-value epics with business justification

### 3. CreateStories - User Story Generation

**8-step process**:
1. Break epics into stories
2. Apply INVEST principles
3. Write Given-When-Then acceptance criteria
4. Estimate story points (Fibonacci)
5. Add security requirements
6. Add testing requirements
7. Identify dependencies
8. Validate against INVEST

**Output**: INVEST-compliant user stories ready for sprint planning

### 4. SprintPlanning - Velocity-Based Planning

**7-step process**:
1. Calculate team velocity
2. Prioritize stories (MoSCoW)
3. Assign to sprints
4. Define sprint goals
5. Generate sprint-status.yaml
6. Plan sprint ceremonies
7. Track burndown metrics

**Output**: sprint-status.yaml with sprint assignments and tracking

## Dogfooding Results

**Project**: FORGE PRD (docs/PRD-FORGE.md)
- **Quality Score**: 10/10 (rubric validation)
- **Executive Summary**: Clear pain point → solution → metrics (2/2)
- **System Architecture**: Mermaid diagram, all components (2/2)
- **Feature Breakdown**: MoSCoW prioritized, user value clear (2/2)
- **Implementation Checklist**: 164 story points, 5 sprints (2/2)
- **Clarity**: Well-organized, no ambiguity (2/2)

## Upstream PR Criteria

Before submitting to `danielmiessler/Personal_AI_Infrastructure`:

- [ ] Dogfooded on 3+ projects with 8+/10 scores (currently 1)
- [ ] Community feedback from 5+ users (pending)
- [ ] Documentation complete (✅ done)
- [ ] Integration with PAI planning tools (pending)

**Estimated Ready Date**: Q2 2026 (after 3 more projects)

## Future Enhancements (Release 0.2+)

- Automated roadmap generation
- Integration with Jira/Linear/GitHub Projects
- AI-powered story point estimation
- Velocity tracking dashboard
- Release planning automation

## Related Documentation

- [AgilePm Methodology](../../.claude/skills/AgilePm/METHODOLOGY.md)
- [PRD Rubric](../../.claude/skills/AgilePm/knowledge/prd-rubric.md)
- [Epic Sizing Guide](../../.claude/skills/AgilePm/knowledge/epic-sizing.md)

---

**Epic Owner**: FORGE Development Team
**Created**: December 4, 2025
