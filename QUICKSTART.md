# FORGE Quick Start Guide

Get up and running with FORGE in 10 minutes.

## What You'll Learn

1. Install FORGE skills and agents
2. Create your first PRD
3. Run your first standup
4. Create a custom agent (optional)

---

## Prerequisites

- **PAI** (Personal AI Infrastructure) installed
- **Claude Code** CLI access
- **Git** for cloning the repository

**Installation time**: ~5 minutes

---

## Step 1: Install FORGE (2 minutes)

### Clone the Repository

```bash
# Clone FORGE
git clone https://github.com/YOUR_USERNAME/FORGE.git
cd FORGE
```

### Install Skills and Agents

```bash
# Create symlinks to PAI directories
ln -s $(pwd)/.claude/skills/AgilePm ~/.claude/skills/
ln -s $(pwd)/.claude/skills/Security ~/.claude/skills/
ln -s $(pwd)/.claude/skills/TestArchitect ~/.claude/skills/
ln -s $(pwd)/.claude/skills/Standup ~/.claude/skills/

ln -s $(pwd)/.claude/agents/Murat ~/.claude/agents/
ln -s $(pwd)/.claude/agents/Emma ~/.claude/agents/
ln -s $(pwd)/.claude/agents/Wei ~/.claude/agents/
```

**Alternative** (copy instead of symlink):

```bash
# Copy skills and agents to PAI
cp -r .claude/skills/* ~/.claude/skills/
cp -r .claude/agents/* ~/.claude/agents/
```

### Verify Installation

```bash
# Test that AgilePm skill loads
claude

# In Claude Code, type:
# "Use the AgilePm skill"
# If it loads, installation successful!
```

---

## Step 2: Create Your First PRD (3 minutes)

Let's create a PRD for a sample project.

### Start Claude Code

```bash
claude
```

### Use AgilePm Skill

Type in Claude Code:

```
Use the AgilePm skill to create a PRD for a task management app.

Target users: Solo developers and small teams
Problem: Existing task managers are too complex or lack agile features
```

### What You'll Get

Claude will use the **CreatePrd workflow** to generate:

1. **Executive Summary**: Problem, solution, success metrics
2. **System Architecture**: Components, data flows, tech stack (with Mermaid diagram)
3. **Feature Breakdown**: MoSCoW prioritized features (Must/Should/Could/Won't)
4. **Implementation Checklist**: Setup, backend, frontend, testing, security, docs, deployment

**Output**: `docs/PRD-TaskManager.md` (or similar)

### Validate Quality

The PRD will be scored using `prd-rubric.md`:
- Executive Summary: 2 points (clear problem + solution)
- Architecture: 2 points (Mermaid diagram + all components)
- Features: 2 points (MoSCoW prioritized + user value)
- Checklist: 2 points (all phases + realistic estimates)
- Clarity: 2 points (well-organized + no ambiguity)

**Target**: ≥8/10 to pass quality gate

---

## Step 3: Run Your First Standup (3 minutes)

Now let's review a decision using multi-agent collaboration.

### Start a Standup

Type in Claude Code:

```
Use the Standup skill. I need to decide:

Should we add real-time collaboration features to the MVP, or defer to v1.1?

Context:
- MVP deadline: 8 weeks
- Primary users: Solo developers (not teams)
- Success metric: 50 users in first month
```

### What Happens

**Step 1: Murat (Product Manager) speaks first**
- Analyzes user value
- Applies MoSCoW prioritization
- Considers time-to-market

**Example**:
> "Let's think about our primary persona: solo developers. Real-time collaboration is valuable for teams, but our MVP targets solos. This feels like Should Have, not Must Have. Deferring to v1.1 lets us ship faster and validate the core task management first."

**Step 2: Emma (Security Engineer) speaks second**
- Identifies security threats (STRIDE)
- Checks CMMC compliance
- Recommends mitigations

**Example**:
> "Real-time collaboration introduces complexity: WebSocket connections, session management, authorization for shared tasks. Each adds attack surface. If we defer to v1.1, we can design security properly instead of rushing. Recommendation: Defer."

**Step 3: Wei (QA Lead) speaks third**
- Assesses testability
- Estimates test complexity
- Defines quality gates

**Example**:
> "Real-time features are hard to test: race conditions, conflict resolution, connection drops. This adds 2-3 weeks of testing for a feature our primary persona doesn't need. Recommendation: Defer to v1.1, focus testing on core task management."

### Synthesized Decision

Claude synthesizes all perspectives:

```markdown
## Consensus Decision

**Decision**: Defer real-time collaboration to v1.1, focus MVP on solo developer task management.

**Rationale**:
- Murat: Primary persona (solo developers) doesn't need real-time collaboration for initial adoption
- Emma: Real-time features add significant attack surface; deferring allows proper security design
- Wei: Testing complexity (2-3 weeks) doesn't justify feature for non-primary use case

**Action Items**:
1. [ ] Remove real-time collaboration from MVP scope
2. [ ] Add to v1.1 backlog with team collaboration epic
3. [ ] Document decision in project-context.md

**Trade-offs**:
- ✅ Gain: Ship 2-3 weeks faster, reduce security risk, focus on core value
- ⚠️ Lose: Can't market to teams initially (acceptable - not primary persona)
```

### Result

You got **3 perspectives** (product, security, testing) instead of 1. Standup found issues you might have missed:
- Security attack surface (Emma)
- Testing complexity (Wei)
- Persona mismatch (Murat)

**Validated**: Standup finds 2-3x more issues than solo mode (A/B tested: 3.67x)

---

## Step 4: Create a Custom Agent (Optional, 5 minutes)

Let's create a custom agent for a different domain.

### Copy the Template

```bash
# Create directory for your agent
mkdir -p .claude/agents/FinancialAnalyst

# Copy template
cp .claude/skills/Standup/templates/custom-agent-template.md \
   .claude/agents/FinancialAnalyst/agent.md
```

### Edit agent.md

Open `.claude/agents/FinancialAnalyst/agent.md` and fill in:

**Frontmatter**:
```yaml
---
name: Sofia
role: Financial Analyst
expertise: Portfolio allocation, risk assessment, market analysis
personality: Data-driven, risk-aware, pragmatic
triggers: Investment decisions, portfolio review, risk assessment
---
```

**Core Responsibilities** (example):
```markdown
### 1. Portfolio Allocation
- Analyze asset class distribution
- Apply Modern Portfolio Theory (MPT)
- Optimize risk-adjusted returns (Sharpe ratio)

### 2. Risk Assessment
- Calculate portfolio volatility
- Identify concentration risk
- Stress test scenarios (market crash, inflation)

### 3. Market Analysis
- Identify trends and catalysts
- Compare to benchmarks (S&P 500, etc.)
- Recommend tactical adjustments
```

**Catchphrases** (example):
```markdown
- "What's the Sharpe ratio?"
- "Let's diversify that risk."
- "Historical returns don't predict future results."
- "Have we stress-tested this portfolio?"
```

**Example Contribution**:
```markdown
### Scenario 1: Portfolio Rebalancing Decision

**Context**: Client portfolio is 70% stocks, 30% bonds. Should we rebalance?

**Sofia's Contribution**:
"Let's analyze the current allocation versus the target.

**Risk Assessment**:
- Current: 70/30 (stocks/bonds) → Portfolio volatility: 14%
- Target: 60/40 → Portfolio volatility: 11%
- Overexposure: +10% stocks = concentration risk

**Market Context**:
- Stocks up 20% YTD (driven by tech)
- Bonds flat (rising rates)
- Result: Drift from target allocation

**Recommendation**:
Rebalance to 60/40. Sell 10% stocks (take profits), buy bonds (reduce risk). This restores target allocation and locks in gains.

**Action Items**:
1. Sell $X in stocks (overweight positions)
2. Buy $X in bonds (diversified bond fund)
3. Set quarterly rebalancing trigger (±5% drift)
```

### Use Your Custom Agent

Create a custom roster in `project-context.md`:

```markdown
## Agent Roster

**Investment Advisory Team**:
- Sofia (Financial Analyst): Portfolio allocation, risk assessment
- Marcus (Compliance Officer): SEC regulations, fiduciary requirements
- Lisa (Client Advisor): Client goals, risk tolerance
```

Then run standup with your custom team:

```
Use the Standup skill with the Investment Advisory Team.

Decision: Should we increase exposure to emerging markets from 10% to 20%?

Context:
- Client: Moderate risk tolerance
- Portfolio: Currently 70% US, 20% International, 10% EM
- Goal: Growth for retirement in 15 years
```

Sofia, Marcus, and Lisa will each provide their perspective (risk, compliance, client needs).

---

## Common Workflows

### Workflow 1: Create PRD → Epics → Stories → Sprint

**Full project planning**:

```
1. Use AgilePm skill: Create PRD for [your project]
2. Use AgilePm skill: Create epics from the PRD
3. Use AgilePm skill: Create user stories from Epic 1
4. Use AgilePm skill: Plan Sprint 1 with 10 story points
```

**Result**: Complete project plan from PRD to sprint-ready stories

---

### Workflow 2: Security Review

**Threat model + CMMC baseline**:

```
1. Use Security skill: Create threat model for [your system]
2. Use Security skill: Create CMMC baseline for [your features]
3. Use Standup skill: Review security decisions with Murat, Emma, Wei
```

**Result**: Comprehensive security analysis with multi-agent review

---

### Workflow 3: Test Strategy

**Define testing approach**:

```
1. Use TestArchitect skill: Create test strategy for [your project]
2. Use TestArchitect skill: Define coverage targets for critical features
3. Use Standup skill: Review test plan with Murat, Emma, Wei
```

**Result**: Test strategy with risk-based coverage and quality gates

---

### Workflow 4: Architecture Design Review

**Multi-agent architecture review**:

```
Use Standup skill: Review this microservices architecture design

Architecture:
- API Gateway → 5 microservices (User, Product, Order, Payment, Notification)
- Event bus (Kafka) for async communication
- PostgreSQL per service (database-per-service pattern)
- Redis for caching

Questions:
- Is this over-engineered for MVP?
- What security concerns exist?
- How do we test this?
```

**Result**:
- Murat: Complexity vs value (is this MVP-appropriate?)
- Emma: Trust boundaries, STRIDE threats, CMMC practices
- Wei: Testability, integration testing strategy, quality gates

---

## Tips for Success

### 1. Use Standup for High-Stakes Decisions

**✅ Good for standup**:
- Architecture design (multiple services, security boundaries)
- Feature prioritization (Must Have vs Should Have)
- Security-sensitive features (auth, payment, data handling)
- Complex user stories (multiple acceptance criteria)

**❌ Not good for standup**:
- Simple questions ("How do I hash a password?" → Ask Emma directly)
- Implementation details ("How do I write a Jest test?" → Use docs)
- Debugging ("Why is this test failing?" → Solo troubleshooting)

**Rule of thumb**: If it affects multiple domains (product + security + testing), use standup.

---

### 2. Load Project Context

Create `docs/project-context.md` with:
- Project overview
- Architecture
- Success metrics
- Key decisions
- Constraints

Agents will reference this during standup for informed discussion.

---

### 3. Dogfood Your Skills

Before shipping a feature, use FORGE skills to validate it:
- Write PRD (AgilePm)
- Threat model (Security)
- Test strategy (TestArchitect)
- Review with standup (Standup)

**Why**: Proves your feature is well-designed before you build it.

---

### 4. Customize for Your Domain

Default agents (Murat, Emma, Wei) are for software development.

For other domains:
- **Investment Advisory**: Financial Analyst, Compliance Officer, Client Advisor
- **Legal**: Contract Specialist, Risk Manager, Business Counsel
- **Healthcare**: Clinical Specialist, Regulatory Affairs, Patient Advocate

Use `custom-agent-template.md` to create domain-specific agents.

---

## Troubleshooting

### Issue: Skill doesn't load

**Solution**:
```bash
# Check symlink exists
ls -la ~/.claude/skills/AgilePm

# If broken, recreate symlink
rm ~/.claude/skills/AgilePm
ln -s /full/path/to/FORGE/.claude/skills/AgilePm ~/.claude/skills/
```

---

### Issue: Agent not found in standup

**Solution**:
```bash
# Check agent symlink
ls -la ~/.claude/agents/Murat

# Verify agent.md exists
cat ~/.claude/agents/Murat/agent.md
```

---

### Issue: PRD quality score <8/10

**Solution**: Review prd-rubric.md and improve:
- Add Mermaid architecture diagram
- Clarify problem statement in executive summary
- Add user value for each feature
- Provide realistic story point estimates in checklist

---

### Issue: Standup doesn't find multiple perspectives

**Solution**: Be specific about the decision context:
- What are we deciding?
- Why is this decision needed?
- What are the constraints?
- What are we uncertain about?

Vague: "How do we improve security?"
Specific: "Should we add OAuth2 to MVP or defer to v1.1? Constraints: 8-week deadline, solo developer persona."

---

## Next Steps

1. **Explore Skills**: Try all 4 skills (AgilePm, Security, TestArchitect, Standup)
2. **Create Custom Agents**: Build agents for your domain
3. **Dogfood FORGE**: Use FORGE to plan your own projects
4. **Contribute Back**: Share custom agents, improvements, bug fixes

---

## Resources

- **README.md**: Overview and roadmap
- **CONTRIBUTING.md**: Development guidelines
- **docs/PRD-FORGE.md**: FORGE's own PRD (example of CreatePrd output)
- **docs/threat-model-FORGE.md**: FORGE's threat model (example of ThreatModel output)
- **docs/test-strategy-FORGE.md**: FORGE's test strategy (example of CreateTestStrategy output)
- **docs/validation/standup-ab-test.md**: Proof standup finds 3.67x more issues

---

## Questions?

- **GitHub Issues**: Bug reports, feature requests
- **GitHub Discussions**: General questions, ideas
- **Email**: [your-email] (security concerns only)

---

**Welcome to FORGE! Let's build better software together.**

---

**Last Updated**: 2025-12-02
**FORGE Version**: Release 0.1 MVP (Sprint 5)
