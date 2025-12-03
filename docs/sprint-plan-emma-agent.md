# Sprint Plan: Emma (Security Engineer) Agent

**Project**: FORGE Release 0.2
**Feature**: Emma agent implementation
**Scope**: 18 story points (US-E1, US-E2, US-E3)
**Timeline**: 3 weeks (2 sprints)
**Team**: Solo developer (you)

---

## Sprint Overview

**Sprint 1** (Weeks 1-2): US-E1 + US-E2 (13 points)
- Focus: Emma agent persona, STRIDE threat modeling, standup integration
- Deliverables: Emma agent file, acceptance tests, security test suite

**Sprint 2** (Week 3): US-E3 (5 points)
- Focus: CMMC compliance enforcement, validation
- Deliverables: CMMC integration, ≥90% test suite pass rate

---

## Sprint 1: Emma Foundation + STRIDE (Weeks 1-2, 13 points)

### Sprint Goal
Build Emma agent persona with STRIDE threat modeling capabilities and integrate with standup system.

### Capacity
- **Duration**: 2 weeks (10 working days)
- **Velocity**: 23 points per 2 weeks (historical average)
- **Planned**: 13 points (57% of capacity) ✅ Under capacity
- **Buffer**: 10 points for unknowns or Release 0.2 polish

---

### Week 1: Emma Agent Persona + STRIDE Framework

#### Day 1-2: Create Emma Agent Persona (3 points)

**Tasks**:
- [ ] Create `.claude/skills/Standup/agents/emma-security-engineer.md`
- [ ] Define 5 behavioral traits:
  1. Security-First Mindset ("What could go wrong?")
  2. CMMC Guardian (Enforces all 110 practices)
  3. Pragmatic Risk Manager (Prioritizes Critical/High)
  4. Educator (Explains WHY, not just "insecure")
  5. Threat Modeler (Uses STRIDE)
- [ ] Define Emma's responsibilities (STRIDE, CMMC, OWASP)
- [ ] Define integration with other agents (Mary, Bob, Murat)
- [ ] Write Emma's communication style and example phrases

**File Structure**:
```markdown
# Agent Persona: Emma (Security Engineer)

**Role**: Security Engineer / CMMC Compliance
**Expertise**: STRIDE threat modeling, CMMC Level 2, OWASP Top 10
**Personality**: Security-first, pragmatic, educator

## Core Responsibilities
- Perform STRIDE threat modeling
- Enforce CMMC Level 2 compliance
- Identify OWASP Top 10 vulnerabilities
- Recommend mitigations (actionable, not vague)

## Behavioral Traits
[5 traits with examples]

## Integration with Other Agents
[How Emma works with Mary/Bob/Murat]

## Standup Participation
[Emma's standup style, focus areas]

## Communication Style
[Tone, phrases, anti-patterns]
```

**Validation**:
- Emma agent file follows same structure as Mary/Bob/Murat
- 5 behavioral traits clearly defined
- Integration points documented

---

#### Day 3-4: Implement STRIDE Threat Modeling (5 points)

**Tasks**:
- [ ] Add STRIDE framework to Emma persona:
  - **S**poofing: Authentication bypass, credential theft
  - **T**ampering: Data modification, injection attacks
  - **R**epudiation: Lack of audit logs
  - **I**nformation Disclosure: Data leaks
  - **D**enial of Service: Resource exhaustion
  - **E**levation of Privilege: Authorization bypass
- [ ] Create STRIDE examples for common scenarios:
  - Login API → Spoofing, Tampering threats
  - Payment API → Information Disclosure, Tampering
  - Admin API → Elevation of Privilege
- [ ] Define threat prioritization logic (Critical/High/Medium/Low)
- [ ] Add mitigation templates for each STRIDE category

**STRIDE Template** (in Emma persona):
```markdown
### STRIDE Analysis

**Spoofing Threats**:
- Threat: Attacker impersonates legitimate user
- Mitigation: MFA, strong password policy, bcrypt hashing
- CMMC Practice: IA.L2-3.5.1 (multi-factor authentication)

**Tampering Threats**:
- Threat: SQL injection, XSS, data modification
- Mitigation: Parameterized queries, input validation, CSP
- CMMC Practice: SI.L2-3.14.6 (input validation)

[... 4 more STRIDE categories]
```

**Validation**:
- All 6 STRIDE categories defined with examples
- Each category has threat examples and mitigations
- CMMC practices referenced for each category

---

#### Day 5: Update RunStandup.md for 4-Agent Roster (2 points)

**Tasks**:
- [ ] Update `.claude/skills/Standup/workflows/RunStandup.md`
- [ ] Add Emma to default roster (Mary/Bob/Murat/Emma)
- [ ] Document when to include Emma:
  - Security-sensitive features (auth, payment, data handling)
  - High-risk features (STRIDE threat modeling required)
  - CMMC compliance reviews
- [ ] Add Emma's response format to workflow documentation
- [ ] Update "Agent Discussion Round" to include Emma (4th agent)

**Updated RunStandup.md** (excerpt):
```markdown
**Default Roster** (Agile Software Development):
- **Mary** (Business Analyst): Requirements, user value, business priorities
- **Bob** (Scrum Master): Sprint planning, velocity, impediment removal
- **Murat** (Test Architect): ATDD, risk-based testing, quality gates
- **Emma** (Security Engineer): STRIDE threat modeling, CMMC compliance

**When to Include Emma**:
- Security-sensitive features (authentication, payment, data handling)
- High-risk features (risk score ≥4.0)
- CMMC compliance reviews
- Threat modeling required
```

**Validation**:
- RunStandup.md updated with Emma
- When to include Emma clearly documented
- Emma's response format defined

---

### Week 2: Integration + Acceptance Tests

#### Day 6-7: Write Acceptance Tests for US-E1, US-E2 (3 points)

**Tasks**:
- [ ] Implement acceptance tests from `docs/emma-acceptance-criteria.md`
- [ ] Test Scenarios 1-8 (US-E1: 4 scenarios, US-E2: 4 scenarios)
- [ ] Create test harness for Emma agent validation
- [ ] Automated tests for:
  - Emma joins standup (Scenario 1)
  - Emma defers to Mary on UX (Scenario 2)
  - Emma provides actionable recommendations (Scenario 3)
  - Emma logs decisions (Scenario 4)
  - Emma performs STRIDE (Scenario 5)
  - Emma identifies SQL injection (Scenario 6)
  - Emma prioritizes threats (Scenario 7)
  - Emma documents threat model (Scenario 8)

**Test Framework**:
```typescript
// tests/emma-us-e1-e2.test.ts

describe('US-E1: Emma participates in standup', () => {
  test('Scenario 1: Emma joins standup', async () => {
    const result = await runStandup({
      feature: 'User authentication',
      roster: ['Mary', 'Bob', 'Murat', 'Emma']
    })

    expect(result.participants).toContain('Emma')
    expect(result.Emma.threats).toBeDefined()
    expect(result.Emma.recommendations).toBeDefined()
  })

  // ... 3 more US-E1 scenarios
})

describe('US-E2: Emma performs STRIDE', () => {
  test('Scenario 5: Emma analyzes all 6 STRIDE categories', async () => {
    const threatModel = await emma.performSTRIDE(paymentAPI)

    expect(threatModel.spoofing).toBeDefined()
    expect(threatModel.tampering).toBeDefined()
    expect(threatModel.repudiation).toBeDefined()
    expect(threatModel.informationDisclosure).toBeDefined()
    expect(threatModel.denialOfService).toBeDefined()
    expect(threatModel.elevationOfPrivilege).toBeDefined()
  })

  // ... 3 more US-E2 scenarios
})
```

**Validation**:
- All 8 scenarios automated
- Tests pass (or fail as expected for TDD red phase)
- Test coverage for Emma's core functionality

---

#### Day 8-9: Create Security Test Suite (Partial) (No additional points - already counted in Week 1)

**Tasks**:
- [ ] Implement test suite from `docs/emma-security-test-suite.md`
- [ ] Start with Critical vulnerabilities:
  - SQL Injection (10 tests)
  - XSS (10 tests)
  - Authentication Bypass (10 tests)
- [ ] Defer Medium/Low vulnerabilities to Sprint 2

**Partial Test Suite** (30 of 100 tests):
```bash
npm run test:sql-injection     # 10 tests
npm run test:xss               # 10 tests
npm run test:auth-bypass       # 10 tests

# Sprint 2:
# npm run test:authz-flaws     # 10 tests
# npm run test:cmmc-violations # 60 tests
```

**Validation**:
- 30 Critical vulnerability tests implemented
- Tests fail (red phase - Emma not built yet)
- Ready for TDD green phase in Sprint 2

---

#### Day 10: Sprint 1 Review & Retrospective (No points - ceremony)

**Sprint 1 Review**:
- [ ] Demo Emma agent persona (emma-security-engineer.md)
- [ ] Demo STRIDE threat modeling framework
- [ ] Demo acceptance tests (8 scenarios)
- [ ] Demo security test suite (30 tests, red phase)

**Sprint 1 Retrospective**:
- What went well?
- What didn't go well?
- What should we improve in Sprint 2?

**Sprint 1 Deliverables**:
- ✅ Emma agent persona file (emma-security-engineer.md)
- ✅ STRIDE framework integrated
- ✅ RunStandup.md updated for 4-agent roster
- ✅ Acceptance tests (8 scenarios automated)
- ✅ Security test suite (30 Critical tests, red phase)

---

## Sprint 2: CMMC Compliance + Validation (Week 3, 5 points)

### Sprint Goal
Integrate CMMC knowledge base with Emma, validate ≥90% detection rate, pass all acceptance tests.

### Capacity
- **Duration**: 6 working days (extended from 5 days after standup review)
- **Velocity**: ~12 points per week (historical average)
- **Planned**: 5 points (42% of capacity) ✅ Under capacity
- **Buffer**: 1 extra day for iteration if validation fails (Bob's recommendation)
- **Additional buffer**: 7 points for bug fixes, polish, upstream prep

---

### Day 11-12: Integrate CMMC Knowledge Base (2 points)

**Tasks**:

#### Day 11: Build CMMC Integration
- [ ] Connect Emma to `.claude/skills/Security/knowledge/cmmc-all-domains.md`
- [ ] Implement CMMC practice lookup:
  - "What is AC.L2-3.1.1?" → Returns practice details
  - "Show me all IA domain practices" → Returns 11 IA practices
- [ ] Add CMMC references to Emma's recommendations:
  - SQL injection → Reference SI.L2-3.14.6
  - No access control → Reference AC.L2-3.1.1
- [ ] Update Emma to cite CMMC in threat models

#### Day 12: Complete Integration + Validation Gate
- [ ] Finish CMMC integration implementation
- [ ] Write US-E3 acceptance tests (Scenarios 9-12)
- [ ] **Front-load CMMC tests**: Write first 10 CMMC tests (Murat's recommendation)
  - Reduces Day 13-14 pressure from 30 tests → 20 tests
  - Write tests for Critical CMMC domains: AC, IA, SC, SI, AU
- [ ] **Validation Gate** (end of Day 12): Run 3 manual CMMC tests

**CMMC Integration**:
```markdown
## Emma's CMMC Integration

When Emma identifies security issue:
1. Detect vulnerability (e.g., SQL injection)
2. Map to CMMC practice (e.g., SI.L2-3.14.6)
3. Recommend mitigation (e.g., parameterized queries)
4. Reference CMMC in response:
   "This violates CMMC SI.L2-3.14.6 (input validation).
    Recommendation: Use parameterized queries to prevent SQL injection."
```

**Day 12 Validation Gate** (Murat's Recommendation):
```markdown
## End-of-Day-12 Validation

**Purpose**: Catch CMMC integration issues early (before Day 13 full test suite)

**3 Manual Tests**:
1. **Test 1**: Hardcoded JWT secret
   - Code: `const token = jwt.sign(payload, "supersecret123")`
   - Expected: Emma detects violation → References IA.L2-3.5.10
   - Pass Criteria: Emma cites correct CMMC practice

2. **Test 2**: Missing authentication check
   - Code: `app.get('/admin/users', (req, res) => { res.json(users) })`
   - Expected: Emma detects violation → References AC.L2-3.1.1
   - Pass Criteria: Emma cites correct CMMC practice

3. **Test 3**: CMMC practice lookup
   - Query: "What is CMMC AC.L2-3.1.1?"
   - Expected: Emma returns practice definition
   - Pass Criteria: Emma retrieves practice from knowledge base

**Decision Point**:
- ✅ If all 3 tests pass: Proceed to Day 13 (full test suite)
- ❌ If any test fails: DO NOT proceed. Fix CMMC integration on Day 12 before continuing.

**Why This Gate Matters**: If CMMC integration is broken, we won't discover it until Day 13 (too late). This gate catches issues 1 day earlier.
```

**Definition of Done (Day 11-12)**:
- [ ] Emma can look up CMMC practice by ID (test with AC.L2-3.1.1)
- [ ] Emma's recommendations include CMMC references (verified in standup)
- [ ] US-E3 acceptance tests written (Scenarios 9-12)
- [ ] Day 12 validation gate passes (3 of 3 manual tests)

**Validation**:
- ✅ Emma can look up any of 110 CMMC practices
- ✅ Emma references CMMC in all recommendations
- ✅ CMMC practice IDs correct (verified against knowledge base)
- ✅ Day 12 validation gate passes (3 of 3 manual tests)

---

### Day 13-14: Complete Security Test Suite + Validation (3 points)

**Tasks**:
- [ ] Implement remaining 20 tests (front-loaded 10 CMMC tests already written on Day 12):
  - Authorization Flaws (10 tests)
  - CMMC Violations (10 more tests - completing 20 total CMMC tests)
- [ ] Run full test suite (60 tests total):
  - 30 Critical tests (SQL, XSS, Auth) - written in Sprint 1
  - 10 Authorization tests - written Day 13
  - 20 CMMC tests (10 from Day 12 + 10 from Day 13)
- [ ] Measure Emma's detection rate:
  - Target: ≥54 of 60 tests pass (90%)
  - If <90: Use Day 15 buffer for iteration
- [ ] Fix failing tests (iterate until ≥90% pass rate)

**Test Execution**:
```bash
npm run test:emma-security-suite

# Expected output (Release 0.2 - 60 tests):
# SQL Injection:       10/10 pass ✅
# XSS:                 10/10 pass ✅
# Authentication:       9/10 pass ⚠️ (1 edge case missed)
# Authorization:       10/10 pass ✅
# CMMC Critical:       19/20 pass ⚠️ (1 medium-risk violation missed)
#
# Total: 58/60 pass (97%) ✅ SUCCESS (≥90% threshold)
```

**Iteration Plan** (if <90%):
1. Analyze failing tests: Which categories have lowest pass rate?
2. Iterate on Emma's prompts: Add more STRIDE examples, CMMC context
3. Re-run tests
4. Repeat until ≥90%

**Validation**:
- Emma catches ≥54 of 60 vulnerabilities (90%)
- Emma provides actionable recommendations (not vague)
- Emma references CMMC practices correctly

---

### Day 15: Iteration Buffer (if needed)

**Purpose**: Extra day for iteration if Emma fails validation on Day 14 (Bob's recommendation from standup review)

**If Emma passes validation on Day 14** (≥90%):
- Use Day 15 for polish, documentation, bug fixes
- Start preparing for upstream contribution

**If Emma fails validation on Day 14** (<90%):
- Day 15: Iterate on Emma's prompts using iteration playbook below
- Re-run test suite
- Aim for ≥90% by end of Day 15

---

**Iteration Playbook** (Murat's Recommendation):

**IF Emma's detection rate is 70-89%** (close but not 90%):
1. Analyze failure categories: Which STRIDE categories are missed?
   ```bash
   # Example analysis:
   # SQL Injection: 10/10 ✅
   # XSS: 9/10 ⚠️ (missed DOM-based XSS)
   # Auth Bypass: 8/10 ⚠️ (missed OAuth state, JWT algorithm)
   # Authz: 10/10 ✅
   # CMMC: 17/20 ⚠️ (missed 3 practices)
   ```
2. Add more examples to Emma persona for weak categories
3. Enhance CMMC knowledge base references
4. Re-run test suite

**IF Emma's detection rate is 50-69%** (concerning):
1. Review Emma's persona prompt structure
2. Compare with Mary/Bob/Murat (proven patterns that work)
3. Simplify Emma's instructions (may be too complex)
4. Verify Emma has access to CMMC knowledge base
5. Check if STRIDE examples are clear
6. Re-run test suite

**IF Emma's detection rate is <50%** (critical):
1. **Escalate**: This indicates fundamental prompt issue
2. Consider root causes:
   - Does Emma have right context in standup?
   - Is CMMC knowledge base accessible?
   - Are acceptance test expectations too strict?
3. May need to extend Sprint 2 by 1 day (Day 17)
4. Worst case: Ship with reduced scope (30 tests instead of 60)

**Decision Tree**:
```
Emma detection rate after Day 14:
├── ≥90% → Proceed to Day 16 (Sprint review) ✅
├── 70-89% → Use Day 15 playbook (add examples) ⚠️
├── 50-69% → Use Day 15 playbook (restructure prompts) ⚠️
└── <50% → Escalate (extend sprint or reduce scope) 🚨
```

---

### Day 16: Sprint 2 Review, Release 0.2 Complete (No points - ceremony)

**Sprint 2 Review**:
- [ ] Demo Emma agent in standup (live dogfooding)
- [ ] Demo CMMC practice lookups
- [ ] Demo security test suite results (≥90% pass)
- [ ] Demo acceptance tests (all 12 scenarios passing)

**Release 0.2 Complete**:
- ✅ US-E1: Emma participates in security standups (5 pts) ✅
- ✅ US-E2: Emma performs STRIDE threat modeling (8 pts) ✅
- ✅ US-E3: Emma enforces CMMC compliance (5 pts) ✅
- ✅ Emma catches ≥90% of security issues ✅
- ✅ All acceptance criteria passing ✅

**Next Steps**:
- Prepare FORGE for upstream contribution
- Document lessons learned
- Consider Release 0.3 features (if user feedback requests)

---

## Risk Management

### Risk 1: Emma's Detection Rate <90%
**Probability**: Medium
**Impact**: High (Emma doesn't meet success criteria)
**Mitigation**:
- Start with high-quality prompts (leverage Mary/Bob/Murat patterns)
- Iterate early (test after Day 13, not Day 15)
- Budget 2 days for iteration (Days 13-14)

**Contingency**:
- If still <90% after 2 days: Ship with 85-89% detection rate, add to Release 0.3 backlog

---

### Risk 2: CMMC Knowledge Base Integration Complex
**Probability**: Low
**Impact**: Medium (delays Sprint 2)
**Mitigation**:
- CMMC knowledge base already exists (2,235 lines)
- Emma just needs to reference it (simple lookup)

**Contingency**:
- If complex: Hardcode top 20 CMMC practices (covers 80% of cases)

---

### Risk 3: Test Suite Implementation Takes Longer Than Planned
**Probability**: Medium
**Impact**: Medium (reduces validation coverage)
**Mitigation**:
- Prioritize Critical vulnerabilities first (30 tests in Sprint 1)
- Defer Medium/Low to Sprint 2
- Use test generators (templates for similar tests)

**Contingency**:
- If time-constrained: Ship with 80 tests (Critical + High only), defer Low-risk to Release 0.3

---

## Success Criteria

**Sprint 1**:
- [x] Emma agent persona created (emma-security-engineer.md)
- [x] STRIDE framework integrated (all 6 categories)
- [x] RunStandup.md updated (4-agent roster)
- [x] Acceptance tests written (8 scenarios for US-E1, US-E2)
- [x] Security test suite started (30 Critical tests)

**Sprint 2**:
- [ ] CMMC knowledge base integrated
- [ ] Emma can look up any of 110 CMMC practices
- [ ] Security test suite complete (60 tests)
- [ ] Emma catches ≥54 of 60 vulnerabilities (90%) ✅
- [ ] All 12 acceptance scenarios passing ✅

**Release 0.2**:
- [ ] Emma agent operational in standup
- [ ] Emma provides actionable security recommendations
- [ ] Emma references CMMC practices correctly
- [ ] Zero critical security gaps in FORGE codebase

---

## Timeline Summary

| Week | Days | Focus | Points | Deliverables |
|------|------|-------|--------|--------------|
| Week 1 | Day 1-5 | Emma persona, STRIDE, standup integration | 10 | Emma agent file, STRIDE framework, RunStandup.md |
| Week 2 | Day 6-10 | Acceptance tests, test suite (partial) | 3 | 8 acceptance tests, 30 security tests |
| Week 3 | Day 11-14 | CMMC integration, 60 tests, validation | 5 | CMMC lookup, 60 tests total, ≥90% pass rate |
| Week 3 | Day 15-16 | Iteration buffer + Sprint review | 0 | Polish, bug fixes, OR iteration if <90% |
| **Total** | **16 days** | **3+ weeks** | **18 pts** | **Emma agent complete** |

**Note**: Day 15 added as iteration buffer after standup review (Bob's recommendation). If Emma passes validation on Day 14, use Day 15 for polish.

---

**Last Updated**: 2025-12-02
**Sprint Duration**: 3+ weeks (16 working days, extended from 15 after standup review)
**Total Scope**: 18 story points (US-E1: 5, US-E2: 8, US-E3: 5)
**Velocity Check**: 18 points in 3 weeks = 6 pts/week (under historical 11-12 pts/week) ✅ Realistic
**Test Suite**: 60 tests (reduced from 100 after Murat's standup review)
