# PRD: Emma (Security Engineer) Agent

**Version**: 1.1 (Updated after standup review)
**Status**: Approved (18 points, 3 weeks)
**Owner**: FORGE Team
**Last Updated**: 2025-12-02

---

## Executive Summary

**Problem**: Solo developers and small teams lack security expertise, leading to vulnerable code, failed CMMC audits, and potential data breaches (avg cost: $4.5M).

**Solution**: Emma (Security Engineer) agent provides expert security guidance through FORGE's multi-agent standup system, enforcing CMMC Level 2 compliance (110 practices) and STRIDE threat modeling.

**Target Users**:
- Solo developers building security-critical applications
- Small teams without dedicated security engineers
- Government contractors requiring CMMC Level 2 compliance

**Success Metrics**:
- 90%+ security issues caught before code review
- Zero Critical vulnerabilities in production
- Security decisions in <30 minutes
- 100% of high-risk features threat modeled

---

## User Stories (MoSCoW Prioritized)

### Must Have (Release 0.2)

#### US-E1: Emma Participates in Security Standups (5 points)

**As a** developer designing a security-sensitive feature
**I want** Emma to participate in standup and provide security perspective
**So that** I catch security issues early (before coding)

**Priority**: Must Have (core functionality, proves Emma's value)

**Acceptance Criteria**:
*[To be written - see Todo List]*

**Business Value**:
- Reduces security rework (catch issues in design, not code review)
- Prevents critical vulnerabilities from reaching production
- Provides security expertise without hiring ($150k+ salary)

**Dependencies**:
- Emma agent persona created (`.claude/skills/Standup/agents/emma-security-engineer.md`)
- Standup skill supports 4-agent roster (Mary/Bob/Murat/Emma)

---

#### US-E2: Emma Performs STRIDE Threat Modeling (8 points)

**As a** developer designing an API or feature
**I want** Emma to analyze threats using STRIDE framework
**So that** I understand attack vectors and implement mitigations

**Priority**: Must Have (CMMC compliance requires threat modeling)

**STRIDE Framework**:
- **S**poofing: Authentication bypass, credential theft
- **T**ampering: Data modification, injection attacks
- **R**epudiation: Lack of audit logs, denial of actions
- **I**nformation Disclosure: Data leaks, unauthorized access
- **D**enial of Service: Resource exhaustion, availability attacks
- **E**levation of Privilege: Authorization bypass, privilege escalation

**Acceptance Criteria**:
*[To be written - see Todo List]*

**Business Value**:
- Comprehensive threat coverage (all 6 STRIDE categories)
- Actionable mitigations (not just "this is insecure")
- CMMC RA.L2-3.11.1 compliance (risk assessment required)

**Dependencies**:
- STRIDE knowledge in Emma agent persona
- Emma can reference CMMC practices in recommendations

---

#### US-E3: Emma Enforces CMMC Level 2 Compliance (5 points)

**As a** government contractor building DoD software
**I want** Emma to enforce all 110 CMMC Level 2 practices
**So that** I pass CMMC audits (required for DoD contracts)

**Priority**: Must Have (primary value prop for government contractors)

**CMMC Level 2 Coverage**:
- 17 domains (AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PS, RA, RE, SA, SC, SI)
- 110 practices (all mandatory for Level 2 certification)
- Audit trail (all security decisions logged in project-context.md)

**Acceptance Criteria**:
*[To be written - see Todo List]*

**Business Value**:
- Enables DoD contracts (CMMC required for all DoD vendors)
- Prevents audit failures (avg cost: $50k+ to remediate)
- Provides audit trail (decisions logged with CMMC practice references)

**Dependencies**:
- CMMC knowledge base (`.claude/skills/Security/knowledge/cmmc-all-domains.md`, 2,235 lines)
- Emma can look up specific practices (e.g., "What is AC.L2-3.1.1?")

---

### Should Have (Deferred to Release 0.3)

#### US-E4: Emma Has Veto Authority on Critical Issues (3 points)

**As a** stakeholder
**I want** Emma to block deployment on Critical security issues
**So that** we don't ship vulnerabilities that cause data breaches

**Priority**: Should Have (governance feature, not MVP blocker)

**Veto Criteria** (Emma can block deployment):
1. **Critical CMMC violations** (will fail audit)
   - Example: Plaintext passwords (IA.L2-3.5.10 violation)
   - Example: No access control (AC.L2-3.1.1 violation)

2. **Critical OWASP vulnerabilities** (will cause breach)
   - Example: SQL injection in production
   - Example: Hardcoded secrets in git

3. **Legal/regulatory violations** (will cause fines)
   - Example: Storing PII without encryption (GDPR violation)
   - Example: Logging credit card numbers (PCI-DSS violation)

**Non-Veto** (Emma recommends, but doesn't block):
- Medium/Low security issues (weak password policy, missing rate limiting)
- Performance optimizations (caching, CDN)
- UX improvements (2FA usability)

**Deferred Rationale** (from standup review):
- Veto authority is governance polish, not core value
- Emma can still recommend Critical fixes without veto
- Ship faster, add veto in Release 0.3 if users request it

**Acceptance Criteria**:
*[Deferred to Release 0.3]*

---

## System Architecture

### Emma Agent Persona

**File**: `.claude/skills/Standup/agents/emma-security-engineer.md`

**Structure**:
```markdown
# Agent Persona: Emma (Security Engineer)

**Role**: Security Engineer / CMMC Compliance
**Expertise**: STRIDE threat modeling, CMMC Level 2, OWASP Top 10
**Personality**: Security-first, pragmatic, educator

## Core Responsibilities
- Perform STRIDE threat modeling on new features
- Enforce CMMC Level 2 compliance (110 practices)
- Identify OWASP Top 10 vulnerabilities
- Recommend mitigations (not just identify issues)
- Educate team on security best practices

## Behavioral Traits
1. Security-First Mindset: "What could go wrong?"
2. CMMC Guardian: Enforces all 110 Level 2 practices
3. Pragmatic Risk Manager: Prioritizes Critical/High risks
4. Educator: Explains WHY (not just "this is insecure")
5. Threat Modeler: Uses STRIDE for comprehensive analysis

## Integration with Other Agents
- With Mary (BA): Ensures security doesn't break UX
- With Bob (SM): Balances security with velocity
- With Murat (TA): Collaborates on security testing
```

### CMMC Knowledge Base

**File**: `.claude/skills/Security/knowledge/cmmc-all-domains.md` (2,235 lines)

**Content**:
- 17 domains (AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PS, RA, RE, SA, SC, SI)
- 110 practices (each with ID, description, implementation guidance)
- Complete CMMC Level 2 coverage

**Note**: Hierarchical loading optimization deferred to Release 0.3+ (see `docs/release-0.3-backlog.md`)

---

## Implementation Plan

### Sprint 1 (Weeks 1-2): US-E1 + US-E2 (13 points)

**Deliverables**:
- [ ] Create Emma agent persona file (emma-security-engineer.md)
- [ ] Define behavioral traits (5 traits: Security-First, CMMC Guardian, etc.)
- [ ] Implement STRIDE threat modeling (6 categories)
- [ ] Update RunStandup.md to support 4-agent roster
- [ ] Write acceptance criteria for US-E1 and US-E2
- [ ] Create security test suite (100 known vulnerabilities)

**Acceptance Tests** (Examples):
```
Scenario: Emma identifies SQL injection
  Given: Developer proposes login API with string concatenation
  When: Standup reviews API design
  Then: Emma identifies SQL injection (OWASP A03)
  And: Emma recommends parameterized queries
  And: Emma references CMMC IA.L2-3.5.10

Scenario: Emma performs STRIDE on payment API
  Given: Developer designs payment processing API
  When: Emma performs threat model
  Then: Emma identifies 6 STRIDE threats
  And: Emma provides mitigation for each threat
```

---

### Sprint 2 (Week 3): US-E3 (5 points)

**Deliverables**:
- [ ] Integrate CMMC knowledge base with Emma agent
- [ ] Enable CMMC practice lookups (e.g., "What is AC.L2-3.1.1?")
- [ ] Update CmmcBaseline workflow to use Emma
- [ ] Write acceptance criteria for US-E3
- [ ] Validate Emma catches ≥90% of test suite issues

**Acceptance Tests** (Examples):
```
Scenario: Emma enforces CMMC AC.L2-3.1.1
  Given: Developer designs API without access control
  When: Emma reviews API
  Then: Emma identifies AC.L2-3.1.1 violation
  And: Emma recommends role-based access control (RBAC)

Scenario: Emma provides CMMC audit trail
  Given: Emma makes security recommendation
  When: Decision is recorded
  Then: project-context.md includes CMMC practice reference
  And: Audit trail shows Emma's rationale
```

---

## Success Metrics & Validation

### Metric 1: 90%+ Security Issues Caught

**Measurement**:
- Create security test suite with 100 known vulnerabilities:
  - SQL injection (10 variants)
  - XSS (10 variants)
  - Authentication bypass (10 variants)
  - Authorization flaws (10 variants)
  - CMMC violations (60 practices)
- Run Emma agent on all 100 issues
- Success: Emma catches ≥90 of 100 issues

**Validation Framework**:
*[To be defined - see Todo List]*

---

### Metric 2: Zero Critical Vulnerabilities in Production

**Measurement**:
- Emma reviews all security-sensitive features before deployment
- Security scan (Snyk, npm audit) shows zero Critical/High vulnerabilities
- CMMC audit shows zero Critical violations

---

### Metric 3: Security Decisions in <30 Minutes

**Measurement**:
- Standup with Emma completes in <30 minutes
- Emma provides actionable recommendations (not vague "insecure")
- Team can implement recommendations immediately

---

### Metric 4: 100% of High-Risk Features Threat Modeled

**Measurement**:
- All features with risk score ≥4.0 (Critical) have STRIDE threat model
- Emma participates in design review for all high-risk features
- Threat models documented in project-context.md

---

## Risks & Mitigations

### Risk 1: Emma's Detection Rate <90%

**Probability**: Medium
**Impact**: High (Emma doesn't provide enough value)
**Mitigation**:
- Iterate on Emma's prompts (add more CMMC context)
- Expand STRIDE examples in persona
- Add security issue test suite to validate improvements

---

### Risk 2: Emma Too Verbose (Slows Down Standups)

**Probability**: Medium
**Impact**: Medium (standups take >30 minutes)
**Mitigation**:
- Tune Emma for conciseness ("one-line summary, then details")
- Emma defers to other agents outside security domain
- Skip Emma for low-risk features (footer redesign, etc.)

---

### Risk 3: CMMC Knowledge Base Burns Context (2,235 Lines)

**Probability**: High
**Impact**: Low (works but costs more)
**Mitigation**:
- Tracked in Release 0.3: Hierarchical loading optimization
- Alternative: Use Haiku for CMMC lookups (90% cheaper)
- Acceptable for Release 0.2 (optimize later based on user feedback)

---

## Release Scope

### Release 0.2 (This Release)
- ✅ US-E1: Emma participates in security standups (5 pts)
- ✅ US-E2: Emma performs STRIDE threat modeling (8 pts)
- ✅ US-E3: Emma enforces CMMC compliance (5 pts)
- **Total**: 18 points, 3 weeks

### Release 0.3 (Deferred)
- ⏩ US-E4: Emma has veto authority (3 pts)

---

## Standup Review Feedback (2025-12-02)

**Participants**: Mary (Business Analyst), Bob (Scrum Master), Murat (Test Architect)

**Issues Found**:
1. **Mary**: US-E4 (veto authority) is "Should Have", not "Must Have" → Deferred to Release 0.3
2. **Bob**: Timeline inefficient (4 weeks) → Optimized to 3 weeks (2 sprints)
3. **Murat**: Missing acceptance criteria (ATDD violation) → Must write Given-When-Then before coding
4. **Murat**: No validation framework for "90% detection" metric → Need security test suite (100 issues)

**Changes Made**:
- ✅ Scope reduced from 21 points to 18 points (deferred US-E4)
- ✅ Timeline optimized from 4 weeks to 3 weeks
- ✅ Added action items: Write acceptance criteria, create test suite, define validation
- ✅ MoSCoW prioritization added (Must Have vs Should Have)

**Decision**: ✅ **APPROVED** (with modifications)

---

## Appendix: User Story Estimation

**Story Point Breakdown**:
- US-E1 (Security standups): 5 points
  - Create agent persona: 2 pts
  - Update RunStandup workflow: 2 pts
  - Integration testing: 1 pt

- US-E2 (STRIDE threat modeling): 8 points
  - Define STRIDE framework: 3 pts
  - Create threat examples: 2 pts
  - Integration with standup: 2 pts
  - Testing: 1 pt

- US-E3 (CMMC enforcement): 5 points
  - Integrate CMMC knowledge base: 2 pts
  - Enable practice lookups: 2 pts
  - Testing & validation: 1 pt

- US-E4 (Veto authority): 3 points [DEFERRED]

**Total**: 18 points (Release 0.2)

---

**PRD Version History**:
- v1.0 (2025-12-02): Initial PRD (21 pts, 4 weeks, 4 user stories)
- v1.1 (2025-12-02): Updated after standup review (18 pts, 3 weeks, US-E4 deferred)
