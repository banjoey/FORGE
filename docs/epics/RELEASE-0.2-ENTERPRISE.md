# FORGE Release 0.2 - Enterprise Security & Testing

**Status**: Planning
**Goal**: Add enterprise-grade security and testing rigor to FORGE
**Timeline**: 8-10 weeks (63 story points + gap fixes)
**Owner**: @banjoey
**Depends On**: Release 0.1 MVP (standup validated)
**Created**: 2025-12-02

---

## Executive Summary

**Release 0.1 MVP Delivers**: AgilePm skill + 3 agents + core standup (60 pts)
**Release 0.2 Adds**: Security & TestArchitect skills + security gaps + testing improvements

### Why This Release?

After proving standup value in 0.1, Release 0.2 adds:
1. **Security skill** - CMMC compliance, threat modeling, code/infra security
2. **TestArchitect skill** - ATDD, risk-based testing, CI/CD gates
3. **Security gap fixes** - 10 critical gaps from security review
4. **Testing improvements** - 5 critical gaps from testing review
5. **Advanced standup** - Remaining features from EPIC-003

### Business Value

**For Work Projects**:
- Full CMMC Level 2 compliance (all 17 domains)
- DoD-grade security from day one
- Automated threat modeling and vulnerability detection
- Test-first development enforcement

**For Home Projects**:
- Professional security rigor without complexity
- Risk-based testing (don't over-test simple projects)
- CI/CD quality gates prevent bugs in production

---

## Release 0.2 Scope

### Deferred from Original Release 0.1

**EPIC-001 Completion: Security & TestArchitect Skills (29 points)**
- Stories 1.5-1.8: Security skill (26 pts total with gaps)
- Stories 1.9-1.11: TestArchitect skill (18 pts)

**EPIC-002 Completion: Additional Agents (11 points)**
- Story 2.3: Scrum Master Agent (Bob) (3 pts)
- Story 2.4: Test Architect Agent (Murat) (5 pts)
- Story 2.5: Business Analyst Agent (Mary) (3 pts)

**EPIC-003 Completion: Advanced Standup (13 points)**
- Story 3.4: Transparent Coordination (5 pts)
- Story 3.5: Interactive vs. Autonomous Mode (5 pts)
- Story 3.6: Agent Cross-Referencing (3 pts)

### NEW: Security Gap Fixes (18 points)

**From Security Review - 10 Critical Gaps Identified:**

**Story S-1: Expand CMMC Coverage to All 17 Domains** (8 points)
- **Current**: Only 5 domains covered (AC, IA, SC, SI, CM)
- **Missing**: 12 domains (AU, AT, CA, CP, IR, MA, MP, PE, PS, RA, RE, SA)
- **Deliverable**: security/knowledge/ docs for all 17 domains
- **Acceptance Criteria**:
  - [ ] All 17 CMMC domains documented in knowledge base
  - [ ] Each domain includes: practices, implementation guidance, evidence collection
  - [ ] CmmcBaseline workflow updated to generate baseline for all domains
  - [ ] Level 2 (110 practices) and Level 3 (130 practices) both supported

**Story S-2: Security Agent Veto Authority** (5 points)
- **Problem**: Sam can warn but not BLOCK insecure decisions
- **Solution**: Add veto power to security agent in standup mode
- **Deliverable**: Standup orchestration updated with security veto
- **Acceptance Criteria**:
  - [ ] Security agent can BLOCK decisions that fail CMMC/OWASP checks
  - [ ] Veto includes: rationale, severity, remediation guidance
  - [ ] User can override veto with explicit acknowledgment (logged)
  - [ ] Veto triggers only on Critical/High severity issues

**Story S-3: Cross-Project Data Isolation** (3 points)
- **Problem**: Standup conversations risk CUI data leakage between projects
- **Solution**: Classification-based isolation boundaries
- **Deliverable**: project-context.md includes data classification
- **Acceptance Criteria**:
  - [ ] Projects tagged with data classification (Public, Internal, CUI, Classified)
  - [ ] Standup enforces: CUI project data never shared with Public projects
  - [ ] Cross-project context filtered by classification level
  - [ ] Audit log tracks data access across project boundaries

**Story S-4: Secrets Management** (2 points)
- **Problem**: profile.json, conversation logs lack encryption/access control
- **Solution**: Encrypt sensitive data, implement access controls
- **Acceptance Criteria**:
  - [ ] profile.json encrypted at rest (use OS keychain: macOS Keychain, Windows Credential Manager)
  - [ ] Standup conversation logs encrypted (contains decisions, potentially CUI)
  - [ ] API keys/tokens never stored in plaintext
  - [ ] CMMC practice IA.L2-3.5.10 (protect confidentiality of CUI at rest)

### NEW: Testing Gap Fixes (10 points)

**From Testing Review - 5 Critical Gaps Identified:**

**Story T-1: ATDD Enforcement Mechanism** (3 points)
- **Problem**: "Tests first" is aspirational, not enforced
- **Solution**: Workflow checks for test files before allowing implementation
- **Acceptance Criteria**:
  - [ ] Atdd workflow generates test file(s) in tests/ directory
  - [ ] Git pre-commit hook checks: "Does story branch have test file?"
  - [ ] CI/CD fails if test file missing for story branch
  - [ ] Developer can override with explicit flag (logged as technical debt)

**Story T-2: Risk Scoring Automation** (3 points)
- **Problem**: Risk calculation too manual (complexity + change frequency + business criticality)
- **Solution**: Automate risk scoring from codebase analysis
- **Acceptance Criteria**:
  - [ ] Complexity: Automated via cyclomatic complexity analysis (complexity > 10 = High risk)
  - [ ] Change frequency: Git history analysis (changed >10 times in 90 days = High risk)
  - [ ] Business criticality: Read from PRD/epic (tagged by PM)
  - [ ] Risk score calculated: (Complexity score × 0.4) + (Change frequency × 0.3) + (Business criticality × 0.3)
  - [ ] Output: risk-map.json with per-file risk scores

**Story T-3: Murat Behavioral Validation** (2 points)
- **Problem**: No test plan for "Murat prioritizes by risk" consistently
- **Solution**: Create behavioral test suite for Test Architect agent
- **Acceptance Criteria**:
  - [ ] 10 test scenarios where Murat must prioritize correctly
  - [ ] Scenario 1: High-risk auth component → Murat demands 95%+ coverage
  - [ ] Scenario 2: Low-risk UI form → Murat accepts 50% coverage
  - [ ] Scenario 3: Flaky test detected → Murat demands fix or deletion
  - [ ] Validation: Murat makes correct risk call in 9/10 scenarios

**Story T-4: Standup Quality Metrics** (1 point)
- **Problem**: "Better outcomes" is subjective
- **Solution**: Define concrete metrics for standup quality
- **Acceptance Criteria**:
  - [ ] Metric 1: Issues found (count security gaps, edge cases, UX concerns)
  - [ ] Metric 2: Decision completeness (all acceptance criteria addressed?)
  - [ ] Metric 3: CMMC compliance (any gaps remaining?)
  - [ ] Metric 4: Test coverage (is test strategy comprehensive?)
  - [ ] Documented in: standup-metrics.md

**Story T-5: PRD Quality Rubric** (1 point)
- **Problem**: Week 2 validation gate needs rubric - undefined
- **Solution**: Create scoring rubric for PRD quality
- **Acceptance Criteria**:
  - [ ] Rubric scores: Executive Summary (2 pts), Architecture (2 pts), Features (2 pts), Checklist (2 pts), Clarity (2 pts)
  - [ ] Total score: 10 points
  - [ ] ≥8/10 = Pass validation gate
  - [ ] Documented in: AgilePm/knowledge/prd-rubric.md

---

## Sprint Breakdown

### Sprint 1-2 (Weeks 1-4): Security Skill Complete

**Goal**: Build Security skill with CMMC compliance
**Story Points**: 26 points

**Stories**:
- 1.5: CMMC Baseline (8 pts)
- 1.6: Threat Modeling (8 pts)
- 1.7: Code Security Review (5 pts)
- 1.8: Infrastructure Security (5 pts)
- **S-1**: Expand CMMC to All 17 Domains (8 pts) - CRITICAL
- **S-3**: Cross-Project Data Isolation (3 pts)
- **S-4**: Secrets Management (2 pts)

**Deliverables**:
- Security/ skill directory (TitleCase, USE WHEN, Examples)
- 4 workflows: CmmcBaseline, ThreatModel, SecurityReview, InfrastructureSecurity
- Knowledge base: All 17 CMMC domains (Level 2 + Level 3)
- Templates: security-baseline.md, threat-model.md, cmmc-ssp.md
- Data classification and encryption implemented

**Validation**:
- Generate CMMC baseline for real project
- Baseline covers all 17 domains
- Threat model identifies real vulnerabilities
- Data classification prevents CUI leakage

---

### Sprint 3-4 (Weeks 5-8): TestArchitect Skill Complete

**Goal**: Build TestArchitect skill with ATDD enforcement
**Story Points**: 23 points

**Stories**:
- 1.9: ATDD Workflow (5 pts)
- 1.10: Risk-Based Testing (5 pts)
- 1.11: CI/CD Quality Gates (8 pts)
- **T-1**: ATDD Enforcement Mechanism (3 pts) - CRITICAL
- **T-2**: Risk Scoring Automation (3 pts)
- **T-5**: PRD Quality Rubric (1 pt)

**Deliverables**:
- TestArchitect/ skill directory
- 3 workflows: Atdd, RiskBasedTesting, CiIntegration
- Pre-commit hook enforces tests-first
- Automated risk scoring from codebase
- CI/CD quality gate templates (GitHub Actions, GitLab CI)
- PRD quality rubric

**Validation**:
- ATDD workflow generates executable tests
- Risk scoring correctly identifies high-risk components
- Quality gates block bad code in CI/CD
- PRD rubric produces consistent scores

---

### Sprint 5 (Weeks 9-10): Additional Agents & Standup Polish

**Goal**: Complete agent roster and advanced standup features
**Story Points**: 19 points

**Stories**:
- 2.3: Scrum Master Agent (Bob) (3 pts)
- 2.4: Test Architect Agent (Murat) (5 pts)
- 2.5: Business Analyst Agent (Mary) (3 pts)
- 3.4: Transparent Coordination (5 pts)
- 3.5: Interactive vs. Autonomous Mode (5 pts)
- 3.6: Agent Cross-Referencing (3 pts)
- **S-2**: Security Agent Veto Authority (5 pts) - CRITICAL
- **T-3**: Murat Behavioral Validation (2 pts)
- **T-4**: Standup Quality Metrics (1 pt)

**Deliverables**:
- 3 new agents: Scrum Master, Test Architect, Business Analyst
- Security veto in standup orchestration
- Transparent coordination messaging
- Mode detection (interactive vs. autonomous)
- Agent cross-referencing enabled
- Murat behavioral test suite
- Standup quality metrics defined

**Validation**:
- All 5 agents sound distinct
- Security can block insecure decisions
- Standup metrics capture quality improvements
- Murat passes 9/10 behavioral tests

---

## Definition of Done (Release 0.2)

### Technical Complete
- [ ] Security skill implemented (4 workflows, all 17 CMMC domains)
- [ ] TestArchitect skill implemented (3 workflows, enforcement, automation)
- [ ] 5 total agents (PM, Architect, Security, Scrum Master, Test Architect, Analyst)
- [ ] Advanced standup features (transparency, mode detection, cross-referencing)
- [ ] All 10 security gaps addressed
- [ ] All 5 testing gaps addressed
- [ ] Code committed to FORGE repo

### Security Complete
- [ ] All 17 CMMC domains covered (Level 2 baseline = 110 practices)
- [ ] Security veto authority functional
- [ ] Cross-project data isolation enforced
- [ ] Secrets encrypted (profile.json, conversation logs)
- [ ] Threat modeling finds real vulnerabilities
- [ ] Code security review catches OWASP Top 10

### Testing Complete
- [ ] ATDD enforcement prevents code-before-tests
- [ ] Risk scoring automated from codebase analysis
- [ ] Murat behavioral validation 9/10 pass rate
- [ ] Standup quality metrics defined and measured
- [ ] PRD quality rubric produces consistent scores
- [ ] CI/CD quality gates functional

### Real-World Validation
- [ ] Used on ≥2 real projects (1 work CMMC project, 1 home project)
- [ ] CMMC baseline generated and validated by compliance expert
- [ ] Threat model reviewed by security engineer
- [ ] ATDD workflow used in real sprint
- [ ] Standup with all 5 agents demonstrates value

---

## Success Metrics (Release 0.2)

### Quantitative
- [ ] All 17 CMMC domains covered (110 practices Level 2, 130 practices Level 3)
- [ ] Security veto blocks ≥3 insecure decisions in testing
- [ ] ATDD enforcement: 100% of stories have tests before code
- [ ] Risk scoring accuracy: >85% correct classification (High/Med/Low)
- [ ] Standup quality: 5-agent discussions find 3x more issues than 3-agent (validated across 5 A/B tests)
- [ ] Zero CUI data leakage across projects (audit log check)

### Qualitative
- [ ] CMMC baseline passes external compliance audit
- [ ] Security veto decisions are reasonable (not over-blocking)
- [ ] ATDD workflow feels natural (not bureaucratic)
- [ ] Risk scoring matches expert judgment
- [ ] 5-agent standup provides value over 3-agent
- [ ] User reports: "Security rigor without complexity" (survey >4/5)

---

## Risks & Mitigation (Release 0.2)

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **CMMC knowledge becomes stale** | High | High | Version control, quarterly updates, cite sources |
| **Security veto too aggressive** | Medium | Medium | Severity thresholds, user override with acknowledgment |
| **ATDD enforcement too rigid** | Medium | Medium | Override flag for edge cases, track as technical debt |
| **5 agents = overcomplicated** | Medium | Low | A/B test 3-agent vs. 5-agent standup, measure value |
| **Timeline still aggressive** | Medium | Medium | Track velocity, defer lower-priority features if needed |

---

## Timeline Estimate

**Story Points Total**: 78 points (original 63 + 15 gap fixes)

**Conservative Estimate**: 10 weeks
**Optimistic Estimate**: 8 weeks
**Realistic Estimate**: 9 weeks

**Sprint Breakdown**:
- Weeks 1-4: Security skill + security gaps (26 pts)
- Weeks 5-8: TestArchitect skill + testing gaps (23 pts)
- Weeks 9-10: Agents + standup polish (19 pts)
- **Total**: 68 points / 8 pts per week = 8.5 weeks (round to 9-10 weeks)

---

## Integration with Release 0.1 MVP

**MVP (0.1) Proves**: Standup conversation value
**Enterprise (0.2) Adds**: Security + Testing rigor

**Together (0.1 + 0.2)**:
- Complete skill set: AgilePm + Security + TestArchitect
- Complete agent roster: PM, Architect, Security, SM, Test Architect, Analyst
- Full standup capabilities: 3-agent or 5-agent, all features
- CMMC Level 2 ready
- Test-first enforced
- Enterprise-grade quality

---

## What's Still Deferred to Release 0.3

**EPIC-004: PAI Customization (21 points)**
- All 6 stories deferred to Release 0.3
- De-personalize PAI (remove "Kai"/"Daniel" hardcoding)
- Installation wizard
- Team configuration
- Company branding

**Reasoning**: Focus 0.1 + 0.2 on core capabilities, save customization for 0.3

---

## Comparison: Releases Side-by-Side

| Feature | 0.1 MVP | 0.2 Enterprise | 0.3 Customization |
|---------|---------|----------------|-------------------|
| **Skills** | AgilePm | + Security, TestArchitect | (No new skills) |
| **Agents** | PM, Arch, Security | + SM, Test Arch, Analyst | (No new agents) |
| **Standup** | Core (activation, conversation, synthesis) | + Advanced (transparency, modes, cross-ref) | (No standup changes) |
| **Security** | Basic (agent only) | CMMC all 17 domains, veto, isolation | (No changes) |
| **Testing** | None | ATDD enforced, risk automation, quality gates | (No changes) |
| **Customization** | Hardcoded "PAI" | Hardcoded "PAI" | Fully customizable |
| **Timeline** | 8-10 weeks | 8-10 weeks | 3-4 weeks |
| **Story Points** | 60 | 78 | 21 |

---

## Next Steps (After Release 0.1 MVP Complete)

1. **Validate MVP Success**: Did standup prove 2x better outcomes?
2. **Review 0.2 Scope**: Are security gaps still priorities?
3. **Start Sprint 1 (Security)**: Begin CMMC all-domain coverage
4. **Recruit Compliance Expert**: External validation for CMMC baseline
5. **Set Up ATDD Test Environment**: Playwright/Cypress integration

---

**FORGE Release 0.2: Enterprise-grade security and testing rigor for real-world deployment!**
