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

### Example 3: Custom roster standup
```
User: "Run standup with Investment Advisory Team to review portfolio allocation strategy"
Skill loads: Standup → RunStandup workflow with custom roster
Agents: Financial Analyst, Compliance Officer, Client Advisor
Output: Investment strategy with risk, compliance, and client perspective
```

### Example 4: Record decision
```
User: "Update project context with our decision on auth approach"
Skill loads: Standup → ManageContext workflow
Output: project-context.md updated with decision, rationale, and action items
```

## Agent Rosters

### Default Roster (Software Development)
- **Murat** (Product Manager): User value, business priorities, MVP scoping
- **Emma** (Security Engineer): Security threats, CMMC compliance, secure design
- **Wei** (QA Lead): Test strategy, testability, quality gates

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
- **Structured discussion**: Each agent speaks in turn (Product → Security → QA)
- **Synthesis over voting**: Find consensus that's better than any single perspective
- **Decision documentation**: Record rationale in project-context.md

**Core Innovation**: Standup finds **2-3x more issues** than solo agent mode (validated Week 8)

Based on: Multi-agent systems, Ensemble learning, Scrum standup ceremonies (adapted for AI)

## Customization (Release 0.3)

Future enhancements:
- **Configurable rosters**: Define agent teams per project type
- **Auto-roster detection**: FORGE suggests agents based on decision context
- **Agent voting**: Tie-breaking when consensus fails
- **Historical decision search**: "Why did we decide X?" answered from project-context.md
