---
name: Standup
description: Multi-agent collaborative decision-making for complex problems. USE WHEN you need multiple specialist perspectives on high-stakes decisions (architecture, prioritization, security, compliance). Orchestrates conversation between custom agent rosters, synthesizes perspectives into actionable decisions. Finds 2-3x more issues than solo agent mode.
---

# Standup

Multi-agent orchestration: Better decisions through collaborative specialist perspectives.

## Workflow Routing

| Workflow | When to Use | Output |
|----------|-------------|--------|
| RunStandup | Complex decision needing multiple perspectives | Synthesized decision from agent discussion |
| ManageContext | Creating or updating project-context.md | Updated project "bible" with decisions |
| SynthesizeDecision | Combining agent perspectives into consensus | Actionable decision with rationale and action items |

## Examples

### Example 1: Architecture design review
```
User: "Review this microservices architecture design"
Skill loads: Standup → RunStandup workflow
Process:
  1. Load project context
  2. Present architecture to agents (Product, Security, QA)
  3. Each agent provides perspective
  4. Synthesize recommendations
Output: Design feedback with security, testability, and business concerns identified
```

### Example 2: Feature prioritization
```
User: "Should we add OAuth2 to MVP or defer to v1.1?"
Skill loads: Standup → RunStandup workflow
Process:
  1. Load project context
  2. Present decision to agents
  3. Product: User value perspective
  4. Security: Security/compliance perspective
  5. QA: Testing complexity perspective
  6. Synthesize: Balanced recommendation
Output: Prioritization decision (Must Have / Should Have / Could Have / Won't Have)
```

### Example 3: Smart roster selection (auto-suggest)
```
User: "Review this authentication feature design"
Skill loads: Standup → RunStandup workflow
Smart roster: Emma, Mary, Bob, Murat, Wei (full team - critical feature)
Process:
  1. Load project context
  2. Auto-detect: authentication = critical feature → suggest full team
  3. Emma: Security threats (credential storage, session management)
  4. Mary: User experience (signup friction, password reset flow)
  5. Bob: Timeline estimates (6h for email/password, 9h for OAuth2)
  6. Murat: Business priority (MVP vs v1.1)
  7. Wei: Test requirements (60 tests - 25 unit + 12 integration + 8 E2E + 15 security)
  8. Synthesize: Team consensus with conflict resolution
Output: Multi-perspective design review with actionable recommendations
```

### Example 4: Custom roster standup
```
User: "Run standup with Investment Advisory Team to review portfolio allocation strategy"
Skill loads: Standup → RunStandup workflow with custom roster
Agents: Financial Analyst, Compliance Officer, Client Advisor
Output: Investment strategy with risk, compliance, and client perspective
```

### Example 5: Record decision
```
User: "Update project context with our decision on auth approach"
Skill loads: Standup → ManageContext workflow
Output: project-context.md updated with decision, rationale, and action items
```

## Agent Rosters

### Smart Roster Selection (Auto-Suggest)
FORGE automatically suggests the right experts based on your feature context:

| Feature Type | Suggested Roster | Why |
|--------------|------------------|-----|
| Authentication | Emma, Mary, Bob, Murat, Wei | Critical feature - full team review |
| Security/Vulnerabilities | Emma, Bob, Wei | Security-focused: threat + implementation + security tests |
| UX/User Experience | Mary, Emma, Bob, Wei | UX-focused: user research + security review + implementation |
| Database/SQL | Emma, Bob, Wei | Database-focused: SQL injection + implementation + testing |
| Architecture/Design | Bob, Mary, Murat, Wei | Architecture-focused: tech lead + business impact + priority |
| Testing/QA | Wei, Emma, Bob | QA-focused: test strategy + security tests + implementation |
| Timeline/Estimates | Bob, Murat, Wei | Planning-focused: tech lead + priority + test time |
| Prioritization | Murat, Mary, Bob | Prioritization-focused: product + UX + tech feasibility |

**Question Context Override**: Questions override feature patterns
- "How long?" → Bob, Murat, Wei (timeline focus)
- "How many tests?" → Wei, Emma, Bob (testing focus)
- "Should we build this?" → Murat, Mary, Bob (prioritization focus)

**Manual Override**: Explicitly specify roster to override smart defaults
```typescript
runStandup({ feature: 'Auth', roster: ['Emma', 'Bob'] }) // Override: only Emma + Bob
```

### Software Development Roster
- **Emma** (Security Engineer): Security threats, CMMC compliance, secure design
- **Mary** (Business Analyst): User value, UX design, user research, stakeholder communication
- **Bob** (Tech Lead): Technical feasibility, timeline estimates (Claude-time), capacity planning
- **Murat** (Product Manager): User value, business priorities, MVP scoping, MoSCoW prioritization
- **Wei** (QA Lead): Test strategy, testability, quality gates, ATDD

### Custom Rosters (Your Domain)
Define your own agent rosters for different domains:
- **Investment Advisory**: Financial Analyst, Compliance Officer, Client Advisor
- **Legal Review**: Contract Specialist, Risk Manager, Business Counsel
- **Healthcare**: Clinical Specialist, Regulatory Affairs, Patient Advocate
- **Product Design**: UX Designer, Brand Manager, Accessibility Expert

**How to Create Custom Agents**:
Use `templates/custom-agent-template.md` to define new agents with:
- Role, expertise, personality
- Standup participation style
- Integration with other agents

## Integration

- Works with AgilePm skill (standup reviews PRDs, prioritizes epics)
- Works with Security skill (Emma uses threat modeling in standup)
- Works with TestArchitect skill (Wei defines test strategy in standup)
- Generates project-context.md (project "bible" for all agents)
- Records decisions with rationale (audit trail for compliance)

## Methodology

This skill follows multi-agent orchestration principles:
- **Diverse perspectives**: Multiple specialists find more issues than solo agent
- **Smart roster selection**: Auto-suggest experts based on feature context (authentication → full team, security → Emma/Bob/Wei)
- **Structured discussion**: Each agent speaks in turn, providing their unique expertise
- **Synthesis over voting**: Find consensus that's better than any single perspective
- **Decision documentation**: Record rationale in project-context.md

**Core Innovation**: Standup finds **2-3x more issues** than solo agent mode (validated Week 8)

**Key Features**:
- **Context-aware roster suggestion**: Automatically suggests the right experts (implemented)
- **Question context override**: Questions override feature patterns ("How long?" → planning team)
- **Manual override**: Explicitly specify roster to override smart defaults
- **Synthesis with conflict detection**: Identifies disagreements and finds middle ground

Based on: Multi-agent systems, Ensemble learning, Scrum standup ceremonies (adapted for AI)

## Customization (Release 0.3)

Future enhancements:
- **Configurable rosters**: Define agent teams per project type
- **Agent voting**: Tie-breaking when consensus fails
- **Historical decision search**: "Why did we decide X?" answered from project-context.md
- **Domain-specific roster templates**: Pre-defined rosters for finance, healthcare, legal, etc.
