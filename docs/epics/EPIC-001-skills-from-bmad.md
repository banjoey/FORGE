# EPIC-001: Core Skills from BMAD Patterns

**Status**: Planning
**Priority**: High
**Target Release**: FORGE v0.1
**Owner**: @banjoey
**Created**: 2025-12-02

---

## Epic Overview

Create PAI skills that provide enterprise-grade agile workflows, security practices, and testing rigor by adapting BMAD METHOD v6 patterns into reusable PAI skill architecture.

## Business Value

**For Company (Work):**
- CMMC compliance from day one (Security skill)
- Enterprise-quality testing (TestArchitect skill)
- Structured agile workflows (AgilePm skill)
- Audit-ready documentation
- Reduced technical debt

**For Personal Projects (Home):**
- Same professional rigor without complexity
- Reusable patterns across projects
- Learning industry best practices
- Portfolio-quality deliverables

**ROI**: 40+ hours saved per project through automated workflows vs. manual process

## User Stories

### Story 1.1: Agile PM Skill - PRD Creation

**As a** developer starting a new project
**I want** a structured PRD creation workflow
**So that** I have clear requirements before coding

**Acceptance Criteria:**
- [ ] Skill loads with `Skill("agile-pm")`
- [ ] Workflow: `agile-pm/workflows/create-prd.md` exists
- [ ] PRD template follows industry standards
- [ ] Includes: executive summary, system architecture, feature breakdown, implementation checklists
- [ ] Generates project-context.md as "bible" for project
- [ ] Takes 2-5 minutes to generate comprehensive PRD
- [ ] Output is markdown file in project directory

**Technical Notes:**
- Adapt BMAD's 11-step PRD workflow
- Simplify to 6-8 steps for PAI
- Focus on clarity over exhaustiveness
- Support both greenfield and brownfield projects

---

### Story 1.2: Agile PM Skill - Epic Decomposition

**As a** developer with a completed PRD
**I want** to break it into user-value epics
**So that** I can plan work in meaningful chunks

**Acceptance Criteria:**
- [ ] Workflow: `agile-pm/workflows/create-epics.md` exists
- [ ] Reads PRD and architecture docs automatically
- [ ] Groups features by user value themes
- [ ] Each epic has: title, user value, features included, success criteria
- [ ] Epic sizing guidance (S/M/L based on complexity)
- [ ] Outputs: epics.md with complete epic list
- [ ] Epics reference specific PRD sections

**Technical Notes:**
- Load PRD + architecture documents
- Use BMAD's epic template as starting point
- Add epic sizing based on story points
- Support both whole docs and sharded docs

---

### Story 1.3: Agile PM Skill - User Story Generation

**As a** developer planning a sprint
**I want** epics broken into implementable user stories
**So that** I have focused, testable units of work

**Acceptance Criteria:**
- [ ] Workflow: `agile-pm/workflows/create-stories.md` exists
- [ ] Reads epics + PRD + architecture
- [ ] Each story has: title, description, acceptance criteria, story points
- [ ] Stories follow "As a... I want... So that..." format
- [ ] Acceptance criteria are specific and testable
- [ ] Stories sized 1-8 points (Fibonacci)
- [ ] Technical tasks separated from user stories
- [ ] Outputs stories per epic in structured format

**Technical Notes:**
- Ensure stories are independently deliverable
- Include technical dependencies
- Add security requirements per story
- Add test requirements per story

---

### Story 1.4: Agile PM Skill - Sprint Planning

**As a** developer organizing work
**I want** stories organized into sprints
**So that** I can plan realistic iterations

**Acceptance Criteria:**
- [ ] Workflow: `agile-pm/workflows/sprint-planning.md` exists
- [ ] Reads stories and estimates
- [ ] Generates sprint-status.yaml tracking file
- [ ] Suggests story groupings by dependencies
- [ ] Tracks: planned, in-progress, completed, blocked
- [ ] Calculates sprint velocity
- [ ] Warns about overcommitment
- [ ] Updates sprint status as work progresses

**Technical Notes:**
- YAML format for easy parsing
- Support multiple concurrent sprints
- Track blockers and dependencies
- Integration point for daily status reporting

---

### Story 1.5: Security Skill - CMMC Baseline

**As a** company developing software
**I want** CMMC compliance from day one
**So that** we meet DoD cybersecurity requirements

**Acceptance Criteria:**
- [ ] Skill loads with `Skill("security")`
- [ ] Workflow: `security/workflows/cmmc-baseline.md` exists
- [ ] Creates security-baseline.md with CMMC L2/L3 requirements
- [ ] Generates System Security Plan (SSP) template
- [ ] Creates security documentation structure
- [ ] Tracks control implementation status
- [ ] References official CMMC practices
- [ ] Outputs compliance checklist

**Technical Notes:**
- Focus on CMMC Level 2 as baseline
- Support Level 3 for sensitive data
- Reference NIST SP 800-171
- Include evidence collection templates

---

### Story 1.6: Security Skill - Threat Modeling

**As a** architect designing a system
**I want** automated threat modeling
**So that** I identify security risks before coding

**Acceptance Criteria:**
- [ ] Workflow: `security/workflows/threat-model.md` exists
- [ ] Uses STRIDE methodology (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation)
- [ ] Analyzes architecture document automatically
- [ ] Identifies threats per component
- [ ] Rates threats by severity (CVSS scoring)
- [ ] Provides mitigation recommendations
- [ ] Outputs threat-model.md document
- [ ] Integrates with PRD/architecture

**Technical Notes:**
- STRIDE per interaction point
- Focus on data flows and trust boundaries
- Include attack trees for high-severity threats
- Reference OWASP threat modeling guide

---

### Story 1.7: Security Skill - Code Security Review

**As an** engineer implementing features
**I want** automated security code review
**So that** I catch vulnerabilities before deployment

**Acceptance Criteria:**
- [ ] Workflow: `security/workflows/security-review.md` exists
- [ ] Checks OWASP Top 10 vulnerabilities
- [ ] Scans for: SQL injection, XSS, CSRF, insecure deserialization, broken auth, etc.
- [ ] Reviews input validation and output encoding
- [ ] Checks for hardcoded secrets
- [ ] Validates cryptography usage
- [ ] Provides fix recommendations with examples
- [ ] Severity ratings: Critical/High/Medium/Low

**Technical Notes:**
- Pattern-based detection (regex + AST analysis)
- Language-specific checks (JS, Python, Go, etc.)
- Link to CWE database for details
- Integrate with CI/CD for automated checks

---

### Story 1.8: Security Skill - Infrastructure Security

**As a** team deploying infrastructure
**I want** IaC security validation
**So that** our cloud resources are secure by default

**Acceptance Criteria:**
- [ ] Workflow: `security/workflows/infrastructure-security.md` exists
- [ ] Reviews Terraform, CloudFormation, Pulumi, etc.
- [ ] Checks: IAM policies (least privilege), network segmentation, encryption at rest/transit
- [ ] Validates S3 buckets, RDS instances, Lambda functions, etc.
- [ ] Ensures logging and monitoring configured
- [ ] Checks for public exposure of sensitive resources
- [ ] CMMC control mapping for infrastructure
- [ ] Outputs infrastructure-security-report.md

**Technical Notes:**
- Use checkov/tfsec patterns as reference
- Cloud-specific checks (AWS, Azure, GCP)
- Kubernetes security if applicable
- Secrets management validation (Vault, KMS, etc.)

---

### Story 1.9: Test Architect Skill - ATDD Workflow

**As a** team starting implementation
**I want** tests written BEFORE code
**So that** we have clear success criteria and prevent bugs

**Acceptance Criteria:**
- [ ] Skill loads with `Skill("test-architect")`
- [ ] Workflow: `test-architect/workflows/atdd.md` exists
- [ ] Reads user story acceptance criteria
- [ ] Generates E2E test scenarios FIRST
- [ ] Test formats: Gherkin (BDD), Playwright, Cypress
- [ ] Covers happy path + edge cases + error cases
- [ ] Tests are executable (not just documentation)
- [ ] Red-Green-Refactor cycle guidance

**Technical Notes:**
- Acceptance Test-Driven Development
- Tests define "done" before coding starts
- Focus on business value validation
- Integration with CI/CD

---

### Story 1.10: Test Architect Skill - Risk-Based Testing

**As a** team with limited testing time
**I want** risk-based test prioritization
**So that** we test high-impact areas first

**Acceptance Criteria:**
- [ ] Workflow: `test-architect/workflows/risk-based-testing.md` exists
- [ ] Analyzes codebase for risk factors: complexity, change frequency, business criticality
- [ ] Prioritizes testing effort by risk score
- [ ] Recommends test types per component (unit, integration, E2E)
- [ ] Calculates required test coverage by risk level
- [ ] High-risk = 90%+ coverage, Medium = 70%+, Low = 50%+
- [ ] Outputs test-strategy.md document

**Technical Notes:**
- Complexity metrics (cyclomatic, cognitive)
- Change frequency from git history
- Business criticality from PRD/epics
- Test ROI calculation

---

### Story 1.11: Test Architect Skill - CI/CD Quality Gates

**As a** team deploying frequently
**I want** automated quality gates in CI/CD
**So that** we prevent bad code from reaching production

**Acceptance Criteria:**
- [ ] Workflow: `test-architect/workflows/ci-integration.md` exists
- [ ] Generates GitHub Actions / GitLab CI configs
- [ ] Quality gates: test coverage %, test pass rate, security scan, code quality
- [ ] Blocks merge if gates fail
- [ ] Supports: unit tests, integration tests, E2E tests, security scans, performance tests
- [ ] Configurable thresholds per gate
- [ ] Outputs .github/workflows/quality-gates.yml

**Technical Notes:**
- Platform-agnostic where possible
- Support major CI/CD platforms
- Fast feedback loops (parallel test execution)
- Status reporting integration

---

## Dependencies

**External:**
- PAI fork cloned and accessible
- Understanding of PAI's skill system architecture
- BMAD METHOD v6 for reference patterns

**Internal (Story Dependencies):**
```
Story 1.1 (PRD) → Story 1.2 (Epics) → Story 1.3 (Stories) → Story 1.4 (Sprint Planning)
                                                          ↘
Story 1.5 (CMMC) → Story 1.6 (Threat Model) → Story 1.7 (Code Review) → Story 1.8 (Infra Security)
                                              ↗
Story 1.9 (ATDD) → Story 1.10 (Risk Testing) → Story 1.11 (CI/CD Gates)
```

**Skills build independently but integrate together**

---

## Definition of Done

**For Epic:**
- [ ] All 11 user stories completed
- [ ] All acceptance criteria met for each story
- [ ] Skills tested in real project (work + home)
- [ ] Documentation complete for each skill
- [ ] Examples provided for each workflow
- [ ] Integration tested (skills work together)
- [ ] Code reviewed and quality-checked
- [ ] Ready for PR to upstream PAI

**For Each Story:**
- [ ] Workflow markdown file created
- [ ] Template files created (if applicable)
- [ ] Knowledge base populated (if applicable)
- [ ] Manual testing completed
- [ ] Documentation written
- [ ] Example usage demonstrated
- [ ] Committed to FORGE repo

---

## Technical Implementation Notes

### Skill Directory Structure

**IMPORTANT**: PAI requires TitleCase naming for all skills per SkillSystem.md standard.

```
.claude/skills/
├── AgilePm/                         # TitleCase (was agile-pm)
│   ├── skill.md                     # Skill definition with USE WHEN
│   ├── METHODOLOGY.md               # Agile principles
│   ├── workflows/
│   │   ├── CreatePrd.md             # Story 1.1 (TitleCase)
│   │   ├── CreateEpics.md           # Story 1.2
│   │   ├── CreateStories.md         # Story 1.3
│   │   ├── SprintPlanning.md        # Story 1.4
│   │   └── Validation.md            # Second-pass review
│   ├── templates/
│   │   ├── prd-template.md
│   │   ├── epic-template.md
│   │   ├── story-template.md
│   │   ├── sprint-status.yaml
│   │   └── project-context.md
│   ├── knowledge/
│   │   ├── story-patterns.md
│   │   └── epic-sizing.md
│   └── tools/                       # Required by PAI standard
├── Security/                        # TitleCase (was security)
│   ├── skill.md                     # With USE WHEN
│   ├── workflows/
│   │   ├── CmmcBaseline.md          # Story 1.5 (TitleCase)
│   │   ├── ThreatModel.md           # Story 1.6
│   │   ├── SecurityReview.md        # Story 1.7
│   │   └── InfrastructureSecurity.md # Story 1.8
│   ├── templates/
│   │   ├── security-baseline.md
│   │   ├── threat-model-template.md
│   │   └── cmmc-ssp-template.md
│   ├── knowledge/
│   │   ├── cmmc-level-2.md
│   │   ├── cmmc-level-3.md
│   │   ├── stride-methodology.md
│   │   ├── owasp-top-10.md
│   │   └── aws-security-best-practices.md
│   └── tools/                       # Required
└── TestArchitect/                   # TitleCase (was test-architect)
    ├── skill.md                     # With USE WHEN
    ├── workflows/
    │   ├── Atdd.md                  # Story 1.9 (TitleCase)
    │   ├── RiskBasedTesting.md      # Story 1.10
    │   └── CiIntegration.md         # Story 1.11
    ├── templates/
    │   ├── test-plan.md
    │   ├── test-scenario.md
    │   └── quality-gates.yml
    ├── knowledge/
    │   ├── atdd-patterns.md
    │   ├── playwright-examples.md
    │   └── risk-metrics.md
    └── tools/                       # Required
```

### Required skill.md Format (PAI Standard)

Each skill MUST include:

**AgilePm/skill.md:**
```markdown
---
name: AgilePm
description: Enterprise agile product management workflows for PAI. USE WHEN user needs PRD creation, epic decomposition, user story generation, sprint planning, or structured agile project management. Provides BMAD-quality rigor with PAI simplicity.
---

# AgilePm

Structured agile workflows for professional software development.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| CreatePrd | Starting new project or feature | Comprehensive PRD with architecture |
| CreateEpics | Breaking down PRD into deliverable chunks | Epic list with user value themes |
| CreateStories | Planning sprint or implementation | User stories with acceptance criteria |
| SprintPlanning | Organizing work into iterations | sprint-status.yaml tracking file |

## Examples

### Example 1: Create PRD for new feature
```
User: "Create a PRD for user authentication system"
Skill loads: AgilePm → CreatePrd workflow
Output: PRD with exec summary, architecture, features, checklist
```

### Example 2: Break PRD into epics
```
User: "Break this PRD into epics"
Skill loads: AgilePm → CreateEpics workflow
Output: epics.md with user-value grouped features
```

### Example 3: Generate user stories
```
User: "Create user stories for Epic 1"
Skill loads: AgilePm → CreateStories workflow
Output: stories.md with acceptance criteria and story points
```

## Integration

- Works with Security skill (adds security reqs to stories)
- Works with TestArchitect skill (adds test strategy to PRD)
- Generates project-context.md as "bible" for project
```

**Security/skill.md:**
```markdown
---
name: Security
description: CMMC-compliant security workflows including threat modeling (STRIDE), code review (OWASP Top 10), infrastructure security, and compliance baseline. USE WHEN user needs security analysis, CMMC compliance, threat assessment, or vulnerability detection. DoD-grade rigor.
---

# Security

Enterprise security and CMMC compliance for PAI projects.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| CmmcBaseline | Starting CMMC-compliant project | security-baseline.md with L2/L3 requirements |
| ThreatModel | Designing system architecture | threat-model.md with STRIDE analysis |
| SecurityReview | Code review for vulnerabilities | Security findings with severity ratings |
| InfrastructureSecurity | Reviewing IaC (Terraform, etc.) | Infrastructure security report |

## Examples

### Example 1: Create CMMC baseline
```
User: "Set up CMMC Level 2 baseline for this project"
Skill loads: Security → CmmcBaseline workflow
Output: security-baseline.md with all 110 practices mapped
```

### Example 2: Threat model architecture
```
User: "Threat model this authentication design"
Skill loads: Security → ThreatModel workflow
Output: threat-model.md with STRIDE per component
```

### Example 3: Security code review
```
User: "Review this code for security issues"
Skill loads: Security → SecurityReview workflow
Output: Vulnerabilities found with CVSS scores and fixes
```
```

**TestArchitect/skill.md:**
```markdown
---
name: TestArchitect
description: Test-first development with ATDD (Acceptance Test-Driven Development), risk-based test prioritization, and CI/CD quality gates. USE WHEN user needs test strategy, quality assurance, test coverage analysis, or testing workflows. Write tests BEFORE code.
---

# TestArchitect

Test-first quality assurance for PAI projects.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| Atdd | Starting story implementation | E2E test scenarios before code |
| RiskBasedTesting | Planning test coverage | test-strategy.md with prioritized testing |
| CiIntegration | Setting up quality gates | CI/CD config with automated checks |

## Examples

### Example 1: ATDD for user story
```
User: "Create tests for Story 3.2 (User login)"
Skill loads: TestArchitect → Atdd workflow
Output: E2E test scenarios in Gherkin/Playwright format
```

### Example 2: Risk-based test strategy
```
User: "Create test strategy for this codebase"
Skill loads: TestArchitect → RiskBasedTesting workflow
Output: test-strategy.md with coverage targets by risk
```

### Example 3: CI/CD quality gates
```
User: "Set up quality gates for GitHub Actions"
Skill loads: TestArchitect → CiIntegration workflow
Output: .github/workflows/quality-gates.yml
```
```

---

## Success Metrics

**Quantitative:**
- 3 skills created (AgilePm, Security, TestArchitect)
- 11+ workflows implemented
- 10+ templates created
- 15+ knowledge base documents
- 2+ real projects using skills (work + home)
- <5 minutes to generate PRD with epics/stories
- <2 minutes for threat model
- <3 minutes for complete test strategy

**Qualitative:**
- Architect agent successfully uses AgilePm skill
- Engineer agent successfully uses security + TestArchitect skills
- Generated PRDs meet professional standards
- Security analysis catches real vulnerabilities
- Test strategies provide clear coverage guidance
- Team (colleagues) can use skills without training

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Skills too complex for PAI architecture | High | Low | Start simple, iterate based on testing |
| BMAD patterns don't translate well | Medium | Medium | Adapt freely, don't copy verbatim |
| Security knowledge base becomes stale | Medium | High | Version control, update quarterly |
| Over-engineering workflows | Medium | High | Start with MVP, add complexity only if needed |
| Skills conflict with each other | High | Low | Integration testing, clear interfaces |

---

## Timeline Estimate

**Story Points Total:** 55 points (using Fibonacci scale)

**Sprint 1 (Week 1-2): Agile PM Foundation**
- Story 1.1: PRD Creation (8 points)
- Story 1.2: Epic Decomposition (5 points)
- Total: 13 points

**Sprint 2 (Week 3-4): Agile PM Complete + Security Start**
- Story 1.3: User Stories (8 points)
- Story 1.4: Sprint Planning (5 points)
- Story 1.5: CMMC Baseline (8 points)
- Total: 21 points

**Sprint 3 (Week 5-6): Security Complete**
- Story 1.6: Threat Modeling (8 points)
- Story 1.7: Code Security (5 points)
- Story 1.8: Infrastructure Security (5 points)
- Total: 18 points

**Sprint 4 (Week 7-8): Test Architect**
- Story 1.9: ATDD (5 points)
- Story 1.10: Risk-Based Testing (5 points)
- Story 1.11: CI/CD Gates (8 points)
- Total: 18 points

**Sprint 5 (Week 9): Integration & Polish**
- Integration testing
- Documentation
- Examples
- Bug fixes

**Total Timeline:** ~9 weeks (2 months)

---

## Next Steps

1. **Review & Approve Epic** - Validate scope and priorities
2. **Create Story Branches** - Set up git workflow
3. **Start Sprint 1** - Begin with PRD creation workflow
4. **Daily Progress** - Track velocity and adjust estimates
5. **Weekly Demos** - Test with real projects, gather feedback

---

**Questions? Clarifications needed? Ready to start implementation!**
