# Release 0.3 Upstream Contribution - Backlog

**Status**: Planned (not started)
**Scope**: 9 story points (deferred from Release 0.2)
**Timeline**: 1-2 weeks (optional polish)

---

## Overview

Release 0.3 focuses on optimizations and final polish before upstream contribution to PAI ecosystem. All stories are nice-to-have improvements, not critical blockers.

---

## Stories

### Story 0.3-S1: CMMC Hierarchical Loading (3 points)

**Priority**: Should Have (performance optimization)

**Problem**:
`cmmc-all-domains.md` is 2,235 lines, burns context on every Security skill use. Current approach works but is inefficient for focused security reviews.

**Solution**:
Refactor into hierarchical structure:
```
.claude/skills/Security/knowledge/cmmc/
├── quick-reference.md (100 lines)
│   - Overview of all 17 domains
│   - Quick lookup table
│   - When to dive deeper
├── domains/
│   ├── AC-access-control.md (22 practices)
│   ├── AT-awareness-training.md (4 practices)
│   ├── AU-audit-accountability.md (9 practices)
│   ├── CA-security-assessment.md (3 practices)
│   ├── CM-configuration-management.md (9 practices)
│   ├── CP-contingency-planning.md (4 practices)
│   ├── IA-identification-authentication.md (11 practices)
│   ├── IR-incident-response.md (3 practices)
│   ├── MA-maintenance.md (6 practices)
│   ├── MP-media-protection.md (7 practices)
│   ├── PE-physical-protection.md (6 practices)
│   ├── PS-personnel-security.md (2 practices)
│   ├── RA-risk-assessment.md (5 practices)
│   ├── RE-security-assessment.md (1 practice)
│   ├── SA-system-acquisition.md (5 practices)
│   ├── SC-system-communications.md (23 practices)
│   └── SI-system-information-integrity.md (17 practices)
```

**On-Demand Loading**:
- Default: Load `quick-reference.md` (100 lines, not 2,235)
- When needed: "Show me AC.L2-3.1.1" → Load `AC-access-control.md` only
- Comprehensive review: Load all 17 domain files (rare use case)

**Benefits**:
- ✅ Faster context loading (100 lines vs 2,235 lines)
- ✅ Focused reviews (only load relevant domain)
- ✅ Maintain comprehensive coverage (all 110 practices still available)

**Effort**: 3 story points
- 1 pt: Split cmmc-all-domains.md into 18 files (quick-reference + 17 domains)
- 1 pt: Update Security skill to load quick-reference by default
- 1 pt: Update workflows (CmmcBaseline, SecurityReview) to reference specific domains

**Acceptance Criteria**:
- [ ] quick-reference.md covers all 17 domains (overview only)
- [ ] 17 domain files created (one per CMMC domain)
- [ ] Security skill loads quick-reference by default
- [ ] CmmcBaseline workflow can load specific domains on demand
- [ ] All 110 practices still accessible (no content loss)

**Validation**:
- Test: Load Security skill → should load quick-reference (100 lines, not 2,235)
- Test: Ask "What is AC.L2-3.1.1?" → should load AC-access-control.md
- Test: Generate full CMMC baseline → should load all 17 domains

---

### Story 3.6: Agent Cross-Referencing (3 points)

**Priority**: Could Have (quality improvement)

**Problem**:
Agents don't reference past decisions from `project-context.md`. They may re-discuss already-decided topics or contradict previous decisions.

**Solution**:
Enable agents to reference decision history:

**Example**:
```markdown
## Decision: Use PostgreSQL for database (2025-11-01)
**Context**: Choosing database for user data
**Decision**: PostgreSQL
**Rationale**:
  - Mary (BA): 80% of enterprise customers use PostgreSQL
  - Bob (SM): Team has PostgreSQL experience (faster implementation)
  - Murat (TA): PostgreSQL has good test tooling (pg_tap)
**Participants**: Mary, Bob, Murat
**Status**: Implemented
```

**Agent Cross-Reference** (in future standup):
```
User: "Should we use MongoDB for analytics?"

Mary: "I see we previously chose PostgreSQL for user data (Decision 2025-11-01).
       For analytics, MongoDB might be better (document-based queries).
       But mixing databases adds operational complexity.

       Bob, from an ops perspective, do we want to manage 2 databases?"

Bob: "Referencing our PostgreSQL decision: we chose it partly because the team
      knows it well. Adding MongoDB means learning curve + 2 databases to maintain.

      Recommendation: Use PostgreSQL for analytics too (simpler ops),
      unless MongoDB provides 10x better analytics performance."
```

**Benefits**:
- ✅ Consistent decisions (don't contradict past choices)
- ✅ Avoid re-discussing settled topics (efficiency)
- ✅ Build on previous rationale (cumulative wisdom)

**Effort**: 3 story points
- 1 pt: Modify agents to load `project-context.md` before standup
- 1 pt: Add "Past Decisions" section to agent prompts
- 1 pt: Validation (ensure agents actually reference past decisions)

**Acceptance Criteria**:
- [ ] Agents load project-context.md before standup
- [ ] Agents reference past decisions when relevant
- [ ] Agents don't contradict previous decisions (unless user overrides)
- [ ] Decision references include date and participants

**Validation**:
- Test: Make decision A, then ask about related decision B → agents reference decision A
- Test: Ask to reconsider past decision → agents acknowledge past decision before proposing change

---

### Story S-2: Security Agent Veto Authority (3 points)

**Priority**: Should Have (security governance)

**Problem**:
Emma (Security) can recommend against insecure designs, but can't block them. If business pressures override security, insecure code ships.

**Solution**:
Give Emma veto authority on **Critical security issues** (not all issues):

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

**Workflow**:
```
Stakeholder: "Ship this feature even though Emma says there's a security issue."

Emma: "I'm invoking veto authority. This feature has:
       - Critical Issue: SQL injection in login form (OWASP A03)
       - CMMC Impact: Violates IA.L2-3.5.10 (authentication protection)
       - Business Risk: Could lead to data breach ($50k+ fine)

       I BLOCK deployment until SQL injection is fixed.

       Estimated Fix Time: 1 hour (parameterize SQL query)

       Stakeholder, we can ship in 1 hour with the fix. Acceptable?"

Stakeholder: "Yes, fix it and ship."

[OR]

Stakeholder: "I need to ship NOW for a critical demo."

Emma: "Understood. I'm documenting this as a security exception:
       - Waived By: [Stakeholder Name]
       - Reason: Critical customer demo
       - Acceptance: You accept data breach risk
       - Remediation Plan: Fix SQL injection within 24 hours post-demo

       Please sign off on this security exception."
```

**Benefits**:
- ✅ Prevents critical security issues from shipping
- ✅ Forces conscious decision (not accidental oversight)
- ✅ Documents security exceptions (audit trail)

**Effort**: 3 story points
- 1 pt: Define veto criteria (Critical CMMC, Critical OWASP, Legal violations)
- 1 pt: Update Emma agent with veto authority
- 1 pt: Create security exception workflow (for stakeholder overrides)

**Acceptance Criteria**:
- [ ] Emma can block deployment on Critical security issues
- [ ] Emma documents veto rationale (CMMC/OWASP/Legal violation)
- [ ] Emma provides fix timeline estimate
- [ ] Stakeholder can override with signed security exception
- [ ] All security exceptions logged in project-context.md

**Validation**:
- Test: Introduce SQL injection → Emma blocks deployment
- Test: Stakeholder overrides → Emma documents exception
- Test: Medium security issue → Emma recommends, doesn't block

---

## Release 0.3 Summary

**Total Scope**: 9 story points
**Estimated Duration**: 1-2 weeks (low priority, optional polish)

**Value Proposition**:
- Performance: Faster CMMC lookups (hierarchical loading)
- Quality: Consistent decisions (agent cross-referencing)
- Security: Governance enforcement (Emma veto authority)

**Dependencies**: None (Release 0.2 is fully functional without Release 0.3)

**Status**: All stories are nice-to-have optimizations, not blockers for upstream contribution

---

**Last Updated**: 2025-12-02
**Release**: 0.3 Upstream Contribution (Planned)
**Scope**: 9 story points (11% of original 78-point Release 0.2 scope)
