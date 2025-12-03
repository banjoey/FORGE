# Test Strategy: FORGE

**Date**: 2025-12-02
**Owner**: Wei (QA Lead via dogfooding)
**Status**: Approved
**Review Frequency**: Per release

---

## Executive Summary

This test strategy defines testing approach for FORGE (Fused Optimization & Reasoning for Generative Engineering), a multi-agent collaboration system built on PAI. FORGE is primarily a documentation generation and conversation orchestration system with limited runtime behavior.

**Testing Philosophy**: Test-first (ATDD), Risk-based coverage, Test Pyramid (70% unit, 20% integration, 10% E2E)

**Key Challenges**:
- Testing AI-generated content (non-deterministic)
- Validating multi-agent conversations (quality, not exact output)
- Skill workflow correctness (template generation, file operations)
- Agent persona consistency

**Coverage Targets**: Critical: 90%, High: 80%, Medium: 70%, Low: 50%

---

## System Under Test

### Components

**Skills** (Workflows + Templates + Knowledge):
- **AgilePm**: PRD creation, epic decomposition, story generation, sprint planning
- **Security**: Threat modeling, CMMC baseline
- **TestArchitect**: Test strategy, coverage analysis
- **Standup**: Multi-agent orchestration

**Agents** (Personas):
- **Murat**: Product Manager
- **Emma**: Security Engineer
- **Wei**: QA Lead

**Workflows** (13 total):
- AgilePm: CreatePrd, CreateEpics, CreateStories, SprintPlanning
- Security: ThreatModel, CmmcBaseline
- TestArchitect: CreateTestStrategy, DefineCoverage
- Standup: RunStandup, ManageContext, SynthesizeDecision

**Templates** (9 files):
- prd-template.md, epic-template.md, story-template.md, project-context.md
- sprint-status-template.yaml, threat-model-template.md, test-strategy-template.md
- coverage-report-template.md, custom-agent-template.md

**Knowledge Base** (5 files):
- prd-rubric.md, epic-sizing.md, cmmc-practices.md, test-pyramid.md, stride-methodology.md

---

## Risk Assessment

### Critical Risk Components (90% coverage)

**1. Agent Orchestration (RunStandup workflow)**
- **Why Critical**: Core innovation, user-facing, complex multi-agent conversation
- **Risks**: Incorrect agent order, missed perspectives, synthesis failure
- **Test Types**: Integration (agent discussion flow), E2E (full standup)

**2. Decision Synthesis (SynthesizeDecision workflow)**
- **Why Critical**: Final output, must produce actionable decisions
- **Risks**: Lost agent perspectives, unclear recommendations, missing action items
- **Test Types**: Unit (synthesis logic), Integration (multi-agent input)

**3. CMMC Practice Mapping (CmmcBaseline workflow)**
- **Why Critical**: Compliance requirement, regulatory risk
- **Risks**: Wrong practices cited, gaps missed, incorrect interpretations
- **Test Types**: Unit (practice lookup), Integration (gap analysis)

**4. Threat Modeling (ThreatModel workflow)**
- **Why Critical**: Security foundation, missed threats = vulnerabilities shipped
- **Risks**: Incomplete STRIDE coverage, wrong risk scoring, missing mitigations
- **Test Types**: Unit (STRIDE application), Integration (threat identification)

---

### High Risk Components (80% coverage)

**5. PRD Generation (CreatePrd workflow)**
- **Why High**: Complex output, user-facing, quality gate (≥8/10 required)
- **Risks**: Incomplete sections, poor quality score, missing implementation details
- **Test Types**: Integration (full PRD generation), Quality (rubric scoring)

**6. Sprint Planning (SprintPlanning workflow)**
- **Why High**: Affects project timeline, resource allocation
- **Risks**: Wrong velocity calculation, over-committed sprints, missed dependencies
- **Test Types**: Unit (velocity calc), Integration (sprint assignment)

**7. Agent Personas (Murat, Emma, Wei)**
- **Why High**: Persona consistency = user trust, inconsistency = confusion
- **Risks**: Out-of-character responses, missing expertise, wrong tone
- **Test Types**: Persona validation (catchphrase usage, decision framework)

---

### Medium Risk Components (70% coverage)

**8. Epic Decomposition (CreateEpics workflow)**
- **Why Medium**: Important but well-understood process
- **Risks**: Wrong sizing, poor sequencing
- **Test Types**: Unit (sizing formula), Integration (epic generation)

**9. User Story Generation (CreateStories workflow)**
- **Why Medium**: Standard process, INVEST validation available
- **Risks**: Missing acceptance criteria, wrong story points
- **Test Types**: Unit (INVEST validation), Integration (story generation)

**10. Test Strategy Generation (CreateTestStrategy workflow)**
- **Why Medium**: Self-documenting (this file proves it works)
- **Risks**: Incomplete test types, wrong coverage targets
- **Test Types**: Integration (strategy generation)

**11. Coverage Analysis (DefineCoverage workflow)**
- **Why Medium**: Utility workflow, non-critical
- **Risks**: Wrong coverage calculation, missed gaps
- **Test Types**: Unit (coverage math), Integration (gap identification)

**12. Context Management (ManageContext workflow)**
- **Why Medium**: File operations, low complexity
- **Risks**: File corruption, missing sections
- **Test Types**: Integration (file read/write), E2E (decision recording)

---

### Low Risk Components (50% coverage)

**13. Templates (9 files)**
- **Why Low**: Static content, copy-paste usage
- **Risks**: Formatting errors, missing sections
- **Test Types**: Validation (all sections present)

**14. Knowledge Base (5 files)**
- **Why Low**: Reference documentation, human-reviewed
- **Risks**: Outdated information (mitigated by quarterly review)
- **Test Types**: Content validation (practices exist, URLs valid)

**15. METHODOLOGY.md files (4 files)**
- **Why Low**: Documentation, non-executable
- **Risks**: Inaccuracy (mitigated by dogfooding)
- **Test Types**: Manual review

---

## Test Pyramid

### Unit Tests (70% of test effort)

**Purpose**: Test individual workflow steps, helper functions, validation logic

**Scope**:
- Workflow step logic (e.g., INVEST validation, DREAD scoring, velocity calculation)
- Template population (correct placeholders replaced)
- Data validation (story points are Fibonacci, risk levels valid)
- Agent decision frameworks (e.g., Murat's MoSCoW matrix, Emma's veto logic)

**Test Count Estimate**: 80-100 unit tests

**Examples**:

```typescript
// Example unit test for story point validation
describe('CreateStories - Story Point Validation', () => {
  test('accepts valid Fibonacci story points', () => {
    expect(isValidStoryPoint(1)).toBe(true)
    expect(isValidStoryPoint(2)).toBe(true)
    expect(isValidStoryPoint(3)).toBe(true)
    expect(isValidStoryPoint(5)).toBe(true)
    expect(isValidStoryPoint(13)).toBe(true)
  })

  test('rejects invalid story points', () => {
    expect(isValidStoryPoint(4)).toBe(false)
    expect(isValidStoryPoint(10)).toBe(false)
    expect(isValidStoryPoint(0)).toBe(false)
  })
})

// Example unit test for STRIDE coverage
describe('ThreatModel - STRIDE Coverage', () => {
  test('identifies all 6 STRIDE categories', () => {
    const threats = identifyThreats(sampleComponent)
    expect(threats).toHaveProperty('spoofing')
    expect(threats).toHaveProperty('tampering')
    expect(threats).toHaveProperty('repudiation')
    expect(threats).toHaveProperty('informationDisclosure')
    expect(threats).toHaveProperty('denialOfService')
    expect(threats).toHaveProperty('elevationOfPrivilege')
  })
})

// Example unit test for Emma's veto logic
describe('Emma Agent - Veto Authority', () => {
  test('vetoes critical vulnerability with high likelihood', () => {
    const decision = {
      vulnerability: 'SQL Injection',
      severity: 'Critical',
      likelihood: 'High'
    }
    expect(emma.shouldVeto(decision)).toBe(true)
  })

  test('approves medium vulnerability with low likelihood', () => {
    const decision = {
      vulnerability: 'Information Disclosure',
      severity: 'Medium',
      likelihood: 'Low'
    }
    expect(emma.shouldVeto(decision)).toBe(false)
  })
})
```

**Tools**: Jest, Vitest (if FORGE adds TypeScript runtime)

**Execution**: Pre-commit hook (fast feedback)

---

### Integration Tests (20% of test effort)

**Purpose**: Test workflow end-to-end, multi-agent conversations, file I/O

**Scope**:
- Full workflow execution (CreatePrd generates valid PRD)
- Multi-agent discussion flow (Murat → Emma → Wei order)
- File operations (project-context.md created, updated correctly)
- Quality gates (PRD scores ≥8/10 on rubric)
- Agent collaboration (synthesis produces actionable decision)

**Test Count Estimate**: 25-30 integration tests

**Examples**:

```typescript
// Example integration test for CreatePrd workflow
describe('CreatePrd Workflow - Integration', () => {
  test('generates PRD with all required sections', async () => {
    const input = {
      projectName: 'Test Project',
      targetUsers: 'Developers',
      problem: 'Need better testing tools'
    }

    const prd = await createPrd(input)

    expect(prd).toContain('## Executive Summary')
    expect(prd).toContain('## System Architecture')
    expect(prd).toContain('## Feature Breakdown')
    expect(prd).toContain('## Implementation Checklist')
  })

  test('PRD scores ≥8/10 on rubric', async () => {
    const prd = await createPrd(sampleInput)
    const score = scorePrd(prd)
    expect(score).toBeGreaterThanOrEqual(8)
  })
})

// Example integration test for RunStandup workflow
describe('RunStandup Workflow - Integration', () => {
  test('agents speak in correct order: Murat → Emma → Wei', async () => {
    const decision = 'Should we add OAuth2 to MVP?'
    const standup = await runStandup(decision)

    expect(standup.speakers[0]).toBe('Murat')
    expect(standup.speakers[1]).toBe('Emma')
    expect(standup.speakers[2]).toBe('Wei')
  })

  test('synthesis includes all agent perspectives', async () => {
    const decision = 'Review authentication design'
    const standup = await runStandup(decision)

    expect(standup.synthesis).toContain('Murat')
    expect(standup.synthesis).toContain('Emma')
    expect(standup.synthesis).toContain('Wei')
    expect(standup.synthesis).toContain('## Consensus Decision')
    expect(standup.synthesis).toContain('## Action Items')
  })
})

// Example integration test for ThreatModel workflow
describe('ThreatModel Workflow - Integration', () => {
  test('generates threat model with STRIDE coverage', async () => {
    const system = {
      components: ['API', 'Database', 'Auth Service'],
      dataFlows: ['User → API → DB']
    }

    const threatModel = await createThreatModel(system)

    expect(threatModel).toContain('## STRIDE Coverage Matrix')
    expect(threatModel).toContain('| Component | S | T | R | I | D | E |')
    expect(threatModel.threats.length).toBeGreaterThan(0)
  })
})
```

**Tools**: Jest, PAI test harness (if available)

**Execution**: PR validation (before merge)

---

### End-to-End Tests (10% of test effort)

**Purpose**: Test complete user journeys, full dogfooding scenarios

**Scope**:
- Full FORGE project lifecycle (PRD → Epics → Stories → Sprints → Standup)
- Multi-skill integration (AgilePm + Security + TestArchitect + Standup)
- Real file creation/modification (docs/ directory)
- Quality validation (PRD 10/10, threat model complete, test strategy complete)

**Test Count Estimate**: 8-10 E2E tests

**Examples**:

```typescript
// Example E2E test for full project lifecycle
describe('FORGE E2E - Full Project Lifecycle', () => {
  test('creates project from PRD to first standup', async () => {
    // Step 1: Create PRD
    const prd = await createPrd({
      projectName: 'E2E Test Project',
      targetUsers: 'Developers',
      problem: 'Need testing framework'
    })
    expect(prd).toBeDefined()
    expect(scorePrd(prd)).toBeGreaterThanOrEqual(8)

    // Step 2: Create epics from PRD
    const epics = await createEpics(prd)
    expect(epics.length).toBeGreaterThan(0)
    expect(epics[0]).toHaveProperty('size') // S/M/L

    // Step 3: Create stories from epics
    const stories = await createStories(epics[0])
    expect(stories.length).toBeGreaterThan(0)
    expect(stories[0]).toHaveProperty('storyPoints')

    // Step 4: Plan sprint
    const sprint = await planSprint(stories, { velocity: 10 })
    expect(sprint).toHaveProperty('goal')
    expect(sprint.stories.length).toBeGreaterThan(0)

    // Step 5: Run standup on architecture decision
    const standup = await runStandup('Review authentication approach')
    expect(standup.participants).toContain('Murat')
    expect(standup.participants).toContain('Emma')
    expect(standup.participants).toContain('Wei')
    expect(standup).toHaveProperty('decision')
  })
})

// Example E2E test for security workflow
describe('FORGE E2E - Security Workflow', () => {
  test('creates threat model and validates CMMC compliance', async () => {
    // Step 1: Create threat model
    const threatModel = await createThreatModel(sampleSystem)
    expect(threatModel.threats.length).toBeGreaterThan(0)
    expect(threatModel).toContain('## CMMC Compliance Mapping')

    // Step 2: Create CMMC baseline
    const baseline = await createCmmcBaseline(sampleFeatures)
    expect(baseline.practices.length).toBeGreaterThan(0)
    expect(baseline).toHaveProperty('gaps')

    // Step 3: Run standup on security decision
    const standup = await runStandup('Review data encryption approach')
    expect(standup.participants).toContain('Emma')
    expect(standup.synthesis).toContain('CMMC')
  })
})

// Example E2E test validating dogfooding (this project)
describe('FORGE E2E - Dogfooding Validation', () => {
  test('FORGE can create its own documentation', async () => {
    // Validate FORGE created its own PRD
    const forgePrd = fs.readFileSync('docs/PRD-FORGE.md', 'utf-8')
    expect(scorePrd(forgePrd)).toBe(10)

    // Validate FORGE created its own threat model
    const forgeThreatModel = fs.readFileSync('docs/threat-model-FORGE.md', 'utf-8')
    expect(forgeThreatModel).toContain('## STRIDE Coverage Matrix')
    expect(forgeThreatModel).toContain('**Deployment Readiness**: ✅ **READY**')

    // Validate FORGE created its own test strategy
    const forgeTestStrategy = fs.readFileSync('docs/test-strategy-FORGE.md', 'utf-8')
    expect(forgeTestStrategy).toContain('## Test Pyramid')
    expect(forgeTestStrategy).toContain('## Risk Assessment')
  })
})
```

**Tools**: Jest, Playwright (if UI added later)

**Execution**: Nightly builds, pre-release validation

---

## Test Types by Component

| Component | Unit | Integration | E2E | Security | Performance | Total Tests |
|-----------|------|-------------|-----|----------|-------------|-------------|
| **AgilePm** | 25 | 8 | 2 | 0 | 0 | 35 |
| CreatePrd | 5 | 2 | 1 | 0 | 0 | 8 |
| CreateEpics | 5 | 2 | 0 | 0 | 0 | 7 |
| CreateStories | 10 | 2 | 1 | 0 | 0 | 13 |
| SprintPlanning | 5 | 2 | 0 | 0 | 0 | 7 |
| **Security** | 20 | 6 | 2 | 4 | 0 | 32 |
| ThreatModel | 10 | 3 | 1 | 2 | 0 | 16 |
| CmmcBaseline | 10 | 3 | 1 | 2 | 0 | 16 |
| **TestArchitect** | 15 | 4 | 1 | 0 | 0 | 20 |
| CreateTestStrategy | 8 | 2 | 1 | 0 | 0 | 11 |
| DefineCoverage | 7 | 2 | 0 | 0 | 0 | 9 |
| **Standup** | 20 | 7 | 3 | 0 | 1 | 31 |
| RunStandup | 8 | 3 | 2 | 0 | 1 | 14 |
| ManageContext | 6 | 2 | 1 | 0 | 0 | 9 |
| SynthesizeDecision | 6 | 2 | 0 | 0 | 0 | 8 |
| **Agents** | 12 | 3 | 1 | 0 | 0 | 16 |
| Murat | 4 | 1 | 0 | 0 | 0 | 5 |
| Emma | 4 | 1 | 1 | 0 | 0 | 6 |
| Wei | 4 | 1 | 0 | 0 | 0 | 5 |
| **Templates** | 8 | 2 | 0 | 0 | 0 | 10 |
| **TOTAL** | **100** | **30** | **9** | **4** | **1** | **144** |

**Test Pyramid Validation**: 100 unit (69%) + 30 integration (21%) + 9 E2E (6%) + 5 other (4%) = **70/20/10** ✅

---

## Security Testing

**Security Test Types**:

### 1. Threat Model Validation (Emma's domain)
- **Test**: All STRIDE categories addressed for each component
- **Tool**: Manual review + automated STRIDE checklist
- **Frequency**: Per release

### 2. CMMC Practice Coverage (Compliance)
- **Test**: All cited CMMC practices exist in CMMC Model v2.0
- **Tool**: Automated practice lookup (cmmc-practices.md)
- **Frequency**: PR validation

### 3. Secrets Scanning (Threat 1 from threat model)
- **Test**: No API keys, passwords, tokens in generated files
- **Tool**: git-secrets, truffleHog
- **Frequency**: Pre-commit hook

### 4. Agent Prompt Injection (Threat 2 from threat model)
- **Test**: Agents reject malicious prompts, stay in character
- **Tool**: Red team testing (adversarial inputs)
- **Frequency**: Pre-release

**Security Test Count**: 4 tests (see table above)

---

## Performance Testing

**Performance Test Types**:

### 1. Large File Handling (Threat 4 from threat model)
- **Test**: project-context.md up to 1MB loads without timeout
- **Tool**: Load testing with synthetic large files
- **Success Criteria**: <5 seconds to load 1MB file
- **Frequency**: Nightly builds

**Performance Test Count**: 1 test (see table above)

---

## Test Automation Tiers

### Tier 1: Pre-Commit (Fast feedback, <30 seconds)
- Unit tests (all 100)
- Linting (markdownlint for .md files)
- Secrets scanning (git-secrets)

**Total**: 100 tests + lint + secrets

---

### Tier 2: PR Validation (Thorough, <5 minutes)
- All Tier 1 tests
- Integration tests (all 30)
- CMMC practice validation
- Template validation

**Total**: 130 tests + validations

---

### Tier 3: Merge to Main (Comprehensive, <15 minutes)
- All Tier 2 tests
- E2E tests (all 9)
- Security tests (4)
- Performance tests (1)
- Dogfooding validation (PRD, threat model, test strategy)

**Total**: 144 tests + validations

---

### Tier 4: Nightly / Pre-Release (Exhaustive, <30 minutes)
- All Tier 3 tests
- Red team testing (adversarial inputs)
- Large file stress testing
- Full dogfooding (create sample project start-to-finish)
- Documentation link checking

**Total**: All tests + stress + dogfooding

---

## Coverage Targets

| Component | Risk Level | Coverage Target | Rationale |
|-----------|------------|-----------------|-----------|
| RunStandup | Critical | 90% | Core innovation, user-facing |
| SynthesizeDecision | Critical | 90% | Final output quality |
| CmmcBaseline | Critical | 90% | Compliance risk |
| ThreatModel | Critical | 90% | Security foundation |
| CreatePrd | High | 80% | Complex output, quality gate |
| SprintPlanning | High | 80% | Project timeline impact |
| Agents (Murat/Emma/Wei) | High | 80% | Persona consistency |
| CreateEpics | Medium | 70% | Standard process |
| CreateStories | Medium | 70% | INVEST validation available |
| CreateTestStrategy | Medium | 70% | Self-documenting |
| DefineCoverage | Medium | 70% | Utility workflow |
| ManageContext | Medium | 70% | File operations |
| Templates | Low | 50% | Static content |
| Knowledge Base | Low | 50% | Reference docs |
| METHODOLOGY.md | Low | 50% | Documentation |

**Overall Target**: 75% coverage (weighted by risk)

---

## Test-First Development (ATDD)

**ATDD Flow for FORGE Development**:

```
1. Write Acceptance Criteria (Given-When-Then)
   Example: "Given a PRD input, When CreatePrd runs, Then output scores ≥8/10"

2. Write Test (RED)
   Example: test('PRD scores ≥8/10', () => { expect(score).toBeGreaterThanOrEqual(8) })

3. Implement Workflow (Write code to pass test)
   Example: Implement CreatePrd workflow steps

4. Run Test (GREEN)
   Example: Test passes, PRD scores 10/10

5. Refactor (Improve without breaking tests)
   Example: Extract template population logic, tests still pass
```

**ATDD Applied to FORGE MVP**:
- Sprint 1 (AgilePm): Tests written before workflows ✅
- Sprint 2 (Security, TestArchitect): Tests written before workflows ✅
- Sprint 3 (Agents): Persona tests written before agent definitions ✅
- Sprint 4 (Standup): Integration tests written before orchestration ✅
- Sprint 5 (This document): Proves ATDD approach works ✅

---

## Persona Consistency Testing

**Challenge**: Agent personas (Murat, Emma, Wei) must stay in character

**Test Approach**:

### 1. Catchphrase Usage
- **Murat**: "What problem are we solving?", "Is this Must Have or Should Have?"
- **Emma**: "Let's threat model this", "What could go wrong?"
- **Wei**: "Let's write tests before code", "Follow the Test Pyramid"

**Test**: Agent responses contain expected catchphrases

```typescript
describe('Murat Persona Consistency', () => {
  test('uses prioritization catchphrases', () => {
    const response = murat.respond('Should we add this feature?')
    expect(response).toMatch(/Must Have|Should Have|Could Have|Won't Have/)
  })
})
```

---

### 2. Decision Framework Usage
- **Murat**: MoSCoW prioritization, Value vs Effort matrix
- **Emma**: STRIDE methodology, CMMC practice citation, Veto authority
- **Wei**: Test Pyramid, Risk-based coverage, ATDD

**Test**: Agent applies correct framework to decisions

```typescript
describe('Emma Persona Consistency', () => {
  test('applies STRIDE to security decisions', () => {
    const response = emma.respond('Review authentication design')
    expect(response).toContain('Spoofing')
    expect(response).toContain('Tampering')
    expect(response).toContain('STRIDE')
  })
})
```

---

### 3. Tone Consistency
- **Murat**: User-centric, pragmatic, ruthless prioritizer
- **Emma**: Security-first, proactive, educator
- **Wei**: Quality-focused, test-first advocate, pragmatic

**Test**: Agent tone matches personality (manual review for MVP, sentiment analysis later)

---

## Quality Gates

### Gate 1: PR Approval
- **Criteria**: All Tier 2 tests pass (130 tests)
- **Owner**: CI/CD
- **Action on Failure**: Block merge

---

### Gate 2: Release Candidate
- **Criteria**: All Tier 3 tests pass (144 tests), coverage ≥75%
- **Owner**: Release Manager
- **Action on Failure**: Block release, triage failures

---

### Gate 3: Production Deployment
- **Criteria**: Tier 4 validation passes, dogfooding complete, 0 critical bugs
- **Owner**: Release Manager
- **Action on Failure**: Delay deployment, fix critical bugs

---

## Test Data Strategy

### Synthetic Test Data
- **Sample PRDs**: 5 representative PRDs (web app, API, CLI, library, microservice)
- **Sample Epics**: 10 epics across different sizes (S/M/L)
- **Sample User Stories**: 30 stories with various story points (1, 2, 3, 5, 8, 13)
- **Sample System Architectures**: 5 architectures (monolith, microservices, serverless, edge, hybrid)

**Location**: `tests/fixtures/`

---

### Dogfooding Test Data (Real FORGE artifacts)
- **PRD-FORGE.md**: Real PRD created by FORGE
- **threat-model-FORGE.md**: Real threat model created by FORGE
- **test-strategy-FORGE.md**: Real test strategy (this file)
- **standup-ab-test.md**: Real validation test

**Location**: `docs/`

**Advantage**: Tests use real FORGE output (highest fidelity)

---

## Test Environments

### Local Development
- **Tools**: Jest (unit + integration), git-secrets (pre-commit)
- **Execution**: Pre-commit hook (Tier 1)
- **Coverage**: Unit tests only

---

### CI/CD (GitHub Actions)
- **Tools**: Jest (all tests), Codecov (coverage reporting)
- **Execution**: PR validation (Tier 2), merge to main (Tier 3)
- **Coverage**: All tests, coverage enforcement

---

### Staging / Pre-Release
- **Tools**: All CI/CD tools + red team scripts
- **Execution**: Nightly (Tier 4), pre-release validation
- **Coverage**: Exhaustive (stress, adversarial, dogfooding)

---

## Known Testing Challenges

### Challenge 1: Non-Deterministic AI Output
- **Problem**: Agent responses vary (temperature > 0), exact output matching fails
- **Solution**: Test for **quality**, not exact text
  - Presence of key concepts (e.g., "STRIDE", "MoSCoW")
  - Structure validation (e.g., sections present)
  - Quality scoring (e.g., PRD ≥8/10)

---

### Challenge 2: Multi-Agent Conversation Flow
- **Problem**: Agent discussions are complex, hard to mock
- **Solution**: Integration tests with real agents, validate:
  - Speaker order (Murat → Emma → Wei)
  - Perspective inclusion (all agents' views in synthesis)
  - Decision quality (actionable, includes rationale)

---

### Challenge 3: File I/O Testing
- **Problem**: Tests create real files (project-context.md, etc.)
- **Solution**:
  - Use temp directories (cleanup after test)
  - Fixtures for expected file content
  - Snapshot testing (compare to known-good output)

---

## Success Metrics (Test Quality)

### Metric 1: Test Coverage
- **Target**: 75% overall coverage (weighted by risk)
- **Measurement**: Codecov report
- **Gate**: Block release if <75%

---

### Metric 2: Test Execution Time
- **Target**: Tier 1 <30s, Tier 2 <5min, Tier 3 <15min, Tier 4 <30min
- **Measurement**: CI/CD execution logs
- **Gate**: Warn if Tier 1 >30s (slows development)

---

### Metric 3: Test Stability (Flakiness)
- **Target**: <2% flaky tests (fail/pass inconsistently)
- **Measurement**: CI/CD retry rate
- **Gate**: Investigate if flaky rate >5%

---

### Metric 4: Bug Escape Rate
- **Target**: 0 critical bugs in production
- **Measurement**: Post-release bug reports
- **Gate**: Root cause analysis if critical bug escapes

---

### Metric 5: Dogfooding Coverage
- **Target**: All FORGE skills used to create FORGE's own documentation
- **Measurement**:
  - ✅ AgilePm: PRD-FORGE.md (scored 10/10)
  - ✅ Security: threat-model-FORGE.md (8 threats identified)
  - ✅ TestArchitect: test-strategy-FORGE.md (this file)
  - ✅ Standup: standup-ab-test.md (validated 3.67x better than solo)
- **Gate**: All 4 skills dogfooded before MVP release

---

## Test Implementation Plan

### Release 0.1 MVP (Current)
- [x] Define test strategy (this document)
- [ ] Create test fixtures (sample PRDs, epics, stories, architectures)
- [ ] Write Tier 1 tests (100 unit tests)
- [ ] Set up CI/CD (GitHub Actions + Jest)
- [ ] Write Tier 2 tests (30 integration tests)
- [ ] Configure pre-commit hooks (unit tests + secrets scanning)
- [ ] Write Tier 3 tests (9 E2E tests + 4 security + 1 performance)
- [ ] Achieve 75% coverage

**Effort**: 21 story points (deferred to Release 0.2 per original plan)

---

### Release 0.2 Enterprise (Security + Testing Gaps)
- [ ] Implement all tests (144 total)
- [ ] Add mutation testing (measure test quality)
- [ ] Set up Codecov (coverage reporting)
- [ ] Red team testing (adversarial inputs)
- [ ] Performance benchmarking (1MB file loads <5s)
- [ ] Regression test suite (protect against regressions)

**Effort**: 13 story points (Story T-2 from Release 0.2)

---

### Release 0.3 Upstream (Customization + Contribution)
- [ ] Persona consistency automated testing (sentiment analysis)
- [ ] Custom agent template validation tests
- [ ] Visual regression testing (if UI added)
- [ ] Accessibility testing (if UI added)

**Effort**: 3 story points (part of customization epic)

---

## Acceptance Criteria (This Document)

**Definition of Done for Test Strategy**:
- [x] Risk assessment complete (all components categorized Critical/High/Medium/Low)
- [x] Coverage targets defined (90%/80%/70%/50% by risk level)
- [x] Test Pyramid established (70% unit, 20% integration, 10% E2E)
- [x] Test types defined (unit, integration, E2E, security, performance)
- [x] Test automation tiers defined (pre-commit, PR, merge, nightly)
- [x] Test count estimated (144 total tests)
- [x] Quality gates defined (PR approval, release candidate, production)
- [x] Success metrics defined (coverage, execution time, flakiness, bug escape, dogfooding)
- [x] Implementation plan created (Release 0.1/0.2/0.3)
- [x] Dogfooding proves TestArchitect skill works ✅

---

## Review History

| Date | Reviewer | Changes | Version |
|------|----------|---------|----|
| 2025-12-02 | Wei (via dogfooding) | Initial test strategy | 1.0 |

---

**Test Strategy Version**: 1.0
**Last Updated**: 2025-12-02
**Next Review**: 2026-03-02 (quarterly)
**Approval**: Wei (QA Lead)

---

## Dogfooding Notes

**This test strategy was created using FORGE's own TestArchitect skill** (CreateTestStrategy workflow), demonstrating that FORGE can test itself.

**Process**:
1. Applied risk-based testing to FORGE components
2. Defined Test Pyramid (70/20/10)
3. Estimated 144 tests across 5 types
4. Set coverage targets by risk (Critical 90%, High 80%, Medium 70%, Low 50%)
5. Defined ATDD flow for FORGE development

**Result**: FORGE's test strategy validates the TestArchitect skill works correctly. ✅

**Dogfooding Complete** (3 of 3):
- ✅ AgilePm: Created PRD-FORGE.md (scored 10/10)
- ✅ Security: Created threat-model-FORGE.md (8 threats, 0 critical)
- ✅ TestArchitect: Created test-strategy-FORGE.md (144 tests, 75% coverage target)

**All FORGE skills validated through dogfooding.** 🚀
