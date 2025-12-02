# EPIC-003: Party Mode Orchestration Skill

**Status**: Planning
**Priority**: Critical
**Target Release**: FORGE v0.1
**Owner**: @banjoey
**Created**: 2025-12-02
**Depends On**: EPIC-001 (Skills), EPIC-002 (Agent Personalities)

---

## Epic Overview

Create a party mode orchestration skill that enables multiple AI agent personalities to have transparent, collaborative conversations where they debate, challenge, and build on each other's ideas to reach better decisions.

## Business Value

**Current State (PAI):**
- Single agent voice per session
- Parallel agent execution (no conversation)
- Results synthesized, not debated
- One perspective dominates

**Desired State (FORGE Party Mode):**
- Multiple distinct personalities conversing
- Transparent coordination (user sees who's talking)
- Constructive debate and challenge
- Cross-pollination of ideas
- Better outcomes through tension

**Innovation:**
- BMAD has party mode but project-locked
- PAI has multi-agent parallelization but no conversation
- **FORGE brings transparent party mode to PAI with cross-project context**

**Value Proposition:**
```
Solo Mode: Fast, focused, single perspective
Party Mode: Thorough, multi-perspective, better for complex decisions

Example Decision: Auth System Design
Solo (5 min): Architect designs OAuth2 system
Party (10 min): PM+Architect+Security debate → Better solution (passkeys+MFA)

ROI: 2x time investment, 10x better outcome (fewer bugs, better UX, compliant)
```

---

## User Stories

### Story 3.1: Party Mode Activation

**As a** user facing a complex decision
**I want** to invoke party mode with relevant experts
**So that** I get multi-perspective analysis

**Acceptance Criteria:**
- [ ] User can invoke: `Skill("party-mode")` or trigger phrase "party mode: [topic]"
- [ ] System analyzes topic and selects 2-4 relevant agents
- [ ] User sees: "🎉 PARTY MODE ACTIVATED! Bringing in: [agents list]"
- [ ] Each agent introduced with icon, name, role
- [ ] System asks: "What would you like to discuss with the team?"
- [ ] Clear indication that multiple agents are active
- [ ] Activation takes <5 seconds

**Example:**
```
User: "Party mode: design authentication system"

Output:
🎉 PARTY MODE ACTIVATED! 🎉

Bringing in our expert team:
📋 John (PM) - Product strategy and business value
🏗️ Winston (Architect) - System design and technology choices
🔐 Sam (Security) - CMMC compliance and threat modeling

What specific aspects would you like the team to address?
```

**Technical Notes:**
- Topic analysis determines required expertise
- Default team: PM + Architect + Security
- User can override: "party mode with test-architect"

---

### Story 3.2: Intelligent Agent Selection

**As a** system orchestrating party mode
**I want** to select the most relevant agents for the topic
**So that** conversations stay focused and productive

**Acceptance Criteria:**
- [ ] Topic keywords trigger specific agents:
  - "design, architecture, system" → Architect
  - "requirements, features, MVP" → PM + Analyst
  - "security, compliance, CMMC, threat" → Security
  - "testing, quality, CI/CD" → Test Architect
  - "sprint, story, backlog" → Scrum Master
- [ ] Maximum 4 agents per party (avoid overcrowding)
- [ ] Minimum 2 agents (ensure debate)
- [ ] User can manually select: "party mode: pm, security, test-architect"
- [ ] System explains WHY each agent was selected
- [ ] Can add agents mid-conversation: "add test-architect to discussion"

**Example Topic Analysis:**
```
"Design secure file upload for CMMC compliance"
  ↓
Keywords: design → Architect
         secure, CMMC → Security
         (no PM/testing keywords)
  ↓
Selected: Architect + Security (2 agents, focused)
```

---

### Story 3.3: Turn-Based Conversation Orchestration

**As a** system managing multi-agent conversation
**I want** agents to speak in logical turn order
**So that** conversation flows naturally and builds on previous points

**Acceptance Criteria:**
- [ ] One agent speaks at a time (no overlapping)
- [ ] Format: `[emoji] [Name] ([Role]): [message]`
- [ ] Next speaker selected based on:
  - Relevance to current topic
  - Who hasn't spoken recently
  - Who would naturally challenge/build on previous point
  - User addressing specific agent
- [ ] Agents can reference each other by name
- [ ] Agents can build on, challenge, or question each other
- [ ] Natural conversation flow (not round-robin)
- [ ] User can interject at any time
- [ ] Conversation pauses for user input when agent asks question

**Example Conversation Flow:**
```
User: "Should we use microservices?"

🏗️ Winston (Architect): "For your scale? Probably overkill.
Monolith-first is boring tech that works. You can always split later."

📋 John (PM): "Agreed on simplicity, but what's the migration path
if we DO need to scale? Don't want to rewrite in 6 months."

🏗️ Winston: "Fair point. Modular monolith gives you both - simple
deployment, clean boundaries for future extraction."

🔐 Sam (Security): "Modular or not, we need clear trust boundaries.
CMMC requires segmentation of CUI data. How does that map to modules?"

[Conversation builds naturally, not forced round-robin]
```

---

### Story 3.4: Transparent Coordination

**As a** user observing party mode
**I want** to see orchestration decisions
**So that** I understand why agents are being consulted

**Acceptance Criteria:**
- [ ] System announces coordination actions:
  - "Bringing in [agent] for [expertise]..."
  - "This is a [domain] decision, consulting [agent]..."
  - "Checking with [agent] on [specific concern]..."
- [ ] Emoji indicator for orchestration: 🧙
- [ ] Format: `🧙 Orchestrator: [coordination message]`
- [ ] Transparent reasoning:
  - Why this agent now
  - What expertise they bring
  - What question they'll address
- [ ] User trusts the process (not black box)

**Example:**
```
[After architect proposes OAuth2]

🧙 Orchestrator: This involves authentication security and
compliance. Consulting Sam (Security) for CMMC requirements...

🔐 Sam (Security): "OAuth2 is a good start, but CMMC Level 2
practice IA.L2-3.5.3 requires MFA for privileged accounts..."
```

**NOT this (opaque):**
```
[Architect speaks]
[Suddenly security speaks with no explanation]
[User confused about why]
```

---

### Story 3.5: Interactive vs. Autonomous Mode Detection

**As a** system managing party mode
**I want** to detect when to run interactively vs. autonomously
**So that** users get the right level of involvement

**Acceptance Criteria:**
- [ ] **Interactive Mode Triggers:**
  - User asks open-ended question ("What should we build?")
  - Ambiguous requirements (need clarification)
  - User uses keyword "brainstorm"
  - Explicitly requests: "Interactive party mode"
- [ ] **Autonomous Mode Triggers:**
  - User provides detailed requirements/context
  - Clear decision to make ("Design auth for CMMC")
  - User says "party mode, figure it out"
  - Sufficient context available (PRD, architecture exists)
- [ ] System announces mode:
  - Interactive: "Starting collaborative discussion..."
  - Autonomous: "Agents will discuss and present recommendation..."
- [ ] Can switch modes mid-conversation
- [ ] User can always interrupt autonomous mode

**Example Interactive:**
```
User: "Party mode: brainstorm new product ideas"

🎉 PARTY MODE - INTERACTIVE SESSION

This is exploratory - I'll guide a discussion between:
📊 Mary (Analyst) - Market research and trends
📋 John (PM) - Business viability
🏗️ Winston (Architect) - Technical feasibility

📊 Mary: "I'm seeing three emerging trends in your industry..."
[User participates throughout]
```

**Example Autonomous:**
```
User: "Party mode: Design authentication for our CMMC app.
Requirements: Level 2 compliance, good UX, budget-conscious."

🎉 PARTY MODE - AUTONOMOUS ANALYSIS

I'll have the team discuss and return with a recommendation.

📋 John: "Let me start with business constraints..."
🏗️ Winston: "From a technical perspective..."
🔐 Sam: "CMMC requirements dictate..."
[Agents discuss, user observes, agents converge on decision]

🧙 Orchestrator: Team recommendation ready. Present?
```

---

### Story 3.6: Agent Cross-Referencing

**As an** agent in party mode
**I want** to reference other agents' points
**So that** I build on, challenge, or acknowledge their ideas

**Acceptance Criteria:**
- [ ] Agents can reference each other by name:
  - "I agree with Winston's point about..."
  - "Sam raises a good concern, but..."
  - "Building on Mary's research..."
  - "John, what's the business impact of..."
- [ ] Agents can challenge each other:
  - "Winston, that's technically sound but impractical"
  - "Sam, you're right about security but we need to balance UX"
- [ ] Agents can ask each other questions:
  - "John, have we validated this with users?"
  - "Sam, does this pass CMMC controls?"
- [ ] Cross-references create natural dialogue flow
- [ ] Agents maintain their distinct personalities while referencing

**Example:**
```
🏗️ Winston: "OAuth2 is the obvious choice. Battle-tested."

🔐 Sam: "Winston, technically you're right, but CMMC practice
IA.L2-3.5.3 requires MFA. OAuth2 alone doesn't give us that."

📋 John: "Sam makes a good point. But adding MFA hurts UX.
Winston, what's the implementation cost of layering MFA on OAuth2?"

🏗️ Winston: "Fair questions both. John, what if we use
passwordless auth like passkeys? That's MFA-compliant AND better UX."

🔐 Sam: "Now Winston's thinking! Passkeys are phishing-resistant
MFA per NIST 800-63B. That checks the CMMC box."

📋 John: "Love where this is going. Mary, any user research on
passkey adoption rates?"
```

---

### Story 3.7: Party Mode Exit & Synthesis

**As a** user completing a party mode session
**I want** clear synthesis and actionable outcomes
**So that** I can move forward with confidence

**Acceptance Criteria:**
- [ ] User can exit with: "exit party mode", "end discussion", "/end"
- [ ] System detects natural conclusion (consensus reached)
- [ ] Exit process:
  1. Ask if discussion complete
  2. Synthesize key decisions
  3. Note consensus areas
  4. Document disagreements/trade-offs
  5. Provide actionable next steps
  6. Ask if user wants more discussion
- [ ] Output synthesis document:
  - Decision summary
  - Rationale (why this choice)
  - Consensus points
  - Unresolved concerns
  - Next actions
  - Agent recommendations
- [ ] Synthesis saved to project context
- [ ] Optional: Generate follow-up artifacts (PRD, threat model, etc.)

**Example Exit:**
```
User: "I think we have a decision. End party mode."

🧙 Orchestrator: Synthesizing team discussion...

## Party Mode Session Summary
**Topic:** Authentication system design
**Participants:** John (PM), Winston (Architect), Sam (Security)
**Duration:** 8 minutes

### Decision
Implement passwordless authentication using WebAuthn/passkeys
with OAuth2 as fallback for legacy device support.

### Rationale
- **Security:** Meets CMMC Level 2 requirements (phishing-resistant MFA)
- **UX:** Better than password + MFA (one-touch authentication)
- **Technical:** Well-supported, standards-based (FIDO2/WebAuthn)
- **Fallback:** OAuth2 + MFA for devices without passkey support

### Consensus Points
✅ Passkeys are the primary authentication method
✅ OAuth2 + MFA as fallback for compatibility
✅ CUI data requires separate authorization checks
✅ Implement in two phases (passkeys first, OAuth2 fallback second)

### Unresolved Questions
⚠️ Passkey adoption curve (need user research data)
⚠️ Recovery mechanism if user loses passkey device
⚠️ Admin account handling (higher security requirements)

### Next Actions
1. Create PRD for passkey auth (John)
2. Threat model for auth flow (Sam)
3. Technical specification for WebAuthn integration (Winston)
4. User research on passkey adoption (Mary)

Would you like the team to start on any of these actions?
```

---

## Dependencies

**Must Have:**
- EPIC-001: Skills (agents use them during discussion)
- EPIC-002: Agent Personalities (distinct voices for party mode)
- PAI Task tool understanding (may use for sub-agents)
- Conversation state management

**Integration Points:**
- Cross-project context skill (agents reference global + project context)
- Agent skills loaded during discussion
- History system captures party mode sessions
- Voice system (optional TTS for each agent)

---

## Definition of Done

**For Epic:**
- [ ] Party mode skill created and functional
- [ ] Users can activate party mode with topic
- [ ] System intelligently selects relevant agents (2-4)
- [ ] Agents have transparent, turn-based conversations
- [ ] Agents reference and challenge each other
- [ ] Interactive vs. autonomous mode works
- [ ] User can interject and participate
- [ ] Sessions conclude with clear synthesis
- [ ] Tested with 10+ different topics
- [ ] Integration with EPIC-001 skills validated
- [ ] Integration with EPIC-002 agents validated
- [ ] Documentation and examples complete

**For Each Story:**
- [ ] Workflow implemented and tested
- [ ] User experience smooth and clear
- [ ] Orchestration logic correct
- [ ] Agent personalities maintained
- [ ] Conversation quality high
- [ ] Examples documented

---

## Technical Implementation Notes

### Skill Directory Structure

```
.claude/skills/party-mode/
├── skill.md                          # Skill definition
├── ORCHESTRATION.md                  # Core orchestration logic
├── workflows/
│   ├── activate.md                   # Story 3.1
│   ├── agent-selection.md            # Story 3.2
│   ├── conversation-management.md    # Story 3.3
│   ├── transparent-coordination.md   # Story 3.4
│   ├── mode-detection.md             # Story 3.5
│   ├── cross-referencing.md          # Story 3.6
│   └── exit-and-synthesis.md         # Story 3.7
├── templates/
│   ├── session-summary.md
│   ├── decision-record.md
│   └── next-actions.md
└── examples/
    ├── auth-system-design.md
    ├── product-brainstorm.md
    └── security-review.md
```

### Conversation State Management

```yaml
# Party mode session state
session:
  id: "party-20251202-auth-design"
  topic: "Authentication system design"
  mode: "autonomous"  # or "interactive"
  active_agents:
    - pm
    - architect
    - security
  conversation_history:
    - speaker: pm
      message: "WHY authentication now?"
      timestamp: "2025-12-02T10:15:00Z"
    - speaker: architect
      message: "OAuth2 is battle-tested..."
      timestamp: "2025-12-02T10:16:00Z"
  decisions_made:
    - decision: "Use passkeys + OAuth2 fallback"
      consensus: true
      rationale: "CMMC compliance + good UX"
  next_speaker_candidates:
    - security  # hasn't spoken in 2 turns
    - pm        # would challenge current direction
```

### Agent Loading Mechanism

```markdown
# In party-mode/workflows/conversation-management.md

## Agent Personality Loading

For each agent in party:
1. Read `.claude/agents/[agent-name].md`
2. Extract:
   - Role and identity
   - Communication style
   - Principles
   - Expertise areas
3. Load into conversation context
4. Maintain personality consistency across turns

## Speaking as Agent

When agent speaks:
```
[Load agent personality]
[Review conversation history from agent's perspective]
[Consider what agent would naturally say/ask]
[Maintain communication style and principles]
[Generate response in-character]
[Format with agent emoji + name]
```

## Personality Switching

Between agent responses:
- Clear previous agent context
- Load next agent personality
- Ensure no personality bleed
- Distinct voice for each agent
```

---

## Success Metrics

**Quantitative:**
- Party mode activation <5 seconds
- 2-4 agents selected per topic
- Conversation quality: 3-5 agent turns per decision
- Session synthesis generated in <30 seconds
- 10+ successful party mode sessions tested
- Zero personality bleed between agents

**Qualitative:**
- Agents sound distinct (user can identify who's speaking)
- Constructive tension evident (challenging, not agreeing)
- Better decisions than solo mode (validated by user)
- Natural conversation flow (not robotic turn-taking)
- User trusts the orchestration (transparency works)
- Synthesis captures key decisions accurately

---

## Validation Tests

### Test 1: Authentication Design (Technical Decision)
```
Topic: "Design authentication for CMMC app"
Agents: PM, Architect, Security
Expected: Multi-perspective technical discussion
Outcome: Decision with security + UX + technical considerations
Success: Better than single architect decision
```

### Test 2: Product Brainstorm (Creative/Open-Ended)
```
Topic: "Brainstorm new product features"
Agents: PM, Analyst, Architect
Expected: Interactive, exploratory discussion
Outcome: Multiple ideas evaluated from different angles
Success: Ideas not thought of in solo mode
```

### Test 3: Security Review (Challenge/Audit)
```
Topic: "Review proposed architecture for security"
Agents: Architect (presenting), Security (reviewing), Test Architect
Expected: Security challenges architect's assumptions
Outcome: Vulnerabilities identified, mitigations proposed
Success: Finds issues solo architect missed
```

### Test 4: Sprint Planning (Cross-Functional)
```
Topic: "Plan next sprint"
Agents: PM, Scrum Master, Architect, Test Architect
Expected: Story prioritization with technical feasibility input
Outcome: Realistic sprint plan with test strategy
Success: Balanced scope, clear acceptance criteria
```

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Agents don't sound distinct | High | Medium | Strong personality definitions, validation tests |
| Conversation too long/unfocused | Medium | High | Time limits, topic focus, exit detection |
| Orchestration feels artificial | Medium | High | Transparent coordination, natural flow patterns |
| Users prefer solo mode | Low | Low | Party mode optional, solo still available |
| Performance issues (loading agents) | Medium | Low | Optimize agent loading, cache personalities |
| Agents agree too much | High | Medium | Program agents to challenge, reward disagreement |

---

## Timeline Estimate

**Story Points Total:** 34 points

**Week 1:**
- Story 3.1: Activation (5 points)
- Story 3.2: Agent Selection (5 points)

**Week 2:**
- Story 3.3: Turn-Based Conversation (8 points)
- Story 3.4: Transparent Coordination (5 points)

**Week 3:**
- Story 3.5: Mode Detection (5 points)
- Story 3.6: Cross-Referencing (3 points)
- Story 3.7: Exit & Synthesis (3 points)

**Week 4: Integration & Testing**
- Integration with EPIC-001 skills
- Integration with EPIC-002 agents
- Validation tests (4 scenarios)
- Bug fixes and refinement

**Total Timeline:** 4 weeks

---

## Next Steps

1. **Complete EPIC-001 & EPIC-002 first** - Party mode needs skills + agents
2. **Design orchestration state machine** - Conversation flow logic
3. **Prototype 2-agent conversation** - Simplest case (PM + Architect)
4. **Test personality distinctiveness** - Can user tell them apart?
5. **Add 3rd agent** - Test with PM + Architect + Security
6. **Validation testing** - All 4 test scenarios
7. **Polish and document** - Examples, edge cases, error handling

---

**This is FORGE's killer feature - transparent, multi-agent collaboration for PAI!**
