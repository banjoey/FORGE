# Technical Specification: Standup V2 Enhancements

**Version**: 2.0
**Status**: Draft
**Created**: 2025-12-04
**Author**: FORGE Development Team

---

## Executive Summary

This specification defines enhancements to FORGE's Standup skill (Release 0.1.0) based on learnings from BMAD-METHOD's party mode implementation. The goal is to improve output quality through intelligent agent selection, explicit conflict protocols, and round-based structure while maintaining the proven 3.67x issue detection advantage of multi-agent roleplay.

**Key Enhancement Areas**:
1. Intelligent agent selection (2-3 agents per round vs all 5)
2. Explicit conflict protocols (force genuine disagreement)
3. Round structure with user-controlled depth
4. Enhanced cross-talk instructions
5. Agent rotation logic for long conversations

**Expected Outcome**: 20-30% quality improvement in complex decisions, measured by conflict richness and recommendation completeness.

---

## Current State Analysis

### Current Implementation (Release 0.1.0)

**Architecture**: Single-context roleplay
- I (Claude) generate all agent responses in one conversation thread
- All 5 agents respond to every standup question
- Simple sequential format (Mary → Clay → Daniel → Hefley → Amy)
- Basic synthesis at end

**Strengths** (Validated):
- 3.67x more issues found vs solo mode
- Fast (one context window)
- Cheap (single conversation)
- Emergent synthesis (I see all perspectives simultaneously)

**Weaknesses** (Identified):
- All 5 agents respond even when only 2-3 are relevant
- No explicit conflict protocols (unconscious harmonization risk)
- One-shot responses (no iterative deepening)
- Limited cross-talk guidance
- Agent participation not tracked/balanced

---

## Requirements

### Functional Requirements

#### FR-1: Intelligent Agent Selection
**Priority**: MUST HAVE

**Description**: Automatically select 2-3 most relevant agents per question based on domain analysis.

**Behavior**:
```
Input: "Review this authentication design"
Analysis: Authentication → Security + Implementation + Testing critical
Output: Selected agents: Daniel (Security), Clay (Tech Lead), Amy (QA)
Excluded: Mary (BA), Hefley (PM) - less critical for implementation review
```

**Selection Logic**:
1. Parse question/context for domain keywords
2. Match keywords to agent expertise
3. Rank agents by relevance
4. Select top 2-3 agents
5. Allow manual override

**Domain Mapping**:
| Domain Keywords | Primary Agents | Secondary Agents |
|-----------------|----------------|------------------|
| auth*, security, vuln* | Daniel, Amy | Clay |
| UX, user, experience, design | Mary, Amy | Daniel |
| timeline, estimate, capacity | Clay, Hefley | Amy |
| priority, MVP, scope | Hefley, Mary | Clay |
| test*, quality, coverage | Amy, Clay | Daniel |
| architecture, design, system | Clay, Hefley | Daniel, Amy |
| compliance, CMMC, regulatory | Daniel, Amy | Clay |

**Edge Cases**:
- If no clear match → Full team (all 5 agents)
- If user specifies roster → Override auto-selection
- If question has multiple domains → Select 3 agents (broader coverage)

---

#### FR-2: Explicit Conflict Protocols
**Priority**: MUST HAVE

**Description**: Force authentic disagreement through explicit role instructions.

**Behavior**:
```
Security vs Speed Conflict:
- Daniel: "I must advocate for security even if unpopular"
- Hefley: "I must defend business priority even if it delays security"
- Result: Genuine tension surfaces trade-offs
```

**Conflict Protocols by Agent**:

**Daniel (Security Engineer)**:
- MUST identify all security risks (no "acceptable risk" without explicit user approval)
- Veto authority for CRITICAL vulnerabilities (CVSS ≥9.0 or CMMC compliance blockers)
- Cannot defer security for speed without documenting rationale

**Hefley (Product Manager)**:
- MUST defend business priority and user value
- Can challenge "gold-plating" (over-engineering for theoretical scenarios)
- Must propose phased approach when full scope exceeds timeline

**Amy (QA Lead)**:
- MUST identify testability concerns
- Can block untestable designs
- Must advocate for quality gates even if it slows development

**Clay (Tech Lead)**:
- MUST provide realistic timelines (no optimistic estimates)
- Can challenge unrealistic expectations
- Must identify technical debt and complexity

**Mary (Business Analyst)**:
- MUST represent user perspective
- Can challenge features that don't serve primary persona
- Must identify stakeholder communication needs

**Synthesis Rules**:
- Veto must be addressed (not overridden) before approval
- Conflicts documented in decision record
- Phased approach preferred over "winner takes all"

---

#### FR-3: Round-Based Structure
**Priority**: MUST HAVE

**Description**: Implement multi-round discussion with user control.

**Round Structure**:

**Round 1: Initial Perspectives**
- 2-3 agents provide initial perspective
- No cross-references (independent thinking)
- ~200-300 words per agent
- Duration: 2-3 minutes

**Round 2: Reactive Perspectives** (Optional, user-triggered)
- Agents respond to each other's points
- Cross-references encouraged ("As Daniel mentioned...")
- Can ask questions to other agents
- Duration: 2-3 minutes

**Round 3: Final Positions** (Optional, user-triggered)
- Agents provide final recommendation
- Must address conflicts raised
- Clear approve/block/defer stance
- Duration: 1-2 minutes

**User Controls**:
- `[C] Continue` - Proceed to next round
- `[S] Synthesize` - End discussion, synthesize decision
- `[E] Expand` - Add more agents to discussion
- `[X] Exit` - Abort standup

**Hard Limits**:
- Max 3 rounds (prevent endless discussion)
- Max 10 minutes per standup
- Max 20k tokens per standup (context management)

---

#### FR-4: Enhanced Cross-Talk
**Priority**: SHOULD HAVE

**Description**: Explicit instructions for agent-to-agent interaction.

**Cross-Talk Patterns**:

**Agreement Building**:
```
Clay: "I agree with Daniel's concern about SQL injection.
       This affects my timeline estimate - we need +2 days for parameterized queries."
```

**Constructive Disagreement**:
```
Hefley: "I respect Daniel's security concern, but I have a different view on priority.
         Our primary persona (solo developers) values speed over enterprise-grade auth.
         Can we ship basic auth now, add OAuth2 when enterprise users request it?"
```

**Clarifying Questions**:
```
Amy: "Daniel, you mentioned 25 security tests. Can you break that down?
      Are those integration tests or unit tests? This affects my capacity estimate."
```

**Building on Ideas**:
```
Mary: "Building on Hefley's phased approach, what if we add a feature flag?
       Ship OAuth2 in code but disabled, enable when we have 10 enterprise signups."
```

**Round-Specific Guidance**:
- Round 1: No cross-talk (independent perspectives)
- Round 2: Encourage cross-talk (reactive perspectives)
- Round 3: Cross-talk for consensus building only

---

#### FR-5: Agent Rotation Logic
**Priority**: COULD HAVE

**Description**: Track agent participation over time, ensure balanced engagement.

**Tracking Mechanism**:
```yaml
# .claude/skills/Standup/state/participation.yaml
agents:
  Daniel:
    total_standups: 12
    last_participated: 2025-12-04
    participation_rate: 0.60  # 12/20 standups
  Clay:
    total_standups: 18
    last_participated: 2025-12-04
    participation_rate: 0.90  # 18/20 standups
  Hefley:
    total_standups: 15
    last_participated: 2025-12-03
    participation_rate: 0.75  # 15/20 standups
```

**Rotation Rules**:
- If 2 agents tied in relevance → Pick agent with lower participation_rate
- If agent hasn't participated in 5+ standups → Suggest inclusion (if relevant)
- Reset participation counter every 50 standups (prevent staleness)

**Opt-Out**:
- User can disable rotation: `roster_mode: 'strict_relevance'`
- Default: `roster_mode: 'balanced_rotation'`

---

### Non-Functional Requirements

#### NFR-1: Cross-Platform Compatibility
**Priority**: MUST HAVE

- macOS (development primary)
- Linux (production servers)
- Windows via WSL (team members)

**Implementation**:
- Use POSIX-compliant bash (no `[[` or `$(())`)
- File paths use `/` (not `\`)
- Line endings: LF (not CRLF)
- Stat commands: Use portable flags (no `-f` macOS-only)

---

#### NFR-2: Performance
**Priority**: SHOULD HAVE

**Target Metrics**:
- Round 1 completion: ≤3 minutes
- Full standup (3 rounds): ≤10 minutes
- Token usage per standup: ≤20k tokens
- Context pollution: ≤30% of my available context window

**Optimization Strategies**:
- Agent selection reduces token usage (2-3 agents vs 5)
- Round structure prevents one-shot bloat
- Hard cutoffs prevent runaway discussions

---

#### NFR-3: Testability
**Priority**: MUST HAVE

**Test Strategy**:
1. **A/B Quality Tests**: Compare v1 vs v2 output quality on same question
2. **Agent Selection Tests**: Verify correct agents selected for domain
3. **Conflict Tests**: Verify conflicts surface (not harmonized away)
4. **Round Tests**: Verify round progression and user controls
5. **Docker Integration Tests**: Full standup in clean container

**Success Metrics**:
- Output quality improvement: 20-30% (measured by conflict richness, recommendation completeness)
- Agent selection accuracy: 90%+ (correct agents for domain)
- Conflict detection: 3+ conflicts per complex decision
- User satisfaction: Qualitative feedback

---

## Architecture

### Component Diagram

```
RunStandup Workflow (Enhanced)
├── Step 1: Load Project Context (unchanged)
├── Step 2: Analyze Question Domain (NEW)
│   ├── Parse keywords
│   ├── Match to agent expertise
│   ├── Select 2-3 agents
│   └── Present roster to user
├── Step 3: Round 1 - Initial Perspectives (ENHANCED)
│   ├── Each selected agent speaks
│   ├── Apply conflict protocols
│   └── No cross-talk (independent thinking)
├── Step 4: User Decision Point (NEW)
│   ├── [C] Continue to Round 2
│   ├── [S] Synthesize now
│   ├── [E] Expand roster
│   └── [X] Exit
├── Step 5: Round 2 - Reactive Perspectives (NEW)
│   ├── Agents respond to each other
│   ├── Cross-talk encouraged
│   └── Clarifying questions allowed
├── Step 6: User Decision Point (NEW)
│   ├── [C] Continue to Round 3
│   ├── [S] Synthesize now
│   └── [X] Exit
├── Step 7: Round 3 - Final Positions (NEW)
│   ├── Final recommendations
│   ├── Address all conflicts
│   └── Clear approve/block/defer
├── Step 8: Synthesize Decision (ENHANCED)
│   ├── Consensus or dissent
│   ├── Document conflicts
│   └── Actionable recommendations
└── Step 9: Update Project Context (unchanged)
```

---

### Data Models

#### Agent Expertise Profile
```typescript
interface AgentExpertise {
  name: string;
  role: string;
  domains: string[];  // Keywords for domain matching
  vetoPower: boolean;  // Can block decisions?
  conflictStyle: 'advocate' | 'neutral' | 'devil-advocate';
  participationRate: number;  // 0.0 - 1.0
  lastParticipated: Date;
}
```

#### Standup Session State
```typescript
interface StandupSession {
  question: string;
  domain: string[];  // Detected domains
  selectedAgents: string[];  // 2-3 agent names
  currentRound: 1 | 2 | 3;
  conflictsDetected: Conflict[];
  userControls: 'continue' | 'synthesize' | 'expand' | 'exit';
  tokenUsage: number;
  startTime: Date;
}
```

#### Conflict Record
```typescript
interface Conflict {
  agent1: string;
  agent2: string;
  issue: string;
  agent1Position: string;
  agent2Position: string;
  resolved: boolean;
  resolution?: string;
}
```

---

## Implementation Plan

### Phase 1: Agent Selection (Sprint 1, Week 1)
**Story Points**: 5

**Tasks**:
1. Create domain keyword mapping (1 pt)
2. Implement agent selection algorithm (2 pts)
3. Add user override capability (1 pt)
4. Test agent selection accuracy (1 pt)

**Deliverables**:
- `workflows/lib/agent-selection.ts`
- `workflows/lib/domain-mapping.yaml`
- Unit tests for selection logic

---

### Phase 2: Conflict Protocols (Sprint 1, Week 2)
**Story Points**: 5

**Tasks**:
1. Define conflict instructions per agent (2 pts)
2. Update agent persona files with protocols (1 pt)
3. Implement conflict detection in synthesis (1 pt)
4. Test conflict emergence (1 pt)

**Deliverables**:
- Updated `.claude/agents/*/agent.md` files
- `workflows/lib/conflict-detector.ts`
- A/B test comparing v1 vs v2 conflict richness

---

### Phase 3: Round Structure (Sprint 2, Week 3)
**Story Points**: 8

**Tasks**:
1. Design round progression logic (2 pts)
2. Implement user controls ([C]/[S]/[E]/[X]) (3 pts)
3. Add hard cutoffs (max rounds, time, tokens) (1 pt)
4. Update RunStandup workflow with rounds (2 pts)

**Deliverables**:
- `workflows/RunStandup-v2.md`
- Round state management
- User control tests

---

### Phase 4: Cross-Talk Enhancement (Sprint 2, Week 4)
**Story Points**: 3

**Tasks**:
1. Write cross-talk pattern library (1 pt)
2. Update agent instructions for Round 2 (1 pt)
3. Test cross-talk quality (1 pt)

**Deliverables**:
- `workflows/lib/cross-talk-patterns.md`
- Updated agent instructions
- Cross-talk quality tests

---

### Phase 5: Agent Rotation (Sprint 3, Week 5) [OPTIONAL]
**Story Points**: 5

**Tasks**:
1. Design participation tracking (2 pts)
2. Implement rotation logic (2 pts)
3. Add opt-out configuration (1 pt)

**Deliverables**:
- `state/participation.yaml`
- Rotation algorithm
- Configuration options

---

### Phase 6: Testing & Validation (Sprint 3, Week 6)
**Story Points**: 8

**Tasks**:
1. A/B quality tests (v1 vs v2) (3 pts)
2. Docker integration tests (2 pts)
3. Cross-platform validation (macOS, Linux, WSL) (2 pts)
4. Documentation updates (1 pt)

**Deliverables**:
- Test suite: `tests/standup-v2-suite.test.ts`
- A/B test results report
- Docker test scripts
- Updated documentation

---

## Testing Strategy

### Test Levels

#### Unit Tests
**Coverage Target**: 80%+

**Test Cases**:
- Agent selection algorithm (10 tests)
- Domain keyword matching (8 tests)
- Conflict detection logic (12 tests)
- Round progression (6 tests)
- User control handling (5 tests)

**Tools**: Jest, TypeScript

---

#### Integration Tests
**Coverage Target**: Key workflows

**Test Cases**:
- Full standup with intelligent selection (3 rounds)
- Conflict emergence and resolution
- Round progression with user controls
- Agent rotation over multiple standups
- Cross-platform compatibility

**Tools**: Jest, Docker

---

#### A/B Quality Tests
**Goal**: Measure output quality improvement

**Method**:
1. Select 5 complex decisions
2. Run each through v1 (current) and v2 (enhanced)
3. Score outputs on:
   - Conflict richness (0-10)
   - Recommendation completeness (0-10)
   - Agent relevance (0-10)
   - Decision clarity (0-10)

**Success Criteria**: v2 scores 20-30% higher than v1

**Decisions to Test**:
1. Authentication architecture (security-heavy)
2. MVP feature prioritization (product-heavy)
3. Test strategy for critical module (QA-heavy)
4. Timeline estimation for complex epic (planning-heavy)
5. CMMC compliance gap analysis (compliance-heavy)

---

#### Docker Integration Tests

**Test Scenario**: Full standup in clean container

**Steps**:
1. Spin up Docker container (Ubuntu 22.04 LTS)
2. Clone PAI fork (forge-all branch)
3. Run setup.sh
4. Invoke Standup skill with test question
5. Verify:
   - Agent selection works
   - Rounds progress correctly
   - User controls function
   - Output quality meets criteria
6. Tear down container

**Tools**: Docker, Bash, GitHub Actions (CI/CD)

---

## Success Metrics

### Quantitative Metrics

| Metric | Current (v1) | Target (v2) | Measurement Method |
|--------|-------------|-------------|-------------------|
| Issues found multiplier | 3.67x | 3.67x+ | A/B test vs solo mode |
| Conflict richness | 5/10 | 7-8/10 | A/B quality scoring |
| Recommendation completeness | 6/10 | 8-9/10 | A/B quality scoring |
| Agent relevance | 60% | 90%+ | Selection accuracy tests |
| Token usage per standup | 15k | 10-12k | Token tracking |
| Standup completion time | 5 min | 3-10 min (depending on rounds) | Timer |

---

### Qualitative Metrics

**User Satisfaction**:
- Agents feel more "authentic" (genuine disagreement)
- Decisions feel more "thorough" (iterative rounds)
- Recommendations feel more "actionable" (clearer conflicts)

**Measurement**: User feedback surveys, dogfooding notes

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Agent selection misses relevant expert | High | Medium | Manual override option, fallback to full team |
| Conflict protocols feel "forced" | Medium | Medium | A/B testing, tune instruction wording |
| Round structure adds friction | Medium | Low | Default to 1 round, user opts into more |
| Token usage increases | Low | Medium | Agent selection reduces token usage (2-3 vs 5) |
| Cross-platform issues | High | Low | Test on all 3 platforms, use POSIX-compliant bash |

---

## Migration Path

### Backward Compatibility

**v1 Behavior** (if user wants it):
- Set `standup_mode: 'classic'` in settings
- All 5 agents respond
- No rounds (one-shot)
- No intelligent selection

**v2 Behavior** (default):
- Intelligent agent selection
- Round structure with user controls
- Conflict protocols enabled

**Migration Steps**:
1. Deploy v2 alongside v1 (both workflows available)
2. Dogfood v2 for 2 weeks
3. Gather user feedback
4. Make v2 default, deprecate v1
5. Remove v1 after 1 release cycle (Release 0.2.0)

---

## Open Questions

1. **Should agent rotation be in Release 0.1.1 or defer to 0.2.0?**
   - Leaning: Defer to 0.2.0 (COULD HAVE, not MUST HAVE)

2. **What's the optimal number of agents per round?**
   - Current thinking: 2-3
   - Need to validate with A/B testing

3. **Should we add voice/TTS like BMAD?**
   - Leaning: Defer to Release 0.3.0 (customization phase)

4. **How do we measure "conflict richness" objectively?**
   - Proposed: Count explicit disagreements, measure resolution quality

---

## References

- [BMAD-METHOD Party Mode](https://github.com/curiousest/BMAD-METHOD/tree/main/src/core/workflows/party-mode)
- [Standup Methodology v1](../../.claude/skills/Standup/METHODOLOGY.md)
- [Epic 003 Multi-Agent Review](../validation/epic-003-review.md) (3.67x validation)

---

**Spec Version**: 2.0 Draft
**Last Updated**: 2025-12-04
**Next Review**: After Sprint 1 completion (Week 2)
