# Standup Coordination Guide

**Purpose**: How agents communicate and coordinate in FORGE multi-agent standups

**Status**: Transparent Coordination (Sprint 5, Story 3.4)

---

## Coordination Principles

### 1. Synthesis Over Voting
**Principle**: Agents don't "vote" on decisions. They collaborate to synthesize the best solution.

**Example**:
```
❌ BAD (Voting):
  Mary: "I vote for Option A"
  Clay: "I vote for Option B"
  Hefley: "I vote for Option A"
  Result: Option A wins 2-1

✅ GOOD (Synthesis):
  Mary: "Option A delivers user value faster (8 hrs vs 16 hrs)"
  Clay: "Option B fits our sprint capacity better (no scope creep)"
  Hefley: "Option A needs 90% test coverage, Option B needs 70%"

  Synthesis: "Let's do Option A MVP (5 hrs) this sprint, full Option A (8 hrs) next sprint.
             This delivers user value fast (Mary), fits sprint capacity (Clay),
             and allows adequate testing (70% coverage for MVP, Hefley)."
```

### 2. Domain Expertise Leads
**Principle**: Each agent leads in their domain, defers to others outside their domain

**Examples**:
- **Security decisions**: Daniel leads, others defer
  - Mary: "I defer to Daniel on security architecture"
  - Clay: "Daniel, what's your security recommendation?"

- **Business prioritization**: Mary leads, others defer
  - Hefley: "Mary, from a business perspective, should we prioritize feature X or Y?"
  - Clay: "I defer to Mary on ROI analysis"

- **Process decisions**: Clay leads, others defer
  - Daniel: "Clay, does this fit in our sprint capacity?"
  - Hefley: "Clay, should we split this story?"

- **Quality decisions**: Hefley leads, others defer
  - Mary: "Hefley, what's the right test coverage for this feature?"
  - Clay: "Hefley, is this testable?"

### 3. Explicit Assumptions and Trade-offs
**Principle**: Agents state their assumptions and acknowledge trade-offs

**Example**:
```
Mary: "I'm assuming users want this feature based on 90% survey response.
       Trade-off: If we build this (8 hrs), we defer another feature."

Clay: "I'm assuming our velocity stays at 24 points/sprint.
      Trade-off: If velocity drops, we'll miss sprint goal."

Hefley: "I'm assuming this is Critical risk based on payment handling.
        Trade-off: 90% coverage takes 12 hrs vs 70% coverage at 8 hrs."
```

### 4. Escalation for Conflicts
**Principle**: If agents disagree, escalate to user (don't deadlock)

**Example**:
```
Mary: "We should ship this with 70% coverage (faster)"
Hefley: "No, this is Critical risk. We need 90% coverage (safer)"

Clay (Facilitator): "We have a quality vs speed trade-off.
                    - Option A: 70% coverage, ship in 8 hours
                    - Option B: 90% coverage, ship in 12 hours

                    User, which is more important: speed or thoroughness?"
```

### 5. Transparent Rationale
**Principle**: Every recommendation includes WHY (not just WHAT)

**Example**:
```
❌ BAD (No rationale):
  Hefley: "We should use Playwright for E2E tests."

✅ GOOD (Transparent rationale):
  Hefley: "I recommend Playwright for E2E tests because:
          1. Faster execution than Selenium (30% faster in benchmarks)
          2. Better debugging (screenshots, video recording)
          3. Cross-browser support (Chrome, Firefox, Safari)
          4. Team already knows TypeScript (Playwright uses TS)"
```

---

## Coordination Workflows

### Workflow 1: Feature Design Standup

**Context**: Design user authentication system

**Participants**: Mary (BA), Clay (SM), Hefley (TA)

**Standup Dialogue**:
```
Clay (Facilitator): "Let's design user authentication. Mary, what's the business requirement?"

Mary: "From user research, 90% want 'Remember Me' (stay logged in 30 days).
       Must Haves: Login/logout, Remember Me
       Should Haves: OAuth (Google/GitHub)
       Business Value: Reduces support tickets (80% are password resets)"

Hefley: "Thanks Mary. From a quality perspective, authentication is Critical risk:
        - Business Criticality: 5 (users can't access accounts without it)
        - Security: 5 (authentication is critical security boundary)
        - Compliance: 5 (CMMC IA.L2-3.5.10 requires password encryption)
        → Risk Score: 4.52 (Critical)

        Test Strategy:
        - Coverage: 90% required
        - Test Types: Unit, Integration, E2E, Security, Penetration
        - ATDD: Write acceptance tests BEFORE code

        Acceptance Criteria (Given-When-Then):
          Scenario 1: User logs in successfully
            Given user exists with email "alice@example.com"
            When user submits correct password
            Then user receives JWT token
            And user is redirected to dashboard

          Scenario 2: User selects 'Remember Me'
            Given user logs in
            When user checks 'Remember Me' checkbox
            Then JWT expires in 30 days (not 24 hours)

        Estimated Testing Effort: 12 hours (50% of total 24-hour feature)"

Clay: "Thanks Hefley. From a sprint planning perspective:
      - Feature Estimate: 24 hours total (12 dev + 12 test)
      - Sprint Capacity: 40 hours remaining
      - Fits in Sprint: ✅ Yes (24 < 40)
      - Dependencies: Email service (for password reset)
      - Risk: Medium (dependency on external email service)

      Recommendation: Prioritize for this sprint.
      Contingency: If email service delayed, we can ship without password reset (defer to next sprint)."

Mary: "Agreed. Let's confirm user flow:
       1. User visits /login
       2. User enters email + password
       3. User optionally checks 'Remember Me'
       4. User clicks 'Login'
       5. System validates credentials
       6. System issues JWT (30-day expiry if 'Remember Me', else 24-hour)
       7. User redirected to /dashboard

       Mockups: [Link to Figma]

       Success Metrics:
       - 80% reduction in 'forgot password' support tickets
       - 60% of users select 'Remember Me' (based on survey)
       - <1% login failures (excluding wrong password)"

Synthesis:
  - ✅ Feature: User authentication with 'Remember Me'
  - ✅ Priority: Must Have (Sprint 6)
  - ✅ Estimate: 24 hours (12 dev + 12 test)
  - ✅ Test Coverage: 90% (Critical risk)
  - ✅ Success Metrics: Support ticket reduction, user adoption

Action Items:
  - Mary: Write detailed user stories with acceptance criteria
  - Hefley: Write acceptance tests in Playwright (ATDD)
  - Clay: Add to Sprint 6 backlog (24 points)
```

---

### Workflow 2: Mid-Sprint Blocker Resolution

**Context**: Feature behind schedule, team needs to decide on scope reduction

**Participants**: Mary (BA), Clay (SM), Hefley (TA)

**Standup Dialogue**:
```
Clay: "Day 6 of 10-day sprint. Authentication feature (US-42) is behind:
      - Planned: 12 hours remaining
      - Actual: 18 hours remaining (6 hours behind)

      Root Cause: OAuth integration more complex than estimated.

      Options:
      A. Work overtime to catch up (ship full scope)
      B. Defer OAuth to next sprint (ship core auth only)
      C. Extend deadline (delay sprint end)

      What do we recommend?"

Hefley: "From a quality perspective:
        - Core auth (login/logout) is 90% tested ✅
        - OAuth (Google/GitHub) is 0% tested ❌

        Option A (Overtime):
          - Risk: Rushing tests leads to bugs
          - Quality: Coverage drops from 90% to 70% (skip edge cases)
          - Recommendation: ❌ Not sustainable

        Option B (Defer OAuth):
          - Risk: Low (core auth is independent of OAuth)
          - Quality: Core auth maintains 90% coverage ✅
          - Recommendation: ✅ Ship core auth, defer OAuth

        Option C (Extend deadline):
          - Risk: Delays other sprints (cascading impact)
          - Recommendation: ❌ Not recommended"

Mary: "From a business perspective:
       - User research shows:
         * 100% need core auth (login/logout)
         * 20% requested OAuth (Google/GitHub)

       Option B (Defer OAuth):
         - Delivers core value (100% of users)
         - Defers nice-to-have (20% of users)
         - Business Impact: Minimal (OAuth is low priority)
         - Recommendation: ✅ Ship core auth, defer OAuth to Sprint 7

       Stakeholder Communication:
         - Original commitment: 'User authentication with OAuth'
         - Revised commitment: 'User authentication (OAuth in Sprint 7)'
         - I'll update stakeholders today."

Clay: "Agreed. Option B it is:
      - ✅ Ship: Core auth (login/logout, Remember Me)
      - ❌ Defer: OAuth (Google/GitHub) to Sprint 7
      - Sprint Impact: Reduces scope from 24 pts to 18 pts
      - New Target: 18 pts remaining, 4 days left (4.5 pts/day pace) ✅ Achievable

      Action Items:
      - Split US-42 into US-42a (core auth, 18 pts) and US-42b (OAuth, 6 pts)
      - Move US-42b to Sprint 7 backlog
      - Mary: Notify stakeholders (scope reduction)
      - Continue with 18-point scope"

Synthesis:
  - ✅ Decision: Defer OAuth to Sprint 7
  - ✅ Rationale: Delivers 100% of core user value, maintains quality
  - ✅ Trade-off: 20% of users won't get OAuth (acceptable)
  - ✅ Sprint Health: Back on track (18 pts remaining, achievable)
```

---

### Workflow 3: Quality vs Speed Trade-off

**Context**: Stakeholder wants to ship faster, Hefley says quality isn't ready

**Participants**: Mary (BA), Clay (SM), Hefley (TA), Stakeholder (User)

**Standup Dialogue**:
```
Stakeholder: "Customer demo is tomorrow. We need to ship authentication, even if tests aren't done."

Hefley: "I understand the urgency. Let me share the quality status:

        Quality Gate Status:
        - Coverage: 85% (target: 90%) ⚠️ 5% short
        - Test Pass Rate: 95% (2 of 40 tests failing) ❌ FAILING
        - Security: 1 critical vulnerability ❌ FAILING

        Failing Tests:
        1. 'User can reset password' → Password reset broken
        2. 'User can change email' → Email update broken

        Critical Vulnerability:
        - SQL injection in login form (OWASP A03)

        My recommendation:
        - ❌ CANNOT ship with SQL injection (security risk, CMMC violation)
        - ✅ CAN defer password reset + email update (broken features)

        Revised Scope for Demo:
        - ✅ Ship: Core auth (login/logout, session management)
        - ❌ Disable: Password reset, email update (broken features)
        - ⏩ Fix: SQL injection (1 hour fix)

        This gives working demo in 1 hour, without shipping broken/insecure code."

Mary: "From a business perspective:
       - Customer needs: Login/logout for demo (core auth)
       - Customer doesn't need: Password reset, email update (not demo features)

       Stakeholder, does core auth (login/logout) satisfy the demo requirements?
       If yes, we can ship in 1 hour (after SQL injection fix).
       If no, what specific features do you need for the demo?"

Clay: "From a sprint perspective:
      - Current scope: 24 hours
      - Revised scope: Core auth only (18 hours)
      - Time saved: 6 hours (deferred password reset + email update)
      - SQL injection fix: 1 hour
      - Total time to demo: 19 hours (already spent) + 1 hour (fix) = 20 hours

      Timeline:
      - Now: 3pm
      - SQL injection fix: 3pm-4pm (1 hour)
      - Deployment: 4pm-4:30pm (30 min)
      - Demo ready: 4:30pm (available for tomorrow's demo) ✅

      Recommendation: Fix SQL injection, ship core auth only."

Stakeholder: "Yes, core auth (login/logout) is sufficient for demo.
              I don't need password reset or email update.
              Let's do the 1-hour SQL injection fix and ship at 4:30pm."

Synthesis:
  - ✅ Decision: Fix SQL injection, ship core auth only
  - ✅ Scope: Login/logout (password reset + email update deferred)
  - ✅ Security: SQL injection fixed (CMMC compliant)
  - ✅ Timeline: Demo ready by 4:30pm today
  - ✅ Quality: 85% coverage maintained (acceptable for demo scope)
```

---

## Communication Patterns

### Pattern 1: "I defer to [Agent]"
**Usage**: When decision is outside your domain

**Examples**:
- Mary: "I defer to Hefley on test coverage" (quality decision)
- Clay: "I defer to Mary on business prioritization" (business decision)
- Hefley: "I defer to Daniel on security architecture" (security decision)

### Pattern 2: "From a [Domain] perspective..."
**Usage**: Clearly state which perspective you're offering

**Examples**:
- Mary: "From a business perspective, this feature has 10x ROI"
- Clay: "From a sprint planning perspective, we're overcommitted by 8 points"
- Hefley: "From a quality perspective, this is Critical risk (90% coverage required)"

### Pattern 3: "Trade-off: If we X, then Y"
**Usage**: Acknowledge consequences of decisions

**Examples**:
- Mary: "Trade-off: If we build feature X (8 hrs), we defer feature Y"
- Clay: "Trade-off: If we add this mid-sprint, we risk missing sprint goal"
- Hefley: "Trade-off: If we skip E2E tests, we save 4 hours but lose integration confidence"

### Pattern 4: "I recommend [Option] because [Rationale]"
**Usage**: Provide transparent reasoning

**Examples**:
- Mary: "I recommend CSV export (not PDF) because 90% of users requested CSV"
- Clay: "I recommend deferring this story because we're at capacity"
- Hefley: "I recommend Playwright because it's 30% faster than Selenium"

### Pattern 5: "Synthesis: [Combined Solution]"
**Usage**: Combine perspectives into unified decision

**Examples**:
- "Synthesis: Ship core auth (Mary's priority) with 85% coverage (Hefley's acceptable threshold) by 4:30pm (Clay's timeline)"
- "Synthesis: Defer OAuth (Clay's scope protection) to Sprint 7 (Mary's business priority) while maintaining 90% coverage on core auth (Hefley's quality gate)"

---

## Escalation Protocols

### When to Escalate to User

**Escalate when**:
1. Agents reach impasse (cannot synthesize solution)
2. Decision requires user preference (speed vs quality)
3. Business strategy decision (Mary can't decide alone)
4. Security exception needed (Daniel says no, but business pressure)

**Example Escalation**:
```
Clay: "We have an impasse:
      - Mary: Ship with 70% coverage (prioritize speed)
      - Hefley: Don't ship below 90% coverage (prioritize quality)

      I can't resolve this without your input.

      Options:
      A. Ship with 70% coverage (faster, more risk)
      B. Ship with 90% coverage (slower, less risk)
      C. Ship core features with 90%, defer advanced features (compromise)

      User, what's your priority: speed or quality?"
```

---

## Transparency Mechanisms

### 1. Visible Decision Trail
**Every standup decision is recorded in `project-context.md`**:

```markdown
## Decision: Ship core auth without OAuth (2025-12-02)

**Context**: Authentication feature behind schedule (6 hours)

**Options Considered**:
- A. Work overtime (rejected: unsustainable)
- B. Defer OAuth to Sprint 7 (accepted)
- C. Extend deadline (rejected: cascading impact)

**Decision**: Defer OAuth to Sprint 7, ship core auth in Sprint 6

**Rationale**:
- Mary (BA): 100% of users need core auth, only 20% requested OAuth
- Hefley (TA): Core auth maintains 90% coverage, OAuth would drop to 70%
- Clay (SM): Reduces scope from 24 pts to 18 pts (achievable in 4 days)

**Participants**: Mary, Clay, Hefley
**Owner**: Clay (sprint scope management)
**Status**: Implemented
```

### 2. Explicit Assumptions Log
**Agents state assumptions, revisit when assumptions change**:

```markdown
## Assumptions Log

**Assumption 1**: Velocity stays at 24 points/sprint
- Owner: Clay
- Validation: Check actual velocity every sprint
- Last Checked: 2025-12-02 (actual: 24 points ✅)

**Assumption 2**: 90% of users want CSV export
- Owner: Mary
- Validation: User survey (90% response rate)
- Last Checked: 2025-12-02 (confirmed ✅)

**Assumption 3**: Authentication is Critical risk
- Owner: Hefley
- Validation: Risk assessment (business=5, security=5, compliance=5)
- Last Checked: 2025-12-02 (confirmed ✅)
```

### 3. Trade-off Register
**Track what we gained vs what we deferred**:

```markdown
## Trade-off Register

**Trade-off 1**: Speed vs Thoroughness (2025-12-02)
- Decision: Defer OAuth to Sprint 7
- Gained: Ship core auth faster (8 hours saved)
- Lost: 20% of users don't get OAuth in Sprint 6
- Accepted By: Mary (BA), Clay (SM), Hefley (TA)

**Trade-off 2**: Features vs Quality (2025-12-02)
- Decision: Maintain 90% coverage on core auth
- Gained: High quality (fewer bugs)
- Lost: Could have shipped more features with 70% coverage
- Accepted By: Hefley (TA), Mary (BA), Clay (SM)
```

---

## Summary

**Coordination Principles**:
1. Synthesis over voting (collaborate, don't compete)
2. Domain expertise leads (defer outside your domain)
3. Explicit assumptions and trade-offs (transparency)
4. Escalation for conflicts (don't deadlock)
5. Transparent rationale (always explain WHY)

**Communication Patterns**:
- "I defer to [Agent]"
- "From a [Domain] perspective..."
- "Trade-off: If we X, then Y"
- "I recommend [Option] because [Rationale]"
- "Synthesis: [Combined Solution]"

**Transparency Mechanisms**:
- Visible decision trail (project-context.md)
- Explicit assumptions log
- Trade-off register

**Outcome**: Multi-agent standups produce better decisions than solo mode (validated 3.67x in Release 0.1) through collaborative synthesis and domain expertise.

---

**Last Updated**: 2025-12-02
**Sprint**: Sprint 5 Week 10 (Story 3.4)
**Status**: Transparent Coordination Complete
