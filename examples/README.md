# FORGE Examples

This directory contains example materials to help you understand and use FORGE's multi-agent collaboration system.

---

## Directory Structure

```
examples/
├── standups/              # Example standup conversation transcripts
├── project-contexts/      # Example project-context.md files
├── agents/                # Custom agent examples for different domains
└── README.md              # This file
```

---

## Standups

Example multi-agent standup conversations demonstrating FORGE's collaborative decision-making.

### `standups/example-authentication-decision.md`

**Scenario**: Should we add OAuth2 to MVP, or defer to v1.1?

**Demonstrates**:
- Multi-perspective analysis (Mary, Bob, Murat, Emma)
- STRIDE threat modeling (Emma's security analysis)
- Timeline impact assessment (Bob's capacity analysis)
- Testing complexity evaluation (Murat's test strategy)
- User value prioritization (Mary's MoSCoW framework)
- Synthesized decision with action items
- Trade-off analysis

**Key Insights**:
- Standup found 4 perspectives instead of 1 (solo AI)
- Hidden complexity revealed: 21 story points (not obvious 16)
- CMMC compliance analysis (email/password + MFA meets requirements)
- Decision prevented 3-week MVP delay

**Use Case**: Architecture decisions, security-sensitive features, high-stakes trade-offs

---

## Project Contexts

Example `project-context.md` files showing how to document project decisions, architecture, and constraints.

### `project-contexts/example-task-manager-context.md`

**Project**: Task management SaaS for solo developers

**Contains**:
- Project overview (vision, users, pain points, success metrics)
- Architecture decisions (PostgreSQL vs MongoDB, REST vs GraphQL)
- Standup decisions logged (OAuth2 deferred, real-time collaboration deferred)
- Security reviews (STRIDE analysis, CMMC baseline)
- Sprint status (burndown, story points)
- Quality gates (authentication security passed)
- Risks and mitigations
- Lessons learned (multi-agent standups catch hidden complexity)

**Demonstrates**:
- How to maintain project context for agent reference
- Decision logging format (date, participants, rationale, status)
- CMMC compliance tracking
- Audit trail for security and architecture decisions

**Use Case**: Template for your own project-context.md

---

## Custom Agents

Example custom agents for domains beyond software development.

### `agents/financial-analyst-custom-agent.md`

**Agent**: Sofia (Financial Analyst)

**Domain**: Investment Advisory

**Demonstrates**:
- Complete agent persona structure (expertise, personality, triggers)
- Core responsibilities (portfolio allocation, risk assessment, market analysis)
- Decision-making framework (Modern Portfolio Theory, Sharpe ratio)
- Communication style (catchphrases, tone, what to avoid)
- Example contributions (portfolio rebalancing, investment opportunities, risk assessment)
- Integration with other agents (Compliance Officer, Client Advisor, Tax Advisor)

**Roster Example**: Investment Advisory Team
- Sofia (Financial Analyst): Portfolio allocation, risk assessment
- Marcus (Compliance Officer): SEC regulations, fiduciary duty
- Lisa (Client Advisor): Client goals, risk tolerance

**Use Case**: Template for creating agents in Finance, Legal, Healthcare, or other domains

---

## How to Use These Examples

### 1. Understanding Multi-Agent Collaboration

Read `standups/example-authentication-decision.md` to see how FORGE agents collaborate:
- Each agent provides a distinct perspective (user value, timeline, testing, security)
- Synthesis combines perspectives into comprehensive decision
- Trade-offs are explicit (what we gain vs what we lose)
- Action items are concrete and trackable

**Key Takeaway**: Multi-agent standups find 2-3x more issues than solo AI (validated: 3.67x)

---

### 2. Creating Your Project Context

Use `project-contexts/example-task-manager-context.md` as template:

```bash
# Copy to your project
cp examples/project-contexts/example-task-manager-context.md \
   docs/project-context.md

# Customize with your project details
# - Project overview
# - Architecture
# - Success metrics
# - Constraints
```

**Why**: Agents reference `project-context.md` during standups for informed decisions

---

### 3. Creating Custom Agents

Use `agents/financial-analyst-custom-agent.md` as template:

```bash
# Copy template
cp examples/agents/financial-analyst-custom-agent.md \
   .claude/agents/YourAgent/agent.md

# Customize sections:
# - Core Identity (name, role, background)
# - Core Responsibilities (what agent focuses on)
# - Decision-Making Framework (how agent evaluates)
# - Communication Style (catchphrases, tone)
# - Example Contributions (demonstrate expertise)
```

**Domains to Try**:
- **Legal**: Contract Specialist, Risk Manager, Business Counsel
- **Healthcare**: Clinical Specialist, Regulatory Affairs, Patient Advocate
- **Design**: UX Designer, Brand Manager, Accessibility Expert
- **Sales**: Account Executive, Sales Engineer, Customer Success Manager

---

## Learning Path

### Beginner: Understanding FORGE

1. **Read**: `standups/example-authentication-decision.md`
   - See how 4 agents collaborate on a decision
   - Understand synthesis process
   - Learn STRIDE threat modeling (Emma's contribution)

2. **Observe**: Multi-perspective analysis
   - Mary (User Value): MoSCoW prioritization
   - Bob (Timeline): Story point estimation, capacity analysis
   - Murat (Testing): Test complexity evaluation
   - Emma (Security): STRIDE analysis, CMMC compliance

3. **Takeaway**: Standup finds hidden complexity (21 story points, not 16)

---

### Intermediate: Using FORGE for Your Project

1. **Create**: `docs/project-context.md` for your project
   - Use `project-contexts/example-task-manager-context.md` as template
   - Document: Vision, architecture, constraints, decisions

2. **Run**: Your first standup
   - Use default roster (Mary, Bob, Murat, Emma)
   - Ask: Architecture decision, feature prioritization, security review

3. **Log**: Decision to `project-context.md`
   - Format: Date, participants, rationale, status
   - Audit trail for future reference

---

### Advanced: Customizing FORGE

1. **Create**: Custom agent for your domain
   - Use `agents/financial-analyst-custom-agent.md` as template
   - Define: Expertise, decision framework, catchphrases

2. **Define**: Custom roster in `project-context.md`
   - Example: Investment Advisory (Sofia, Marcus, Lisa)
   - Example: Legal Team (Contract Specialist, Risk Manager, Business Counsel)

3. **Test**: Run standup with custom roster
   - Validate agents stay in character
   - Ensure diverse perspectives emerge
   - Refine agent personas based on output

---

## Example Workflows

### Workflow 1: Architecture Decision Review

**Input**: Microservices vs Monolith decision

**Process**:
1. Create `docs/project-context.md` with project details
2. Run standup: "Should we use microservices or monolith for MVP?"
3. Agents respond:
   - Mary: User value (does architecture affect UX?)
   - Bob: Timeline (microservices adds 4 weeks complexity)
   - Murat: Testing (microservices harder to test)
   - Emma: Security (microservices increase attack surface)
4. Synthesis: Monolith for MVP, refactor to microservices in v2.0 if needed
5. Log decision to `project-context.md`

**Output**: Comprehensive decision with multi-perspective rationale

---

### Workflow 2: Security Review

**Input**: Authentication API endpoints

**Process**:
1. Run standup: "Review authentication API for security issues"
2. Emma performs STRIDE analysis:
   - Spoofing: Weak passwords → Enforce password policy
   - Tampering: SQL injection → Parameterized queries
   - Repudiation: No audit trail → Log auth events
   - Info Disclosure: Passwords in logs → Never log passwords
   - DoS: Brute force → Rate limiting
   - Elevation of Privilege: Session hijacking → HttpOnly cookies
3. Emma maps to CMMC practices (IA.L2-3.5.10, AC.L2-3.1.7, etc.)
4. Synthesis: Action items with CMMC practice references
5. Log to `project-context.md` security reviews section

**Output**: STRIDE threat model + CMMC compliance checklist

---

### Workflow 3: Custom Domain Decision

**Input**: Portfolio rebalancing decision (Investment Advisory)

**Process**:
1. Create custom roster: Sofia (Financial Analyst), Marcus (Compliance), Lisa (Client Advisor)
2. Run standup: "Should we rebalance portfolio from 70/30 to 60/40?"
3. Agents respond:
   - Sofia: Risk assessment (70/30 has 14% volatility vs target 11%)
   - Marcus: Compliance (60/40 aligns with Moderate risk profile)
   - Lisa: Client expectations (educate on volatility, set realistic expectations)
4. Synthesis: Rebalance to 60/40, educate client, document in compliance file
5. Log decision to client's investment plan

**Output**: Investment decision with risk, compliance, and client perspectives

---

## Example Patterns

### Pattern 1: Defer Non-Critical Features

**Context**: MVP timeline pressure, too many features

**Standup Question**: "Should we add [Feature X] to MVP or defer to v1.1?"

**Agent Contributions**:
- **Mary**: MoSCoW prioritization (Must/Should/Could/Won't)
- **Bob**: Timeline impact (story points, capacity)
- **Murat**: Testing complexity
- **Emma**: Security implications

**Common Outcome**: Defer Should Have features to v1.1, focus MVP on Must Have

**Examples from Standup**:
- OAuth2 deferred (Should Have, not Must Have)
- Real-time collaboration deferred (not primary persona need)

---

### Pattern 2: Security-First Feature Design

**Context**: Designing high-risk feature (authentication, payment, data handling)

**Standup Question**: "Review [Feature X] for security issues"

**Agent Contributions**:
- **Emma**: STRIDE threat modeling + CMMC compliance
- **Murat**: Security testing strategy
- **Bob**: Timeline for security mitigations
- **Mary**: User impact of security controls

**Common Outcome**: Security mitigations added before implementation (prevent rework)

**Examples from Standup**:
- Email/password authentication STRIDE analysis (6 threats, all mitigated)
- CMMC baseline (6 practices for MVP authentication)

---

### Pattern 3: Hidden Complexity Discovery

**Context**: Feature seems simple, but may have hidden work

**Standup Question**: "Estimate effort for [Feature X]"

**Agent Contributions**:
- **Bob**: Story point estimate + dependency analysis
- **Murat**: Testing effort
- **Emma**: Security implementation time
- **Mary**: User value vs effort trade-off

**Common Outcome**: Reveal hidden dependencies (HTTPS, Redis, OAuth accounts)

**Examples from Standup**:
- OAuth2: 16 points → 21 points (hidden: HTTPS setup, Redis, OAuth accounts)
- Real-time: 13 points → 18 points (hidden: WebSocket testing, conflict resolution)

---

## Validation Results

**Dogfooding Sessions** (FORGE building FORGE):

| Session | Roster | Issues Found | Time Invested | Time Saved | ROI |
|---------|--------|--------------|---------------|------------|-----|
| Sprint 1 Prep | Mary, Bob, Murat | 7 issues | 1 hour | 10 hours | 10x |
| Sprint 2 Prep | Mary, Bob, Murat | 8 issues | 1 hour | 10 hours | 10x |
| **Total** | - | **15 issues** | **2 hours** | **20 hours** | **10x** |

**A/B Testing Results**:
- **Solo AI**: 1 perspective, missed hidden dependencies
- **Standup (4 agents)**: 3.67x more issues found
- **Validation**: Standup finds 2-3x more issues (target met: 3.67x)

---

## Contributing Examples

Have a great standup transcript or custom agent? Contribute!

1. **Standup Transcripts**: Add to `examples/standups/`
   - Real decisions from your project
   - Show multi-agent collaboration
   - Document issues found vs solo AI

2. **Custom Agents**: Add to `examples/agents/`
   - New domains (Legal, Healthcare, Design, etc.)
   - Complete persona (expertise, catchphrases, examples)
   - Integration with other agents

3. **Project Contexts**: Add to `examples/project-contexts/`
   - Different domains (SaaS, mobile app, enterprise, etc.)
   - Decision logging patterns
   - Security review formats

**Submit via Pull Request**: See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## Questions?

- **How do I use these examples?** Start with `standups/example-authentication-decision.md` to understand multi-agent collaboration
- **Can I customize agents?** Yes! Use `agents/financial-analyst-custom-agent.md` as template
- **Do I need all 4 agents?** No, customize roster based on decision type (security review → Emma only, architecture → Mary + Bob + Murat)

---

**Last Updated**: 2025-12-02
**FORGE Version**: Release 0.2 (Emma Security Engineer agent complete)
