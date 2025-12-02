# FORGE Release 0.1 - Standup MVP

**Status**: Planning (Revised Scope)
**Goal**: Prove standup multi-agent conversation value
**Timeline**: 8-10 weeks (60 story points)
**Owner**: @banjoey
**Created**: 2025-12-02
**Revised**: 2025-12-02 (based on multi-agent review feedback)

---

## Executive Summary

**Original Release 0.1**: 131 points, 4-6 months, 3 skills + 5 agents + full standup
**Revised MVP**: 60 points, 8-10 weeks, 1 skill + 3 agents + core standup

### Why Reduce Scope?

Based on comprehensive multi-agent review:

1. **Faster Validation**: Test standup hypothesis in 2 months vs. 4-6 months
2. **Reduced Risk**: Smaller investment if standup doesn't work as expected
3. **User Feedback Loop**: Get real feedback sooner
4. **Realistic Timeline**: Achievable for solo developer
5. **Focus**: Prove core innovation (standup) before building everything

### Core Hypothesis to Validate

> "Multi-agent standup conversations produce measurably better outcomes than solo mode in equivalent time"

**Success Metric**: Standup finds 2-3x more issues than solo mode for same decision (validated across 10 A/B tests)

---

## MVP Scope

### What's IN Release 0.1 MVP

**EPIC-001 Partial: AgilePm Skill Only (26 points)**
- Story 1.1: PRD Creation (8 pts)
- Story 1.2: Epic Decomposition (5 pts)
- Story 1.3: User Story Generation (8 pts)
- Story 1.4: Sprint Planning (5 pts)

**EPIC-002 Partial: 3 Core Agents (13 points)**
- Story 2.1: Product Manager Agent (John) (5 pts)
- Story 2.2: Security Engineer Agent (Sam) (5 pts)
- **Implied**: Architect Agent (Winston) - already exists in PAI (3 pts estimated)

**EPIC-003 Partial: Core Standup Orchestration (21 points)**
- Story 3.1: Standup Activation (5 pts)
- Story 3.2: Intelligent Agent Selection (5 pts)
- Story 3.3: Turn-Based Conversation (8 pts)
- Story 3.7: Exit & Synthesis (3 pts)

**Total**: 60 story points = 8-10 weeks for solo developer

### What's DEFERRED to Release 0.2

**EPIC-001 Remaining: Security & TestArchitect Skills (29 points)**
- Stories 1.5-1.8: Security skill (all CMMC/threat modeling workflows)
- Stories 1.9-1.11: TestArchitect skill (all testing workflows)

**EPIC-002 Remaining: 2 Additional Agents (6 points)**
- Story 2.3: Scrum Master Agent (Bob) (3 pts)
- Story 2.5: Business Analyst Agent (Mary) (3 pts)
- Story 2.4: Test Architect Agent (Murat) (5 pts) - deferred to 0.2

**EPIC-003 Remaining: Advanced Standup Features (13 points)**
- Story 3.4: Transparent Coordination (5 pts)
- Story 3.5: Interactive vs. Autonomous Mode Detection (5 pts)
- Story 3.6: Agent Cross-Referencing (3 pts)

**EPIC-004: ALL Customization (21 points)**
- All 6 stories deferred to Release 0.3

**Total Deferred**: 69 points

---

## Sprint Breakdown

### Sprint 1-2 (Weeks 1-4): AgilePm Skill Foundation

**Goal**: Build one complete, PAI-compliant skill
**Story Points**: 26 points

**Stories**:
- 1.1: PRD Creation (8 pts)
- 1.2: Epic Decomposition (5 pts)
- 1.3: User Story Generation (8 pts)
- 1.4: Sprint Planning (5 pts)

**Deliverables**:
- AgilePm/ skill directory (TitleCase, USE WHEN, Examples)
- 4 workflows: CreatePrd, CreateEpics, CreateStories, SprintPlanning
- Templates: PRD, epic, story, sprint-status.yaml
- Knowledge base: story patterns, epic sizing
- **Test with real project**: Create this project's own PRD using the skill

**Success Criteria**:
- Skill activates correctly with `Skill("AgilePm")`
- Generates PRD in <5 minutes
- PRD includes: exec summary, architecture, features, checklist
- Epics group features by user value
- Stories have testable acceptance criteria

---

### Sprint 3 (Weeks 5-6): Agent Personalities

**Goal**: Create 3 distinct agent personalities
**Story Points**: 13 points

**Stories**:
- 2.1: Product Manager Agent (John) (5 pts)
- 2.2: Security Engineer Agent (Sam) (5 pts)
- Architect Agent validation (Winston) (3 pts - existing, just validate)

**Deliverables**:
- pm.md agent file with distinct personality
- Security.md agent file with distinct personality
- Each agent references appropriate skills (PM → AgilePm, Security → existing research)
- Voice configurations (if using PAI voice system)

**Critical Validation** (Go/No-Go for Sprint 4):
- **Blind Test**: External users identify agents by personality alone (>80% accuracy)
- **Behavioral Check**: PM asks "WHY" in >80% of discussions
- **Distinct Voices**: Agents don't sound like same person

**If Validation Fails**: Refine personalities before proceeding to standup orchestration

---

### Sprint 4-5 (Weeks 7-10): Core Standup Orchestration

**Goal**: Enable multi-agent conversation
**Story Points**: 21 points

**Stories**:
- 3.1: Standup Activation (5 pts)
- 3.2: Intelligent Agent Selection (5 pts)
- 3.3: Turn-Based Conversation (8 pts)
- 3.7: Exit & Synthesis (3 pts)

**Deliverables**:
- Standup/ skill directory
- Activation workflow: User triggers "standup: [topic]"
- Agent selection: Keywords → relevant agents (PM+Architect+Security)
- Turn-based orchestration: One agent speaks at a time
- Synthesis: Decision summary with rationale, consensus, next actions

**Prototype Approach**:
- Week 7: 2-agent conversation (PM + Architect)
- Week 8: Add 3rd agent (Security)
- Week 9: Full orchestration with synthesis
- Week 10: Polish and validation testing

**Success Criteria**:
- User can invoke standup with topic
- System selects appropriate agents (2-3 per topic)
- Agents converse naturally (not round-robin)
- Conversation concludes with actionable synthesis
- Synthesis document saved to project context

---

## Validation Strategy

### Validation Gate 1 (Week 2): Skill Quality

**Test**: Create real PRD for FORGE project using AgilePm skill

**Success Criteria**:
- PRD generation <5 minutes
- PRD includes all required sections
- PRD is actionable (could hand to developer)
- Peer review: PRD scores ≥8/10 on quality rubric

**Go/No-Go**: If skill doesn't work well, fix before proceeding

---

### Validation Gate 2 (Week 6): Personality Distinctiveness

**Test**: Blind personality identification

**Method**:
1. Generate 10 conversation snippets (randomize PM/Architect/Security)
2. External reviewers identify which agent spoke (no names shown)
3. Measure accuracy

**Success Criteria**:
- Identification accuracy >80%
- PM distinctly challenges business value
- Security distinctly thinks adversarially
- Architect distinctly prefers boring tech

**Go/No-Go**: If agents sound too similar, refine personalities before standup

---

### Validation Gate 3 (Week 8): Standup A/B Testing

**Test**: Solo vs. Standup for same decision

**Method**:
1. Select 5 design decisions
2. Make decision in solo mode (record: issues found, time taken)
3. Make SAME decision in standup (record: issues found, time taken)
4. Compare outcomes

**Success Criteria**:
- Standup finds ≥2x more issues than solo
- Standup time ≤2x solo time
- Standup decisions pass peer review at higher rate

**Example Decision**: "Design authentication system for CMMC app"

**Measurements**:
- Issues identified (security gaps, edge cases, UX concerns)
- Time taken (minutes)
- Decision quality (peer review score 1-10)

---

### Validation Gate 4 (Week 10): End-to-End MVP Test

**Test**: Complete workflow on real project

**Scenario**:
1. User: "standup: Design file upload feature for Project X"
2. System activates: PM, Architect, Security
3. Agents discuss:
   - PM: Business requirements, user value
   - Architect: Technical approach, scalability
   - Security: CMMC compliance, threat model
4. Synthesis generated with recommendations
5. User implements based on synthesis

**Success Criteria**:
- Standup completes successfully (no crashes)
- Synthesis is actionable
- Implementation based on synthesis is successful
- User reports: "Standup was valuable" (survey >4/5)

---

## Success Metrics (MVP)

### Quantitative

- [x] AgilePm skill created and functional
- [ ] 3 agents created with distinct personalities
- [ ] Standup activates in <5 seconds
- [ ] Agents selected intelligently (>80% accuracy for topic)
- [ ] Conversation quality: 3-5 agent turns per decision
- [ ] Synthesis generated in <30 seconds
- [ ] **CRITICAL**: Standup finds ≥2x issues vs. solo (10 A/B tests)
- [ ] **CRITICAL**: Standup time ≤2x solo time

### Qualitative

- [ ] Agents sound distinct (blind test >80% accuracy)
- [ ] PM challenges business value consistently
- [ ] Security thinks adversarially
- [ ] Conversation feels natural (not scripted)
- [ ] Synthesis captures key decisions accurately
- [ ] User reports standup valuable (survey >4/5)
- [ ] **CRITICAL**: Demonstrably better outcomes than solo mode

---

## What We're NOT Building (Yet)

**Explicitly Deferred to Later Releases**:

1. ❌ Security skill (CMMC workflows) → Release 0.2
2. ❌ TestArchitect skill (ATDD workflows) → Release 0.2
3. ❌ Scrum Master agent → Release 0.2
4. ❌ Business Analyst agent → Release 0.2
5. ❌ Test Architect agent → Release 0.2
6. ❌ Transparent coordination messaging → Release 0.2
7. ❌ Interactive vs. Autonomous mode detection → Release 0.2
8. ❌ Agent cross-referencing by name → Release 0.2
9. ❌ PAI customization (remove "Kai"/"Daniel") → Release 0.3
10. ❌ Installation wizard → Release 0.3

**Why Defer?**:
- Prove standup value FIRST
- Smaller scope = faster feedback
- Can pivot if standup doesn't work
- Skills/agents are additive (can build later)

---

## Definition of Done (MVP)

**For Release 0.1 MVP to be "Done"**:

### Technical
- [ ] AgilePm skill implemented (4 workflows, templates, knowledge)
- [ ] AgilePm follows PAI standards (TitleCase, USE WHEN, Examples)
- [ ] PM agent created with distinct personality
- [ ] Security agent created with distinct personality
- [ ] Architect agent validated (already exists)
- [ ] Standup skill created (activation, selection, conversation, synthesis)
- [ ] Code committed to FORGE repo
- [ ] No critical bugs

### Validation
- [ ] All 4 validation gates passed (Skill Quality, Personality, A/B Test, End-to-End)
- [ ] Blind test: Personality identification >80%
- [ ] A/B test: Standup finds ≥2x issues vs. solo (10 tests)
- [ ] A/B test: Standup time ≤2x solo time
- [ ] User survey: Standup valuable >4/5

### Documentation
- [ ] AgilePm skill documented (examples, patterns)
- [ ] Agent personalities documented
- [ ] Standup orchestration documented
- [ ] Examples provided (auth system design, product feature)
- [ ] README updated with MVP capabilities

### Real-World Use
- [ ] Used successfully on ≥1 real project (work or home)
- [ ] PRD generated using AgilePm skill
- [ ] Standup used for ≥1 complex decision
- [ ] Measurably better outcome documented

---

## Risks & Mitigation (MVP-Specific)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Agents sound too similar** | High | Medium | Week 6 validation gate with blind test; refine before standup |
| **Standup feels scripted/artificial** | High | Medium | Prototype 2-agent conversation first; iterate on natural flow |
| **Standup doesn't find more issues** | Critical | Low | A/B testing at week 8; pivot approach if needed |
| **60 points still too aggressive** | Medium | Medium | Track velocity weekly; cut scope further if needed |
| **User doesn't see value** | High | Low | Real-world validation; survey after each use |

---

## Timeline Estimate

**Conservative Estimate**: 10 weeks
**Optimistic Estimate**: 8 weeks
**Realistic Estimate**: 9 weeks (accounting for learning curve and iteration)

**Week-by-Week**:
- Weeks 1-4: AgilePm skill (26 pts)
- Weeks 5-6: Agent personalities (13 pts)
- Weeks 7-10: Standup orchestration (21 pts)

**Total**: 60 points / 8 points per week avg = 7.5 weeks (round to 8-10 weeks with buffer)

---

## Next Steps

1. **Approve MVP Scope**: Review and sign off on reduced scope
2. **Set Up Project Tracking**: Create sprint backlog for first 4 weeks
3. **Start Sprint 1**: Begin AgilePm skill implementation
4. **Schedule Validation Gates**: Calendar week 2, 6, 8, 10 checkpoints
5. **Identify A/B Test Decisions**: Pre-select 10 design decisions for testing

---

## How This Supports Full Vision

**MVP Proves Core Hypothesis**:
- Standup conversation produces better outcomes → Validated ✅
- Agents maintain distinct personalities → Validated ✅
- PAI can orchestrate multi-agent discussion → Validated ✅

**If MVP Succeeds** → Build Release 0.2:
- Add Security skill (CMMC compliance workflows)
- Add TestArchitect skill (ATDD workflows)
- Add 2 more agents (Scrum Master, Analyst)
- Add advanced standup features

**If MVP Fails** → Pivot:
- Enhanced solo agents still valuable (AgilePm skill useful alone)
- Smaller investment lost (60 pts vs. 131 pts)
- Learn what didn't work, adjust approach

---

## Comparison: Original vs. MVP

| Aspect | Original Release 0.1 | MVP Release 0.1 |
|--------|---------------------|-----------------|
| **Story Points** | 131 | 60 |
| **Timeline** | 16 weeks (4 months) | 8-10 weeks (2 months) |
| **Skills** | 3 (AgilePm, Security, TestArchitect) | 1 (AgilePm only) |
| **Agents** | 5 (PM, Arch, Security, SM, Analyst) | 3 (PM, Arch, Security) |
| **Standup Features** | All 7 stories | Core 4 stories |
| **Validation** | End of 16 weeks | Gates at weeks 2, 6, 8, 10 |
| **Risk** | High (large investment) | Lower (fail fast) |
| **User Feedback** | 4 months wait | 2 months |

---

**FORGE MVP: Prove standup value fast, iterate based on real feedback!**
