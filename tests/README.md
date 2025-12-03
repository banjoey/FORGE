# Daniel Agent: Acceptance Tests

**Purpose**: ATDD (Acceptance Test-Driven Development) for Daniel (Security Engineer) agent
**Coverage**: 12 scenarios across US-E1 (Standup), US-E2 (STRIDE), and US-E3 (CMMC)
**Test Framework**: Jest with TypeScript

---

## Test Files

### emma-us-e1-standup.test.ts (4 scenarios)

**US-E1**: Daniel Participates in Security Standups (5 points)

1. **Scenario 1**: Daniel joins standup on authentication feature
   - Verifies Daniel provides security perspective
   - Checks STRIDE category identification (Spoofing for auth)
   - Validates CMMC practice references (IA.L2-3.5.10)
   - Uses keyword matching for non-deterministic LLM outputs

2. **Scenario 2**: Daniel defers to Mary on UX questions
   - Verifies Daniel recognizes questions outside her domain
   - Checks Daniel still provides security perspective
   - Validates Daniel defers to appropriate agent (Mary for UX)

3. **Scenario 3**: Daniel provides actionable recommendations
   - Identifies HTTP threat (credentials in transit)
   - Recommends HTTPS/TLS with implementation guidance
   - Validates recommendations are actionable (not vague)
   - References CMMC SC.L2-3.13.8

4. **Scenario 4**: Daniel logs decisions in project-context.md
   - Verifies decisions are recorded with metadata
   - Checks CMMC practice references are logged
   - Validates audit trail (date, participants, status)

---

### emma-us-e2-stride.test.ts (4 scenarios + 1 integration)

**US-E2**: Daniel Performs STRIDE Threat Modeling (8 points)

5. **Scenario 5**: Daniel performs complete STRIDE analysis
   - Analyzes all 6 STRIDE categories (S/T/R/I/D/E)
   - Provides mitigations for each threat
   - Prioritizes by risk (Critical/High/Medium/Low)
   - Validates payment API gets Critical priority

6. **Scenario 6**: Daniel identifies SQL injection
   - Detects SQL injection in code review
   - Classifies as Tampering (STRIDE)
   - Marks as Critical severity (OWASP A03)
   - Recommends parameterized queries with code example

7. **Scenario 7**: Daniel prioritizes threats by risk
   - Categorizes 10+ threats by risk level
   - Assigns appropriate timelines (Critical=immediate, High=sprint, Medium=30 days)
   - Recommends fixing Critical/High first

8. **Scenario 8**: Daniel documents threat model
   - Creates threat-models/payment-api-stride.md
   - Includes data flow diagram
   - Documents all STRIDE categories
   - References CMMC practices

**Integration Test**: Daniel collaborates with Mary/Clay/Hefley
   - Verifies 4-agent standup works
   - Each agent provides unique perspective
   - Daniel complements others (no conflicts)
   - Synthesis combines all perspectives

---

### emma-us-e3-cmmc.test.ts (4 scenarios)

**US-E3**: Daniel Enforces CMMC Compliance (5 points)

9. **Scenario 9**: Daniel looks up CMMC practice by ID
   - Validates Daniel can lookup any of 110 CMMC Level 2 practices
   - Checks practice structure (ID, domain, requirement, implementation, evidence)
   - Tests AC.L2-3.1.1, IA.L2-3.5.10, SC.L2-3.13.8, SI.L2-3.14.6

10. **Scenario 10**: Daniel detects CMMC violations
    - Tests 4 violation types: missing auth, hardcoded password, HTTP, no input validation
    - Verifies Daniel cites specific CMMC practice violated
    - Validates remediation guidance is actionable
    - Checks severity assignment (Critical/High/Medium/Low)

11. **Scenario 11**: Daniel enforces all 17 CMMC domains
    - Validates Daniel checks practices from all 17 domains (AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PS, RA, RE, SA, SC, SI)
    - Verifies Daniel prioritizes Critical domains (AC, IA, SC, SI, AU)
    - Tests comprehensive security review across multiple domains
    - Ensures at least 10 of 17 domains checked for high-sensitivity features

12. **Scenario 12**: Daniel creates CMMC audit trail
    - Validates audit trail structure (date, participants, practices checked, violations found, decisions, status)
    - Checks audit trail is logged to project-context.md
    - Verifies machine-readable format for CMMC compliance reporting
    - Tests audit trail includes remediation plans and status tracking

---

## Running Tests

### Install Dependencies
```bash
npm install --save-dev jest @types/jest ts-jest typescript
```

### Run All Daniel Tests
```bash
npm test emma
```

### Run Specific Test Suite
```bash
npm test emma-us-e1-standup   # US-E1 tests only
npm test emma-us-e2-stride    # US-E2 tests only
npm test emma-us-e3-cmmc      # US-E3 tests only
```

### Run with Coverage
```bash
npm test -- --coverage
```

---

## Testing Strategy

### Non-Deterministic LLM Outputs

**Challenge**: Daniel is an AI agent (LLM-based). Responses aren't deterministic.

**Solution**: Use semantic similarity instead of exact string matching

**Approach 1**: STRIDE Category + Severity (Most deterministic)
```typescript
expect(result.Daniel.strideCategory).toBe('Spoofing')  // ✅ Deterministic
expect(result.Daniel.severity).toBe('Critical')        // ✅ Deterministic
```

**Approach 2**: Keyword Matching (Flexible)
```typescript
const threatsText = result.Daniel.threats.join(' ').toLowerCase()
expect(threatsText).toMatch(/credential|authentication|spoofing/)  // ✅ Flexible
```

**Approach 3**: Semantic Similarity (Advanced, not implemented yet)
```typescript
const similarity = cosineSimilarity(
  getEmbedding(result.Daniel.threats[0]),
  getEmbedding('authentication threats')
)
expect(similarity).toBeGreaterThan(0.8)  // 80% similar
```

**We use**: Approach 1 + 2 (deterministic checks + keyword matching)

---

## Test Coverage

### US-E1: Daniel Participates in Standups (5 points)
- ✅ Scenario 1: Daniel joins standup (core functionality)
- ✅ Scenario 2: Daniel defers to other agents (collaboration)
- ✅ Scenario 3: Daniel provides actionable recommendations (quality)
- ✅ Scenario 4: Daniel logs decisions (audit trail)

**Coverage**: 4 of 4 scenarios (100%)

---

### US-E2: Daniel Performs STRIDE (8 points)
- ✅ Scenario 5: Complete STRIDE analysis (all 6 categories)
- ✅ Scenario 6: SQL injection detection (specific threat)
- ✅ Scenario 7: Risk prioritization (Critical/High/Medium/Low)
- ✅ Scenario 8: Threat model documentation (audit trail)

**Coverage**: 4 of 4 scenarios (100%)

---

### US-E3: Daniel Enforces CMMC (5 points)
- ✅ Scenario 9: CMMC practice lookup
- ✅ Scenario 10: CMMC violation detection
- ✅ Scenario 11: All 17 domains enforced
- ✅ Scenario 12: CMMC audit trail

**Coverage**: 4 of 4 scenarios (100%)

---

## Success Criteria

**Sprint 1 (US-E1 + US-E2)**:
- [ ] All 8 scenarios have automated tests ✅
- [ ] All tests use semantic similarity (keyword matching) ✅
- [ ] Tests pass (or fail as expected in TDD red phase) ⏳
- [ ] Test coverage: 8 of 8 scenarios (100%) ✅

**Sprint 2 (US-E3)**:
- [x] 4 additional scenarios for CMMC compliance ✅
- [x] Total: 12 scenarios automated ✅
- [ ] Daniel catches ≥54 of 60 security vulnerabilities (90%)

---

## Implementation Notes

**Current Status**: ✅ Tests written (TDD red phase)
- Tests define expected behavior
- Daniel agent persona created
- STRIDE framework documented
- RunStandup.md updated for 4-agent roster

**Next Steps**: Implement Daniel agent to make tests pass (TDD green phase)
1. Standup orchestrator integration
2. STRIDE threat modeling implementation
3. CMMC practice lookup (Sprint 2)
4. Iterate until all tests pass

---

## ATDD Compliance

**Test-Driven Development Cycle**:
1. ✅ **Red**: Write failing tests (current state - tests written, Daniel not fully implemented)
2. ⏳ **Green**: Implement Daniel agent to make tests pass
3. ⏳ **Refactor**: Improve Daniel's prompts, add context, optimize

**All acceptance criteria follow Given-When-Then format**:
- **Given**: Initial conditions
- **When**: Action/trigger
- **Then**: Expected outcome (with deterministic + flexible checks)

---

**Last Updated**: 2025-12-02
**Test Count**: 12 scenarios (4 US-E1, 4 US-E2, 4 US-E3)
**Framework**: Jest + TypeScript
**Status**: ✅ ATDD tests written (Sprint 1 + Sprint 2 Prep), ready for implementation
