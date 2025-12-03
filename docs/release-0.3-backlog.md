# Release 0.3 Upstream Contribution - Backlog

**Status**: ❌ CANCELLED (2025-12-02)
**Original Scope**: 9 story points (3 optimization stories)
**Decision**: All stories are premature optimizations - defer until user feedback

---

## Overview

Release 0.3 was originally planned for optimizations and final polish before upstream contribution. However, after dogfooding FORGE on itself (multi-agent standup review), we identified that all 3 stories are **premature optimizations** with no validated user pain points.

**Decision (2025-12-02)**: Cancel Release 0.3, ship Release 0.2 (Emma agent) directly to upstream contribution.

**Rationale**:
- No user feedback yet (no validation these optimizations are needed)
- Low ROI (3-year break-even for CMMC optimization)
- Regression risk outweighs marginal gains
- Better to ship, gather users, optimize based on feedback

**Next Steps**:
- Complete Release 0.2 (Emma agent, 18 points, 3 weeks)
- Contribute FORGE upstream to PAI ecosystem
- Gather usage data and user feedback
- Revisit these optimizations IF users request them

---

## Stories

### Story 0.3-S1: CMMC Hierarchical Loading (3 points) - ❌ REJECTED

**Original Priority**: Should Have (performance optimization)
**Decision (2025-12-02)**: ❌ REJECTED after multi-agent standup review

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

**Standup Review (2025-12-02)**:

*Participants*: Mary (Business Analyst), Bob (Scrum Master), Murat (Test Architect)

**Issues Found**:
1. **Mary**: Poor ROI - $0.18/standup savings requires 1,667 standups to break even (3 years)
   - Alternative: Use Haiku for CMMC lookups (90% cheaper, no refactoring)
   - No validated user pain point (no feedback saying "CMMC loading is slow")

2. **Bob**: Premature optimization
   - Delays upstream contribution by 1-2 weeks
   - No usage data to validate this is a problem
   - Better to ship, gather users, optimize based on feedback

3. **Murat**: High regression risk for marginal gain
   - Splitting 2,235-line file risks content loss or errors
   - Testing effort = 67% of story (2 hours testing for 3-point story)
   - "Don't fix what isn't broken" - current system works

**Decision**: ❌ **REJECTED** (unanimous)
- Save 3 story points (1 week of work)
- Avoid regression risk
- Ship Release 0.2 faster
- Revisit IF users report performance issues

**Outcome**: Dogfooding FORGE on itself prevented 3 story points of wasted work ✅

---

### Story 3.6: Agent Cross-Referencing (3 points) - ⏩ DEFERRED

**Original Priority**: Could Have (quality improvement)
**Decision (2025-12-02)**: ⏩ DEFERRED until user feedback

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

**Deferral Rationale**:
- No user validation that agents contradict past decisions (hypothetical problem)
- Better to ship Release 0.2, gather feedback on whether this is actual pain point
- Revisit IF users report: "Agents keep re-discussing settled decisions"

---

### Story S-2: Security Agent Veto Authority (3 points) - ⏩ MOVED TO EMMA AGENT

**Original Priority**: Should Have (security governance)
**Decision (2025-12-02)**: ⏩ MOVED to Emma agent as US-E4 (deferred to future release)

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

**Move Rationale**:
- Veto authority is Emma-specific feature (not general standup feature)
- Belongs in Emma agent PRD (US-E4)
- Deferred from Release 0.2 to future release (see `docs/PRD-emma-security-agent.md`)
- Emma can still recommend Critical fixes without veto (MVP sufficient)

---

## Release 0.3 Summary

**Total Scope**: ❌ 0 story points (all 3 stories cancelled/deferred/moved)
**Status**: CANCELLED (2025-12-02)

**Original Value Proposition** (all cancelled/deferred):
- ❌ Performance: Faster CMMC lookups (hierarchical loading) - REJECTED (poor ROI)
- ⏩ Quality: Consistent decisions (agent cross-referencing) - DEFERRED (no user validation)
- ⏩ Security: Governance enforcement (Emma veto authority) - MOVED to Emma agent US-E4

**Decision Impact**:
- ✅ Saved 3 story points (CMMC optimization rejected)
- ✅ Faster to upstream contribution (no Release 0.3 delay)
- ✅ Avoided regression risk (no 2,235-line file refactor)
- ✅ Ship-and-iterate approach (optimize based on user feedback)

**New Plan**:
```
Release 0.1 MVP: ✅ COMPLETE (26 pts, 3.67x validation passed)
Release 0.2 Enterprise: ⏳ IN PROGRESS (Emma agent, 18 pts, 3 weeks)
Release 0.3: ❌ CANCELLED (all stories premature optimizations)
Upstream Contribution: 🚀 NEXT (after Release 0.2)
```

---

**Last Updated**: 2025-12-02
**Release**: 0.3 Upstream Contribution (CANCELLED)
**Original Scope**: 9 story points (3 stories, all cancelled/deferred/moved)
**Final Scope**: 0 story points

**Dogfooding Impact**: Multi-agent standup review prevented 3+ story points of wasted work ✅
