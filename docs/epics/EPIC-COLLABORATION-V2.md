# EPIC-COLLABORATION-V2: Enhanced Roleplay Standup

**Feature Branch**: `feature/collaboration-v2`
**Status**: 🚧 Planning (Release 0.1.1)
**Parent Branch**: `feature/collaboration`
**Estimated Completion**: 6 weeks (3 sprints)

---

## Overview

Enhancement of FORGE's Standup skill with intelligent agent selection, explicit conflict protocols, and round-based structure. Based on learnings from BMAD-METHOD's party mode implementation.

**Goal**: Improve standup output quality by 20-30% while maintaining proven 3.67x issue detection advantage.

---

## Success Metrics

| Metric | Current (v1) | Target (v2) | Status |
|--------|--------------|-------------|--------|
| Conflict Richness | 5/10 | 7-8/10 | 🎯 Target |
| Recommendation Completeness | 6/10 | 8-9/10 | 🎯 Target |
| Agent Selection Accuracy | 60% | 90%+ | 🎯 Target |
| Token Usage | 15k/standup | 10-12k | 🎯 Target |
| Issues Found Multiplier | 3.67x | 3.67x+ (maintain) | 🎯 Target |

---

## Key Enhancements

### 1. Intelligent Agent Selection
**Current**: All 5 agents respond every time
**Enhanced**: Auto-select 2-3 most relevant agents per question

**Example**:
```
Question: "Review this SQL query for security issues"
Current: Mary, Clay, Hefley, Daniel, Amy (all 5)
Enhanced: Daniel (Security), Clay (Tech Lead), Amy (Testing) (3 relevant)
Benefit: -40% token usage, +50% focus
```

### 2. Explicit Conflict Protocols
**Current**: Implicit conflict (unconscious harmonization risk)
**Enhanced**: Forced authentic disagreement through role instructions

**Example**:
```
Daniel: "I must advocate for security even if unpopular"
Hefley: "I must defend business priority even if it delays security"
Result: Genuine tension → Better trade-off analysis
```

### 3. Round-Based Structure
**Current**: One-shot responses
**Enhanced**: Multi-round with user control

**Rounds**:
- Round 1: Independent perspectives (no cross-talk)
- Round 2: Reactive perspectives (cross-talk encouraged)
- Round 3: Final positions (consensus building)

**User Controls**: [C]ontinue, [S]ynthesize, [E]xpand roster, [X]exit

### 4. Enhanced Cross-Talk
**Current**: Basic cross-references
**Enhanced**: Explicit patterns (agreement, disagreement, questions, building)

### 5. Agent Rotation Logic (Optional)
**Current**: No tracking
**Enhanced**: Balance participation over time

---

## Sprint Breakdown

### Sprint 1: Agent Selection & Conflict Protocols (Weeks 1-2)

**Goal**: Implement intelligent agent selection and explicit conflict protocols

**Stories**:

#### Story 1.1: Agent Selection Algorithm
**Points**: 5
**Priority**: MUST HAVE

**Tasks**:
- [ ] Create domain keyword mapping (authentication → Daniel+Amy+Clay)
- [ ] Implement selection algorithm (parse, match, rank, select)
- [ ] Add manual override (`roster: ['Daniel', 'Clay']`)
- [ ] Unit tests (10 tests, 80% coverage target)

**Acceptance Criteria**:
```
Given: Question "Review authentication design"
When: Agent selection runs
Then: Selects Daniel (Security), Clay (Tech Lead), Amy (QA)
And: Excludes Mary (BA), Hefley (PM)

Given: User specifies `roster: ['Hefley', 'Mary']`
When: Agent selection runs
Then: Overrides auto-selection, uses specified roster
```

**Testing**:
- Unit tests: `tests/agent-selection.test.ts`
- Test cases: 10 questions × expected rosters
- Success: 90%+ accuracy

---

#### Story 1.2: Conflict Protocols
**Points**: 5
**Priority**: MUST HAVE

**Tasks**:
- [ ] Define conflict instructions per agent
- [ ] Update agent persona files (`.claude/agents/*/agent.md`)
- [ ] Implement conflict detection in synthesis
- [ ] A/B test: v1 vs v2 conflict richness

**Acceptance Criteria**:
```
Given: Security vs Speed decision
When: Standup runs with Daniel + Hefley
Then: Daniel advocates for security (even if unpopular)
And: Hefley advocates for speed (even if insecure)
And: Synthesis documents conflict and resolution

Conflict Richness Scoring:
- v1 (current): 5/10 (implicit disagreement)
- v2 (enhanced): 7-8/10 (explicit conflict, resolution)
```

**Conflict Protocol Per Agent**:

**Daniel**:
- MUST identify all security risks
- Veto authority for CRITICAL (CVSS ≥9.0, CMMC blockers)
- Cannot defer security without explicit user approval

**Hefley**:
- MUST defend business priority and user value
- Can challenge "gold-plating" (over-engineering)
- Must propose phased approach when scope exceeds timeline

**Amy**:
- MUST identify testability concerns
- Can block untestable designs
- Must advocate for quality gates

**Clay**:
- MUST provide realistic timelines (no optimistic estimates)
- Can challenge unrealistic expectations
- Must identify technical debt

**Mary**:
- MUST represent user perspective
- Can challenge features that don't serve primary persona
- Must identify stakeholder communication needs

**Testing**:
- A/B test: 5 complex decisions (auth, prioritization, architecture, compliance, testing)
- Scoring: Conflict richness (0-10), Resolution quality (0-10)
- Success: v2 scores 20-30% higher than v1

---

### Sprint 2: Round Structure & Cross-Talk (Weeks 3-4)

**Goal**: Implement multi-round discussion with enhanced cross-talk

**Stories**:

#### Story 2.1: Round Structure
**Points**: 8
**Priority**: MUST HAVE

**Tasks**:
- [ ] Design round progression logic (Round 1 → 2 → 3)
- [ ] Implement user controls ([C]ontinue, [S]ynthesize, [E]xpand, [X]exit)
- [ ] Add hard cutoffs (max 3 rounds, 10 min, 20k tokens)
- [ ] Update RunStandup workflow with round support

**Acceptance Criteria**:
```
Given: Complex decision requiring multiple rounds
When: Round 1 completes (initial perspectives)
Then: User sees [C]ontinue, [S]ynthesize, [X]exit options

Given: User selects [C]ontinue
When: Round 2 runs
Then: Agents provide reactive perspectives with cross-talk
And: Agents can reference each other ("As Daniel mentioned...")

Given: 3 rounds complete
When: User attempts [C]ontinue
Then: System forces [S]ynthesize (max rounds reached)

Given: 10 minutes elapsed
When: Round in progress
Then: System completes round, forces [S]ynthesize
```

**Round Behavior**:
- **Round 1**: Independent perspectives (no cross-talk)
- **Round 2**: Reactive perspectives (cross-talk encouraged, questions allowed)
- **Round 3**: Final positions (address conflicts, approve/block/defer)

**Testing**:
- Integration test: Full 3-round standup
- User control tests: Each [C]/[S]/[E]/[X] option
- Hard cutoff tests: Max rounds, time, tokens
- Success: All controls work, cutoffs enforced

---

#### Story 2.2: Enhanced Cross-Talk
**Points**: 3
**Priority**: SHOULD HAVE

**Tasks**:
- [ ] Write cross-talk pattern library
- [ ] Update agent instructions for Round 2+
- [ ] Test cross-talk quality (measure references, questions, building)

**Acceptance Criteria**:
```
Given: Round 2 (reactive perspectives)
When: Clay speaks after Daniel
Then: Clay references Daniel's point ("I agree with Daniel's security concern")
And: Clay builds on it ("This affects my timeline - we need +2 days")

Given: Round 2 (reactive perspectives)
When: Amy speaks
Then: Amy asks Daniel a question ("Can you break down those 25 security tests?")
And: Daniel responds within same round (if simple) or next round (if complex)
```

**Cross-Talk Patterns**:
1. **Agreement Building**: "I agree with X's point about Y. This means Z."
2. **Constructive Disagreement**: "I respect X's concern, but I see it differently because..."
3. **Clarifying Questions**: "X, can you clarify what you meant by Y?"
4. **Building on Ideas**: "Building on X's suggestion, what if we..."

**Testing**:
- Manual review: 5 standups × cross-talk quality
- Metrics: References per round, questions asked, ideas built upon
- Success: 5+ cross-talk instances per Round 2, natural flow

---

### Sprint 3: Agent Rotation & Validation (Weeks 5-6)

**Goal**: (Optional) Implement agent rotation, validate all enhancements

**Stories**:

#### Story 3.1: Agent Rotation Logic [OPTIONAL]
**Points**: 5
**Priority**: COULD HAVE

**Tasks**:
- [ ] Design participation tracking (`.claude/skills/Standup/state/participation.yaml`)
- [ ] Implement rotation logic (balance participation over time)
- [ ] Add opt-out configuration (`roster_mode: 'strict_relevance'`)

**Acceptance Criteria**:
```
Given: 10 standups completed
When: Agent selection runs for standup #11
Then: System checks participation rates
And: If 2 agents tied in relevance, picks lower participation rate

Given: Daniel hasn't participated in 5+ standups
When: Security-related question asked
Then: System suggests Daniel inclusion (if relevant)

Given: User sets `roster_mode: 'strict_relevance'`
When: Agent selection runs
Then: Rotation disabled, only relevance matters
```

**Participation Tracking**:
```yaml
# .claude/skills/Standup/state/participation.yaml
agents:
  Daniel:
    total_standups: 12
    last_participated: 2025-12-04
    participation_rate: 0.60  # 12/20 standups
```

**Testing**:
- Simulation: 20 standups × participation tracking
- Success: Participation rates within 10% of each other

**Decision**: Defer to Release 0.2.0 if time-constrained

---

#### Story 3.2: A/B Quality Validation
**Points**: 8
**Priority**: MUST HAVE

**Tasks**:
- [ ] Select 5 complex decisions for A/B testing
- [ ] Run each through v1 (current) and v2 (enhanced)
- [ ] Score outputs (conflict richness, completeness, relevance, clarity)
- [ ] Compare scores, document improvement

**Test Decisions**:
1. **Authentication architecture** (security-heavy)
2. **MVP feature prioritization** (product-heavy)
3. **Test strategy for critical module** (QA-heavy)
4. **Timeline estimation for complex epic** (planning-heavy)
5. **CMMC compliance gap analysis** (compliance-heavy)

**Scoring Rubric** (0-10 each):
- **Conflict Richness**: Explicit disagreements, resolution quality
- **Recommendation Completeness**: All perspectives addressed, actionable items
- **Agent Relevance**: Right experts involved, unnecessary agents excluded
- **Decision Clarity**: Clear decision, documented rationale, success criteria

**Acceptance Criteria**:
```
Given: 5 complex decisions
When: Scored on v1 vs v2
Then: v2 scores 20-30% higher on average
And: No regression in issues found (maintain 3.67x)
```

**Testing**:
- Manual: Run each decision through v1 and v2
- Scoring: 4 dimensions × 5 decisions = 20 data points per version
- Analysis: Statistical comparison (mean, std dev, t-test)
- Success: v2 improvement statistically significant (p < 0.05)

---

#### Story 3.3: Docker Integration Testing
**Points**: 5
**Priority**: MUST HAVE

**Tasks**:
- [ ] Create Docker test environment (Ubuntu 22.04 LTS)
- [ ] Write test scripts (setup, invoke standup, validate)
- [ ] Test on macOS, Linux, Windows WSL
- [ ] Document cross-platform issues and fixes

**Test Scenario**:
```bash
# 1. Spin up Docker container
docker run -it ubuntu:22.04 /bin/bash

# 2. Clone PAI fork
git clone -b feature/collaboration-v2 https://github.com/banjoey/Personal_AI_Infrastructure.git
cd Personal_AI_Infrastructure

# 3. Run setup
./.claude/setup.sh

# 4. Test standup
# (Claude Code invocation with test question)

# 5. Verify
# - Agent selection works (correct agents chosen)
# - Rounds progress (user controls function)
# - Output quality meets criteria (conflicts, completeness)

# 6. Tear down
exit
docker rm <container_id>
```

**Acceptance Criteria**:
```
Given: Clean Docker container (Ubuntu 22.04)
When: Setup and standup complete
Then: Agent selection selects correct agents
And: Round structure works (user controls functional)
And: Output quality meets v2 targets
And: No errors on macOS, Linux, Windows WSL
```

**Cross-Platform Validation**:
- macOS: Development primary (Apple Silicon M2)
- Linux: Ubuntu 22.04 LTS (production servers)
- Windows: WSL2 Ubuntu (team members)

**Testing**:
- Docker scripts: `tests/docker/test-standup-v2.sh`
- Run on all 3 platforms
- Success: All tests pass on all platforms

---

## Testing Strategy

### Test Pyramid

```
        /\
       /E2E\        Docker Integration (5 tests)
      /------\
     /  Integ \     A/B Quality, Round Structure (13 tests)
    /----------\
   /   Unit     \   Agent Selection, Conflict Detection (41 tests)
  /--------------\
```

**Total Tests**: 59
- Unit: 41 (agent selection, conflict detection, rotation logic)
- Integration: 13 (round structure, cross-talk, user controls)
- E2E: 5 (A/B quality, Docker integration)

**Coverage Target**: 80%+ function coverage

---

### A/B Testing Framework

**Objective**: Measure output quality improvement (v1 vs v2)

**Method**:
1. Select 5 complex decisions (diverse domains)
2. Run each through v1 (current standup)
3. Run each through v2 (enhanced standup)
4. Score outputs on 4 dimensions (0-10 each)
5. Compare scores statistically

**Scoring Dimensions**:
1. **Conflict Richness**: Explicit disagreements, resolution quality
2. **Recommendation Completeness**: All perspectives, actionable items
3. **Agent Relevance**: Right experts, no unnecessary agents
4. **Decision Clarity**: Clear decision, rationale, success criteria

**Success Criteria**:
- v2 average score: 20-30% higher than v1
- Statistical significance: p < 0.05 (t-test)
- No regression: Issues found ≥3.67x (maintain)

**Test Decisions**:
| Decision | Domain | Primary Agents (v2) |
|----------|--------|---------------------|
| Authentication architecture | Security | Daniel, Clay, Amy |
| MVP feature prioritization | Product | Hefley, Mary, Clay |
| Test strategy (critical module) | QA | Amy, Daniel, Clay |
| Timeline estimation (complex epic) | Planning | Clay, Hefley, Amy |
| CMMC compliance gap analysis | Compliance | Daniel, Amy, Clay |

---

### Docker Testing

**Objective**: Validate cross-platform compatibility and installation

**Platforms**:
- macOS (Apple Silicon M2)
- Linux (Ubuntu 22.04 LTS)
- Windows (WSL2 Ubuntu)

**Test Script**:
```bash
#!/bin/bash
# tests/docker/test-standup-v2.sh

set -e  # Exit on error

echo "=== Standup V2 Docker Integration Test ==="

# 1. Clone repo
git clone -b feature/collaboration-v2 \
  https://github.com/banjoey/Personal_AI_Infrastructure.git pai-test
cd pai-test

# 2. Run setup
./.claude/setup.sh --non-interactive

# 3. Test agent selection
echo "Testing agent selection..."
# (Test logic here - verify correct agents selected for domains)

# 4. Test round structure
echo "Testing round structure..."
# (Test logic here - verify rounds progress, user controls work)

# 5. Test cross-talk
echo "Testing cross-talk..."
# (Test logic here - verify agents reference each other in Round 2+)

# 6. Validate output quality
echo "Validating output quality..."
# (Test logic here - verify conflicts, completeness, clarity)

echo "✅ All tests passed!"
```

**Success Criteria**:
- All tests pass on all 3 platforms
- No platform-specific errors
- Installation completes in <5 minutes
- Standup runs without errors

---

## Git Branch Strategy

### Branch Structure

```
main (PAI upstream tracking)
  └── feature/collaboration (Release 0.1.0) ✅ Complete
        └── feature/collaboration-v2 (Release 0.1.1) 🚧 In Progress
              ├── dev/agent-selection (Story 1.1)
              ├── dev/conflict-protocols (Story 1.2)
              ├── dev/round-structure (Story 2.1)
              ├── dev/cross-talk (Story 2.2)
              ├── dev/agent-rotation (Story 3.1) [OPTIONAL]
              └── dev/validation (Story 3.2-3.3)
```

### Workflow

**Development**:
1. Create feature branch from `feature/collaboration`
   ```bash
   git checkout feature/collaboration
   git pull origin feature/collaboration
   git checkout -b feature/collaboration-v2
   ```

2. Create dev branches for each story
   ```bash
   git checkout -b dev/agent-selection
   # Work on Story 1.1
   git commit -m "feat: implement agent selection algorithm"
   ```

3. Merge dev branch to feature branch
   ```bash
   git checkout feature/collaboration-v2
   git merge dev/agent-selection
   git push origin feature/collaboration-v2
   ```

4. After all stories complete, merge to forge-all
   ```bash
   git checkout forge-all
   git merge feature/collaboration-v2
   git push origin forge-all
   ```

**Testing**:
- Test in Docker after each story merge
- Full regression test before merging to forge-all

**Upstream PR** (Future):
- After baking in production (3+ months)
- Create PR: `feature/collaboration-v2` → `danielmiessler/PAI:main`

---

## Dependencies

### External
- PAI fork: `banjoey/Personal_AI_Infrastructure`
- Parent branch: `feature/collaboration` (Release 0.1.0)
- Docker: For cross-platform testing

### Internal
- Standup skill (Release 0.1.0)
- Agent personas: Daniel, Mary, Clay, Hefley, Amy
- Project context: `.docs/project-context.md`

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Agent selection misses relevant expert | High | Medium | Manual override, fallback to full team |
| Conflict protocols feel "forced" | Medium | Medium | A/B testing, tune wording based on results |
| Round structure adds friction | Medium | Low | Default to 1 round, user opts into more |
| Token usage increases | Low | Medium | Agent selection reduces tokens (2-3 vs 5) |
| Cross-platform compatibility issues | High | Low | Test on all 3 platforms, POSIX-compliant bash |
| Time constraints (6 weeks aggressive) | Medium | Medium | Defer Story 3.1 (agent rotation) if needed |

---

## Rollout Plan

### Phase 1: Development (Weeks 1-6)
- Implement all stories (Sprints 1-3)
- Test in Docker continuously
- Dogfood on FORGE project decisions

### Phase 2: Internal Validation (Week 7)
- Run A/B quality tests (5 decisions)
- Gather team feedback
- Fix high-priority bugs

### Phase 3: Production Deployment (Week 8)
- Merge to `forge-all`
- Update documentation
- Announce Release 0.1.1

### Phase 4: Community Feedback (Weeks 9-12)
- Gather user feedback
- Iterate based on issues
- Plan Release 0.2.0 enhancements

---

## Future Enhancements (Release 0.2.0+)

**Deferred Features**:
1. Agent rotation logic (Story 3.1) - if time-constrained
2. Voice/TTS integration (BMAD-style)
3. Historical decision search
4. Auto-roster detection (AI suggests agents)
5. Configurable affirmation levels (Supportive/Professional/Direct)

**Estimated**: 20 story points, 3-4 weeks

---

## Related Documentation

- [Technical Spec: Standup V2](../specs/SPEC-STANDUP-V2.md)
- [Standup Methodology v1](../../.claude/skills/Standup/METHODOLOGY.md)
- [Epic 003 Multi-Agent Review](../validation/epic-003-review.md) (3.67x validation)
- [BMAD Party Mode Reference](https://github.com/curiousest/BMAD-METHOD/tree/main/src/core/workflows/party-mode)

---

## Story Point Summary

| Sprint | Stories | Points | Weeks |
|--------|---------|--------|-------|
| Sprint 1 | Agent Selection, Conflict Protocols | 10 | 2 |
| Sprint 2 | Round Structure, Cross-Talk | 11 | 2 |
| Sprint 3 | Agent Rotation (opt), Validation | 18 | 2 |
| **Total** | **6 stories** | **39 points** | **6 weeks** |

**Velocity Assumption**: 6-7 points/week (solo developer, part-time)

---

**Epic Owner**: FORGE Development Team
**Created**: 2025-12-04
**Target Completion**: 2026-01-15 (6 weeks from start)
**Release**: 0.1.1
