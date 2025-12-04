# FORGE Feature Branch Map

This document maps FORGE development epics to PAI fork feature branches.

## Repository Structure

```
FORGE (this repo)                      PAI Fork (banjoey/Personal_AI_Infrastructure)
├── Development lab                    ├── main (tracks upstream)
├── Prototyping                        ├── forge-all (integration branch)
└── Testing                            └── Feature branches (for upstream PRs):
                                           ├── feature/security
                                           ├── feature/agile-pm
                                           ├── feature/testing
                                           └── feature/collaboration
```

## Feature Branch Mapping

### feature/security → Daniel Security Skill

**Epic**: EPIC-SECURITY (Security Engineering)
**Status**: ✅ Complete (Release 0.1.0)
**PAI Branch**: `feature/security`

**Contents**:
- `.claude/skills/Daniel/` - Security skill (50+ patterns, CMMC Level 2)
- `src/daniel/` - TypeScript implementation
- `tests/daniel-*.test.ts` - 107 tests, 89.65% coverage
- `docs/CMMC-MAPPING.md` - Complete CMMC documentation

**Metrics**:
- Function coverage: 89.65% (target: 80%)
- Test pass rate: 100% (107/107)
- CMMC domains: 17/17 (100%)
- Vulnerability patterns: 50+

**When to PR Upstream**: After 95% coverage achieved and all CMMC domains validated

**Related Epics** (deprecated):
- EPIC-001-skills-from-bmad.md (Daniel implementation portion)

---

### feature/agile-pm → AgilePm Skill

**Epic**: EPIC-AGILE (Agile Product Management)
**Status**: ✅ Complete (Release 0.1.0)
**PAI Branch**: `feature/agile-pm`

**Contents**:
- `.claude/skills/AgilePm/` - 4 workflows (PRD, Epics, Stories, Sprints)
- Templates: prd-template.md, epic-template.md, story-template.md, sprint-status.yaml
- Knowledge: prd-rubric.md (quality scoring), epic-sizing.md (estimation guide)

**Metrics**:
- Dogfooded: FORGE PRD scored 10/10
- Workflows: 4/4 complete
- Templates: 5/5 complete

**When to PR Upstream**: After 3+ projects dogfooded successfully with 8+/10 PRD scores

**Related Epics** (deprecated):
- EPIC-001-skills-from-bmad.md (AgilePm implementation portion)

---

### feature/testing → TestArchitect + Security Skills

**Epic**: EPIC-TESTING (Test Engineering & Security Baseline)
**Status**: ✅ Complete (Release 0.1.0)
**PAI Branch**: `feature/testing`

**Contents**:
- `.claude/skills/TestArchitect/` - 5 workflows (ATDD, risk-based testing, coverage, CI/CD, test strategy)
- `.claude/skills/Security/` - 4 workflows (ThreatModel, CmmcBaseline, SecurityReview, InfrastructureSecurity)
- Tools: atdd-enforcer.ts, risk-scorer.ts

**Metrics**:
- TestArchitect workflows: 5/5 complete
- Security workflows: 4/4 complete
- Dogfooded: 144 tests defined, 89.65% coverage achieved

**When to PR Upstream**: After 5+ projects use test strategy successfully with 80%+ coverage

**Related Epics** (deprecated):
- EPIC-001-skills-from-bmad.md (TestArchitect + Security implementation)

---

### feature/collaboration → Standup Multi-Agent System

**Epic**: EPIC-COLLABORATION (Multi-Agent Orchestration)
**Status**: ✅ Complete (Release 0.1.0)
**PAI Branch**: `feature/collaboration`

**Contents**:
- `.claude/skills/Standup/` - 3 workflows (RunStandup, ManageContext, SynthesizeDecision)
- `.claude/agents/{Daniel,Mary,Clay,Hefley,Amy}/` - 5 agent personalities
- Templates: custom-agent-template.md, project-context.md

**Metrics**:
- Issue detection: 3.67x improvement (target: 2-3x)
- Agents: 5/5 complete
- Smart roster selection: Implemented
- Dogfooded: 39 issues found vs 10 solo mode

**When to PR Upstream**: After 10+ teams use successfully and validate 2x+ improvement

**Related Epics** (deprecated):
- EPIC-002-standup-agents.md
- EPIC-003-standup-orchestration.md

---

## Sprint Organization (Feature Branch Focused)

### Current: forge-all Branch Development

**Purpose**: Integration branch with all features for team use

**Workflow**:
1. Develop in FORGE repo (development lab)
2. Test features locally
3. When "baked", copy to PAI fork feature branch
4. Merge feature branch → `forge-all`
5. Team deploys from `forge-all`

### Future: Upstream PR Workflow

When features are production-ready:

```bash
# 1. Finalize feature branch
cd ~/src/pai/Personal_AI_Infrastructure
git checkout feature/security
# Add final polish, documentation

# 2. Create PR to danielmiessler/Personal_AI_Infrastructure
gh pr create --base main --head banjoey:feature/security \
  --title "Add Daniel Security Skill - CMMC Level 2 Compliance" \
  --body "See EPIC-SECURITY.md for full details"

# 3. If accepted, feature becomes part of upstream PAI
# 4. If not accepted, feature stays in our fork for team use
```

---

## Deprecated Epics (Pre-Feature Branch Structure)

These epics were created before the feature branch reorganization. Content has been migrated to feature branches.

**Archive**:
- `EPIC-001-skills-from-bmad.md` → Split into feature/security, feature/agile-pm, feature/testing
- `EPIC-002-standup-agents.md` → Merged into feature/collaboration
- `EPIC-003-standup-orchestration.md` → Merged into feature/collaboration
- `EPIC-003-pai-compliance-review.md` → Completed (validation gate for Release 0.1.0)
- `EPIC-004-pai-customization.md` → Implemented in forge-all (personalization system)

**Keep for reference**, but new development should focus on feature branches.

---

## Next Features (Future Feature Branches)

### feature/personalization (Planned: Release 0.2)
- Team configuration system
- Company branding support
- Profile management enhancements
- Custom agent creation wizard

### feature/observability (Planned: Release 0.2)
- Real-time agent activity monitoring
- Multi-agent workflow debugging
- Performance metrics dashboard

### feature/advanced-security (Planned: Release 0.2)
- Remaining 33 story points from security gaps
- Enhanced CMMC coverage (110 practices)
- Automated security scanning CI/CD integration

---

## Using This Map

**For Development**:
1. Pick a feature branch to work on
2. Develop in FORGE repo (faster iteration)
3. Test locally with Docker
4. Copy to PAI fork feature branch when ready
5. Merge to `forge-all` for team deployment

**For Production**:
1. Users install from `forge-all` branch
2. Features are battle-tested before upstream PRs
3. Team gets immediate value
4. Upstream benefits when features are mature

**For Upstream Contribution**:
1. Feature branch must be "baked" (metrics validated)
2. Create PR from feature branch to danielmiessler/PAI
3. Dan accepts or rejects
4. Either way, our team has the features in our fork

---

**Last Updated**: December 4, 2025
**Maintained By**: FORGE Development Team
